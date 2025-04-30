const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota para enviar a mensagem ao Discord
app.post('/send-to-discord', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).send("Mensagem ausente.");

  try {
    await fetch('https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    res.sendStatus(200); // Responde sucesso
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.sendStatus(500); // Caso ocorra erro
  }
});

// Porta dinâmica para o Render
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend rodando...");
});
