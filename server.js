const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Configura o servidor para aceitar requisições JSON
app.use(express.json());

// Endpoint GET para ser acessado via URL
app.get('/send-to-discord', async (req, res) => {
  // Definindo a mensagem que será enviada para o Discord
  const message = "Aqui está o token ou mensagem que você quer enviar para o Discord.";

  try {
    // Enviando a mensagem para o Webhook do Discord
    await fetch('https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    // Responde para o usuário que a mensagem foi enviada
    res.send('Mensagem enviada para o Discord!');
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.sendStatus(500);
  }
});

// Porta do servidor (se Render estiver configurado, usa a porta definida pelo sistema)
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend rodando...");
});
