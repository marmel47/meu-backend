const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// Endpoint para enviar mensagens ao Discord
app.post('/send-to-discord', async (req, res) => {
  const { message } = req.body;

  // Se a mensagem não for fornecida, retorna um erro
  if (!message) {
    return res.status(400).send("Mensagem ausente.");
  }

  try {
    // Envia a requisição para o webhook do Discord
    await fetch('https://discord.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })  // Envia o conteúdo da mensagem para o Discord
    });

    // Responde com status 200 indicando sucesso
    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.sendStatus(500);  // Responde com status 500 em caso de erro
  }
});

// Servidor ouvindo na porta 3000 ou em uma porta configurada no ambiente
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend rodando...");
});
