const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>DevOps Project</title>
            <style>
                body {
                    font-family: Arial;
                    background: #1a1a2e;
                    color: white;
                    text-align: center;
                    padding: 50px;
                }
                h1 { color: #1a73e8; font-size: 3em; }
                p { font-size: 1.5em; }
                .badge {
                    background: #1a73e8;
                    padding: 10px 20px;
                    border-radius: 20px;
                    margin: 10px;
                    display: inline-block;
                }
            </style>
        </head>
        <body>
            <h1>🚀 Welcome to My DevOps Project!</h1>
            <p>Built by <strong>Piyarul Sekh</strong></p>
            <p>
                <span class="badge">🐳 Docker</span>
                <span class="badge">☸️ Kubernetes</span>
                <span class="badge">⚙️ Jenkins</span>
                <span class="badge">☁️ AWS</span>
            </p>
            <p>✅ CI/CD Pipeline Running!</p>
            <p>Version: 2.0 🎉</p>
        </body>
        </html>
    `)
})

app.listen(port, () => {
    console.log('App running on port ' + port)
})
