import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import BookForm from './BookForm'

import './BuuttiBookCollection.css'
import 'react-toastify/dist/ReactToastify.css'

const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/books' : 'books'
const noBook = { id: null, title: '', author: '', description: '' }

const BuuttiBookCollection = (props) => {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(noBook)

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const result = await fetch(api).catch(error => error)
        if (result.status !== 200) {
            return showError('Could not reach the backend', result)
        }

        const books = await result.json()

        setBooks(books)
    }

    const showError = (message, error) => {
        toast.error(message)
        console.error(error)
    }

    const actions = {
        create: async (book) => {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            }).catch(error => error)
            if (response.status === 200) {
                const newBook = await response.json()
                setBooks(prevBooks => prevBooks.concat(newBook))
                setSelectedBook(noBook)
            } else {
                showError('Failed to add a new book to the database', response)
            }
        },
        update: async (book) => {
            const response = await fetch(api + '/' + book.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            }).catch(error => error)
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
                showError('Failed to update the book to the database')
            }
        },
        delete: async (book) => {
            const response = await fetch(api + '/' + book.id, {
                method: 'DELETE'
            }).catch(error => error)
            if (response.status === 204) {
                setBooks(prevBooks => prevBooks.filter(item => item.id !== book.id))
                setSelectedBook(noBook)
            } else {
                showError('Failedd to delete the book from the database')
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
            <ToastContainer />
        </div>
    )
}

export default BuuttiBookCollection