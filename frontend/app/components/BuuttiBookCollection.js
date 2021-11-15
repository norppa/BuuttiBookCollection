import React, { useEffect, useState } from 'react'

const api = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/books' : 'books'

const BuuttiBookCollection = (props) => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        init()
    }, [])
    

    const init = async () => {
        const result = await fetch(api).then(result => result.json())
        setBooks(result)
    }

    return (<div className="BuuttiBookCollection">
        <h1>Buutti Book Collection</h1>

        <ul>
            {books.map(book => <li key={book.id}>{book.title} by {book.author}</li>)}
        </ul>
    </div>)
}

export default BuuttiBookCollection