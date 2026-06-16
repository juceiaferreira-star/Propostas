export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transcript } = req.body;

  if (!transcript || transcript.length < 50) {
    return res.status(400).json({ error: 'Transcrição muito curta' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave API não configurada' });
  }

  const prompt = `Analise esta transcrição de reunião de vendas e extraia as informações em JSON puro (sem markdown, sem explicações, sem blocos de código):
{
  "empresa": "nome da empresa cliente",
  "contato": "nome do contato principal",
  "cargo": "cargo do contato",
  "setor": "segmento ou setor da empresa",
  "tamanho_equipe": "tamanho da equipe de vendas se mencionado, senão vazio",
  "contexto": "como chegou o lead ou contexto geral da reunião",
  "dor": "principal dor ou desafio identificado, com detalhes",
  "resultado": "resultado que o cliente quer alcançar",
  "programa_sugerido": "sugestão de nome para o programa com base no contexto",
  "modalidade": "modalidade preferida se mencionada (Presencial, Online ao vivo, Híbrido ou Assíncrono)",
  "modulos": [
    { "nome": "nome do módulo", "duracao": "duração estimada", "publico": "público-alvo", "objetivo": "objetivo do módulo" }
  ],
  "prazo": "prazo ou urgência mencionada",
  "valor_mencionado": "valor ou faixa de orçamento se mencionado, senão vazio",
  "proximos_passos": "próximos passos combinados na reunião"
}

Transcrição:
${transcript.substring(0, 6000)}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: 'Erro na extração: ' + err.message });
  }
}
