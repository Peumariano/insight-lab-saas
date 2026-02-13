# 🚀 Guia de Deploy na Vercel - Passo a Passo

## Pré-requisitos

- [ ] Conta no GitHub
- [ ] Conta na Vercel
- [ ] API Key da OpenAI

## Passo 1: Preparar o Código

### 1.1 Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em "New Repository"
3. Nome: `insight-lab-saas`
4. Deixe público ou privado
5. Clique em "Create repository"

### 1.2 Subir o Código

```bash
# Navegue até a pasta do projeto
cd insight-lab-saas

# Inicialize o git (se ainda não fez)
git init

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "feat: plataforma SaaS completa com IA"

# Adicione o repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/insight-lab-saas.git

# Envie para o GitHub
git branch -M main
git push -u origin main
```

## Passo 2: Obter API Key da OpenAI

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Faça login ou crie uma conta
3. Navegue até API Keys (menu lateral)
4. Clique em "Create new secret key"
5. Dê um nome: "Insight Lab Production"
6. **COPIE E SALVE A CHAVE** (ela só aparece uma vez!)
7. A chave começa com `sk-...`

## Passo 3: Deploy na Vercel

### 3.1 Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up" ou "Login"
3. Escolha "Continue with GitHub"
4. Autorize a Vercel no GitHub
5. Na dashboard, clique em "Add New..." → "Project"
6. Selecione `insight-lab-saas` da lista
7. Clique em "Import"

### 3.2 Configurar Projeto

**Framework Preset:** Other (deixe em branco)

**Build and Output Settings:**
- Build Command: `npm run build` (ou deixe vazio)
- Output Directory: `public`
- Install Command: `npm install`

### 3.3 Adicionar Variáveis de Ambiente

1. Clique em "Environment Variables"
2. Adicione:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** Cole sua chave da OpenAI (sk-...)
   - **Environments:** Marque Production, Preview e Development
3. Clique em "Add"

### 3.4 Deploy

1. Clique em "Deploy"
2. Aguarde 1-2 minutos
3. Quando terminar, você verá "🎉 Congratulations!"

## Passo 4: Testar a Aplicação

1. Clique no botão "Visit" ou copie a URL
2. Sua aplicação estará em: `https://insight-lab-saas.vercel.app`
3. Teste:
   - ✅ Página inicial carrega
   - ✅ Menu funciona
   - ✅ Botão "Começar Agora" leva ao formulário
   - ✅ Formulário aceita respostas
   - ✅ Botão "Gerar Insights" funciona
   - ✅ Insights são exibidos corretamente

## Passo 5: Configurar Domínio (Opcional)

### 5.1 Domínio Personalizado

1. No painel da Vercel, vá em "Settings" → "Domains"
2. Clique em "Add"
3. Digite seu domínio: `insightlab.com`
4. Siga as instruções para configurar DNS

### 5.2 Configuração DNS

Adicione estes registros no seu provedor de domínio:

**Para domínio raiz (insightlab.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Para subdomínio (www.insightlab.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Troubleshooting

### Erro: "API Key Inválida"

**Solução:**
1. Vá em Settings → Environment Variables
2. Verifique se `OPENAI_API_KEY` está correta
3. Gere uma nova chave se necessário
4. Redeploy: Deployments → ⋯ → Redeploy

### Erro: "Function Error"

**Solução:**
1. Verifique logs: Deployments → View Function Logs
2. Certifique-se que `openai` está em `package.json`
3. Redeploy

### Erro 404 nas Rotas

**Solução:**
1. Verifique `vercel.json`
2. Certifique-se que os arquivos estão em `public/`
3. Redeploy

### CSS Não Carrega

**Solução:**
1. Verifique caminhos em `index.html`
2. Use caminhos absolutos: `/css/style.css`
3. Verifique `vercel.json` routes
4. Redeploy

## Atualizações Futuras

Para fazer updates:

```bash
# Faça suas alterações
git add .
git commit -m "feat: nova funcionalidade"
git push

# A Vercel fará deploy automaticamente!
```

## Monitoramento

### Analytics

1. Na Vercel, vá em Analytics
2. Veja visitas, performance, erros
3. Configure alertas

### Logs

1. Deployments → Function Logs
2. Monitore chamadas da API
3. Debug erros

## Segurança

### ✅ Checklist

- [ ] API Key em variáveis de ambiente (nunca no código)
- [ ] HTTPS ativado (automático na Vercel)
- [ ] CORS configurado
- [ ] Rate limiting (built-in Vercel)

## Custos

### Vercel
- **Hobby:** Grátis
- Limites: 100GB bandwidth, serverless functions ilimitadas

### OpenAI
- **Pay-as-you-go**
- GPT-4o-mini: ~$0.15 por 1M tokens input
- Monitore em: platform.openai.com/usage

## Suporte

### Documentação
- [Vercel Docs](https://vercel.com/docs)
- [OpenAI Docs](https://platform.openai.com/docs)

### Comunidade
- [Vercel Discord](https://vercel.com/discord)
- [OpenAI Community](https://community.openai.com)

---

## ✅ Deploy Completo!

Sua aplicação está no ar! 🎉

**URL:** https://insight-lab-saas.vercel.app

**Próximos passos:**
1. Compartilhe com usuários
2. Colete feedback
3. Monitore analytics
4. Faça melhorias contínuas

---

**Problemas?** Abra uma issue no GitHub ou entre em contato!
