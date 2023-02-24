import React from 'react';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { useQuery, useMutation } from '@apollo/client';

export default function AddBook() {
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    const [bookName, setBookName] = React.useState("");
    const [bookGenre, setBookGenre] = React.useState("");
    const [bookAuthorId, setBookAuthorId] = React.useState("");

    const submitForm = (e) => {
        e.preventDefault();
        console.log(bookName, bookGenre, bookAuthorId);
        addBook({
            variables: {
                name: bookName,
                genre: bookGenre,
                authorId: bookAuthorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <form id="add-book" onSubmit={(e) => submitForm(e)}>
                <div className='field'>
                    <label htmlFor="book-name">
                        Book name:
                    </label>
                    <input type="text" id='book-name' onChange={(e) => { setBookName(e.target.value); }} />
                </div>
                <div className='field'>
                    <label htmlFor="book-genre">
                        Genre:
                    </label>
                    <input type="text" id='book-genre' onChange={(e) => { setBookGenre(e.target.value); }} />
                </div>
                <div className='field'>
                    <label htmlFor="book-author">
                        Author:
                    </label>
                    <select id="book-author" onChange={(e) => { setBookAuthorId(e.target.value); }}>
                        <option>Select Author</option>
                        {data.authors.map(author => (
                            <option key={author.id} value={author.id}>{author.name}</option>
                        ))}
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
    );
}
