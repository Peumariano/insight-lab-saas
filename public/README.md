# Insight Lab - SaaS Platform

![Insight Lab](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Plataforma moderna de análise de dados educacionais com IA

Insight Lab é uma plataforma SaaS completa que transforma dados educacionais em insights acionáveis usando inteligência artificial (OpenAI GPT-4o-mini).

## ✨ Características

- **Design Moderno**: Interface SaaS profissional com gradientes e animações suaves
- **Análise com IA**: Integração com OpenAI para gerar insights personalizados
- **Responsivo**: 100% adaptável a todos os dispositivos
- **Serverless**: API serverless otimizada para Vercel
- **Performance**: Carregamento rápido e experiência fluida
- **Acessível**: Interface intuitiva e fácil de usar

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js (Serverless Functions)
- **IA**: OpenAI API (GPT-4o-mini)
- **Hospedagem**: Vercel
- **Estilo**: Design System personalizado

## 📦 Estrutura do Projeto

```
insight-lab-saas/
├── api/
│   └── analisar.js          # API serverless para análise
├── public/
│   ├── css/
│   │   ├── style.css        # Estilos da página principal
│   │   └── form.css         # Estilos do formulário
│   ├── js/
│   │   ├── main.js          # JavaScript principal
│   │   └── form.js          # JavaScript do formulário
│   ├── assets/              # Imagens e recursos
│   └── index.html           # Página principal
├── pages/
│   └── form.html            # Página de análise
├── vercel.json              # Configuração da Vercel
├── package.json             # Dependências
└── README.md
```

## 🚀 Deploy na Vercel

### Passo 1: Preparar o Projeto

```bash
# Clone ou faça upload do projeto para seu repositório GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/insight-lab-saas.git
git push -u origin main
```

### Passo 2: Configurar Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente:

```
OPENAI_API_KEY=sua-chave-api-aqui
```

### Passo 3: Deploy

```bash
# Instalar Vercel CLI (opcional)
npm install -g vercel

# Deploy
vercel --prod
```

## 🔑 Configuração da API OpenAI

1. Crie uma conta em [platform.openai.com](https://platform.openai.com)
2. Gere uma API key em Settings > API Keys
3. Adicione a chave nas variáveis de ambiente da Vercel

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Criar arquivo .env
echo "OPENAI_API_KEY=sua-chave-aqui" > .env

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `public/css/style.css`:

```css
:root {
  --primary-color: #3664F4;
  --primary-dark: #2451D6;
  --primary-light: #5B85FF;
  /* ... */
}
```

### Modelo de IA

Edite em `api/analisar.js`:

```javascript
model: "gpt-4o-mini", // ou "gpt-4", "gpt-3.5-turbo"
max_tokens: 1500,
temperature: 0.7,
```

## 📝 Uso

1. Acesse a página inicial
2. Clique em "Começar Agora"
3. Preencha o formulário com dados educacionais
4. Clique em "Gerar Insights com IA"
5. Visualize os insights gerados
6. Imprima ou copie os resultados

## 🔒 Segurança

- API Key armazenada em variáveis de ambiente
- CORS configurado
- Validação de entrada
- Rate limiting (Vercel)
- HTTPS obrigatório

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Serverless API: resposta < 5s

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Pedro Mariano**

- LinkedIn: [pedro-mariano-dev](https://www.linkedin.com/in/pedro-mariano-dev/)
- GitHub: [@Peumariano](https://github.com/Peumariano)

## 🙏 Agradecimentos

- OpenAI pela API
- Vercel pela hospedagem
- Font Awesome pelos ícones
- Comunidade open source

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**
