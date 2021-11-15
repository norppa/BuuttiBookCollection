process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

const config = require('config')
const db = require('better-sqlite3')(config.get('database'))

chai.use(chaiHttp)

describe('Books', () => {
    beforeEach((done) => {
        db.prepare('DROP TABLE IF EXISTS books').run()
        db.prepare('CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, description TEXT)').run()
        db.prepare('INSERT INTO books VALUES (?,?,?,?)').run(1, 'BookTitle', 'BookAuthor', 'BookDescription')
        done()
    })

    describe('/GET All Books', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/books')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(1)
                    done()
                })
        })
    })

    describe('/GET One Book', () => {
        it('it should GET one book', (done) => {
            chai.request(server)
                .get('/books/1')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.title.should.be.eq('BookTitle')
                    done()
                })
        })
    })

    describe('/POST New Book', () => {
        it('it should post a new book', (done) => {
            const book = { title: 'NewBookTitle', author: 'NewBookAuthor', description: 'NewBookDescription'}
            chai.request(server)
                .post('/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200) 
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.title.should.be.eq('NewBookTitle')
                    done()
                })
        })
    })

    describe('/PUT Update Book', () => {
        it('it should update an existing book', (done) => {
            const book = { title: 'NewBookTitle', author: 'NewBookAuthor', description: 'NewBookDescription'}
            chai.request(server)
                .put('/books/1')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200) 
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.title.should.be.eq('NewBookTitle')
                    done()
                })
        })
    })

    describe('/DELETE Remove Book', () => {
        it('it should remove an existing book', (done) => {
            chai.request(server)
                .delete('/books/1')
                .end((err, res) => {
                    res.should.have.status(204) 
                    done()
                })
        })
    })

    after((done) => {
        db.close()
        done()
    })

})