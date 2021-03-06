import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const BookForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [isExisting, setIsExisting] = useState(false)


    useEffect(() => {
        setIsExisting(props.selectedBook.id !== null)
        setTitle(props.selectedBook.title || '')
        setAuthor(props.selectedBook.author || '')
        setDescription(props.selectedBook.description || '')
    }, [props.selectedBook])

    const clearForm = () => {
        if (isExisting) {
            props.actions.clearSelection()
        } else {
            setTitle('')
            setAuthor('')
            setDescription('')
        }
    }

    const addNewBook = () => {
        if (!title || !author) return toast.warn('Title and Author fields are mandatory')
        props.actions.create({ title, author, description })
    }
    const updateBook = () => {
        if (!title || !author) return toast.warn('Title and Author fields are mandatory')        
        props.actions.update({ id: props.selectedBook.id, title, author, description })
    }
    const deleteBook = () => {
        if (window.confirm(`Are you sure you want to delete "${props.selectedBook.title}"`)) {
            props.actions.delete({ id: props.selectedBook.id })
        }
        
    }

    const Buttons = () => {
        if (isExisting) {
            return <div className="BookFormButtons">
                <button id="update" onClick={updateBook}>Update Book</button>
                <button id="delete" onClick={deleteBook}>Delete Book</button>
                <button id="clear" onClick={clearForm}>Cancel</button>
            </div>
        } else {
            return <div className="BookFormButtons">
                <button id="create" onClick={addNewBook}>Add New Book</button>
            </div>
        }
    }

    return <div className="BookForm">
        <form>
            <label htmlFor="title">Title:</label>
            <br />
            <input type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)} />
            <br />

            <label htmlFor="author">Author:</label>
            <br />
            <input type="text"
                id="author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)} />
            <br />

            <label htmlFor="description">Description:</label>
            <br />
            <textarea id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)} />
        </form>

        <Buttons />
        <ToastContainer />
    </div>
}

export default BookForm