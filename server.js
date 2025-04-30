const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Webhook do Discord diretamente no código (NÃO RECOMENDADO EM PRODUÇÃO)
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX';

app.post('/send-to-discord', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).send("Mensagem ausente.");

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do Discord:", response.status, errorText);
      return res.status(500).send("Erro ao enviar para o Discord.");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao tentar enviar:", error);
    res.status(500).send("Erro interno do servidor.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
