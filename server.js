const express = require('express')
const config = require('config')
const cors = require('cors')

const PORT = config.get('port')
const db = require('better-sqlite3')(config.get('database'))

const server = express()
server.use(cors())
server.use(express.json())

server.use('/', express.static('./frontend/dist'))

server.get('/books', (req, res) => {
    const allBooks = db.prepare('SELECT * FROM books').all()
    res.status(200).send(allBooks)
})

server.get('/books/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = db.prepare('SELECT * FROM books WHERE id=?').get(id)
    res.status(book ? 200 : 404).send(book)
})

server.post('/books/', (req, res) => {
    const { title, author, description } = req.body
    if (!title) return res.status(400).send('Missing parameter "title"')
    if (!author) return res.status(400).send('Missing parameter "author"')

    const result = db.prepare('INSERT INTO books (title, author, description) values (?,?,?)').run(title, author, description)
    if (result.changes !== 1) return res.status(500).send('Database error while creating book')

    res.status(200).send({ id: result.lastInsertRowid, title, author, description })
})

server.put('/books/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = db.prepare('SELECT * FROM books WHERE id=?').get(id)
    if (!book) return res.status(404).send('No book found with id ' + req.params.id)

    const { title, author, description } = req.body
    if (title) book.title = title
    if (author) book.author = author
    if (description !== undefined) book.description = description

    const result = db.prepare('UPDATE books SET title=?, author=?, description=? WHERE id=?').run(title, author, description, id)
    if (result.changes !== 1) return res.status(500).send('Database error while updating book')
    res.status(200).send(book)

})

server.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id)
    const result = db.prepare('DELETE FROM books WHERE id=?').run(id)
    if (result.changes !== 1) return res.status(500).send('Database error while deleting book')
    res.status(204).send()
})

server.listen(PORT, () => console.log(`Buutti Book Collection running on port ${PORT}`))

module.exports = server