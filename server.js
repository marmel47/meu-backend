const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');  // Importando a biblioteca CORS
const app = express();

// Habilitando CORS para aceitar requisições de qualquer origem (backend no Render)
app.use(cors());  // Permitir requisições de qualquer domínio

app.use(express.json());

// Endpoint para enviar a mensagem para o Discord
app.post('/send-to-discord', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).send("Mensagem ausente.");

  try {
    // Substitua com sua URL do Webhook
    await fetch('https://discordapp.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })  // Envia a mensagem capturada do frontend
    });

    res.sendStatus(200);  // Retorna 200 OK se sucesso
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.sendStatus(500);  // Retorna 500 caso haja erro
  }
});

// Defina a porta onde o servidor ficará escutando
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
