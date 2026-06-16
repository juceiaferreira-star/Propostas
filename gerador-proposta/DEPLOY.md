# Gerador de Propostas — Sales Clube
## Guia de Deploy na Vercel

---

### Estrutura do projeto

```
gerador-proposta/
  ├── index.html        ← app completo (front-end)
  ├── api/
  │   └── extrair.js    ← função serverless (chama a IA)
  ├── vercel.json       ← configuração da Vercel
  └── DEPLOY.md         ← este arquivo
```

---

### Passo 1 — Subir no GitHub

1. Acesse github.com e crie um repositório novo (ex: `gerador-proposta-salesclube`)
2. Faça upload dos arquivos desta pasta (arraste e solte ou use o GitHub Desktop)
3. Confirme o commit

---

### Passo 2 — Conectar na Vercel

1. Acesse vercel.com e faça login
2. Clique em **"Add New Project"**
3. Selecione o repositório que você criou no GitHub
4. Clique em **"Deploy"** — a Vercel detecta tudo automaticamente

---

### Passo 3 — Adicionar a chave API (IMPORTANTE)

Sem este passo, a extração com IA não vai funcionar.

1. No painel do projeto na Vercel, clique em **"Settings"**
2. Clique em **"Environment Variables"**
3. Adicione:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (sua chave da Anthropic)
4. Clique em **"Save"**
5. Vá em **"Deployments"** → clique nos três pontinhos → **"Redeploy"**

---

### Passo 4 — Acessar o app

Após o redeploy, a Vercel vai te dar um link no formato:
`https://gerador-proposta-salesclube.vercel.app`

Esse link é só seu — compartilhe apenas com quem quiser.

---

### Como usar no dia a dia

1. Abra o link
2. Cole a transcrição da reunião (Google Meet, Teams, Zoom)
3. Clique em **"Extrair com IA"** — os campos são preenchidos automaticamente
4. Revise e ajuste o que precisar (campos em azul = preenchidos pela IA)
5. Adicione valor e dados do Sales Clube
6. Clique em **"Gerar proposta"**
7. Clique em **"Copiar texto"** → cole no Gamma

---

### Custo estimado por proposta

Cada extração de transcrição consome ~1.000 tokens.
Custo aproximado: **R$ 0,03 por proposta** (menos de 3 centavos).

---

### Dúvidas?

Qualquer problema no deploy, manda a mensagem de erro para o Claude resolver.
