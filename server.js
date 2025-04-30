const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/send-to-discord', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("Mensagem ausente.");

  try {
    await fetch('https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Erro:", error);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend rodando...");
});
