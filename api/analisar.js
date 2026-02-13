const OpenAI = require('openai').default;

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'API Key não configurada',
        message: 'Configure OPENAI_API_KEY nas variáveis de ambiente'
      });
    }

    const respostas = req.body;

    if (!respostas || Object.keys(respostas).length === 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Analise as seguintes respostas sobre dados educacionais e forneça insights detalhados:

1. Disciplinas com maiores taxas de reprovação:
${respostas.q1 || 'Não informado'}

2. Necessidade de intervenções pedagógicas:
${respostas.q2 || 'Não informado'}

3. Fatores que contribuem para falta de frequência:
${respostas.q3 || 'Não informado'}

4. Padrões de comportamento:
${respostas.q4 || 'Não informado'}

5. Influência do ambiente escolar:
${respostas.q5 || 'Não informado'}

Forneça insights estruturados com recomendações práticas.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Você é um analista educacional. Forneça insights profissionais e objetivos."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const insights = response.choices[0].message.content.trim();
    return res.status(200).json({ insights });

  } catch (error) {
    console.error('Erro:', error);
    
    return res.status(500).json({
      error: 'Erro ao processar',
      message: error.message
    });
  }
};