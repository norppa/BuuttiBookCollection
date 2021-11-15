import React, { useEffect, useState } from 'react'
import BookForm from './BookForm'

import './BuuttiBookCollection.css'

const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/books' : 'books'
const noBook = { id: null, title: '', author: '', description: '' }

const BuuttiBookCollection = (props) => {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(noBook)

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const result = await fetch(api).then(result => result.json())
        setBooks(result)
    }

    const actions = {
        create: async (book) => {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            })
            if (response.status === 200) {
                const newBook = await response.json()
                setBooks(prevBooks => prevBooks.concat(newBook))
                setSelectedBook(noBook)
            } else {
                console.error('Failed to save the book')
            }
        },
        update: async (book) => {
            const response = await fetch(api + '/' + book.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            })
            if (response.status === 200) {
                const updatedBook = await response.json()
                const newBooks = books.map(item => {
                    if (item.id === updatedBook.id) {
                        return updatedBook
                    } else {
                        return item
                    }
                })
                setBooks(newBooks)
                setSelectedBook(noBook)
            } else {
                console.error('Failed to update the book')
            }
        },
        delete: async (book) => {
            const response = await fetch(api + '/' + book.id, {
                method: 'DELETE'
            })
            if (response.status === 204) {
                setBooks(prevBooks => prevBooks.filter(item => item.id !== book.id))
                setSelectedBook(noBook)
            } else {
                console.error('Faield to delete the book')
            }
        },
        clearSelection: () => {
            setSelectedBook(noBook)
        }

    }

    const select = (id) => {
        setSelectedBook(books.find(book => book.id === id))
    }

    const BookList = (props) => {
        if (books.length === 0) return null

        return <ul className="BookList">
            {books.map(book => {
                const classNames = 'BookListRow' + (book.id === selectedBook.id ? ' selected' : '')
                return <li key={book.id} className={classNames} onClick={select.bind(this, book.id)}>
                    <span className="bookTitle">{book.title}</span> by {book.author}
                </li>
            })}
        </ul>
    }


    return (
        <div className="BookCollection">
            <h1 className="header">Buutti Book Collection</h1>
            <BookList />
            <BookForm selectedBook={selectedBook} actions={actions} />
        </div>
    )
}

export default BuuttiBookCollection