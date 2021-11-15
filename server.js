const express = require('express')

const server = express()

server.get('/', (req, res) => {
    res.send('Buutti Book Collection Backend')
})

server.listen(3000, () => console.log('Buutti Book Collection running'))