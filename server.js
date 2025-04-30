const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Endpoint para testar o servidor
app.get("/", (req, res) => {
  res.send("Servidor está funcionando!");
});

// Endpoint para enviar mensagem para o Discord
app.post('/send-to-discord', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("Mensagem ausente.");

  try {
    const response = await fetch('https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    if (response.ok) {
      console.log("Mensagem enviada com sucesso!");
      res.status(200).send("Mensagem enviada com sucesso!");
    } else {
      console.error("Erro ao enviar para o Discord:", response.status, response.statusText);
      res.status(500).send("Erro ao enviar mensagem.");
    }
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Erro ao tentar enviar ao Discord.");
  }
});

// Porta do servidor
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend rodando...");
});
