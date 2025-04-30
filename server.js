const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint GET que será acessado quando alguém clicar no link
app.get('/send-to-discord', async (req, res) => {
  // Vamos usar um "token" ou uma mensagem estática aqui
  const message = "Aqui está o token ou outra mensagem que você quer enviar para o Discord";

  try {
    // Envia a mensagem para o Discord via Webhook
    await fetch('https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    // Retorna uma resposta indicando sucesso
    res.send('Mensagem enviada para o Discord!');
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.sendStatus(500);
  }
});

// Porta do servidor (3000 ou a porta configurada pelo Render)
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend rodando...");
});
