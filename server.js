const express = require('express')
const config = require('config')

const PORT = config.get('port')
const db = require('better-sqlite3')(config.get('database'))

const server = express()

server.get('/', (req, res) => {
    const result = db.prepare('SELECT * FROM books').all()
    res.send(result)
})

server.listen(3000, () => console.log('Buutti Book Collection running'))