const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>DevOps Project</title>
        </head>
        <body>
            <h1>🚀 My DevOps Project!</h1>
            <p>Built with Jenkins + Docker + Kubernetes!</p>
            <p>Version: 1.0</p>
        </body>
        </html>
    `)
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
