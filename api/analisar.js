// api/analisar.js - VERSÃO CORRIGIDA
const { OpenAI } = require('openai');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY não configurada');
      return res.status(500).json({ 
        error: 'Configuração inválida',
        message: 'API Key da OpenAI não encontrada. Configure a variável de ambiente OPENAI_API_KEY na Vercel.'
      });
    }

    const respostas = req.body;

    // Validate input
    if (!respostas || Object.keys(respostas).length === 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    console.log('Recebidas respostas:', Object.keys(respostas));

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create prompt with user responses
    const prompt = `
Analise as seguintes respostas sobre dados educacionais e forneça insights detalhados e acionáveis:

**1. Disciplinas com maiores taxas de reprovação:**
${respostas.q1 || 'Não informado'}

**2. Necessidade de intervenções pedagógicas personalizadas:**
${respostas.q2 || 'Não informado'}

**3. Fatores que contribuem para falta de frequência:**
${respostas.q3 || 'Não informado'}

**4. Padrões de comportamento problemáticos:**
${respostas.q4 || 'Não informado'}

**5. Influência do ambiente escolar no engajamento:**
${respostas.q5 || 'Não informado'}

Por favor, forneça uma análise estruturada com:
- Principais achados e padrões identificados
- Recomendações específicas e práticas
- Ações prioritárias a serem implementadas
- Indicadores para monitoramento

Use uma linguagem clara e profissional, organizando os insights em seções bem definidas.
`;

    console.log('Chamando OpenAI API...');

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Você é um analista educacional especializado em dados escolares. Forneça insights profissionais, práticos e baseados em evidências. Seja específico e objetivo nas recomendações."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    console.log('Resposta recebida da OpenAI');

    const insights = response.choices[0].message.content.trim();

    return res.status(200).json({ insights });

  } catch (error) {
    console.error('Erro detalhado:', error);
    
    // Check if it's an OpenAI API error
    if (error.status) {
      console.error('Erro da OpenAI:', error.status, error.message);
      return res.status(error.status).json({
        error: 'Erro ao processar com a API do OpenAI',
        message: error.message,
        details: error.type || 'Erro desconhecido'
      });
    }

    // Generic error
    return res.status(500).json({
      error: 'Erro ao processar as respostas',
      message: error.message || 'Erro desconhecido'
    });
  }
};