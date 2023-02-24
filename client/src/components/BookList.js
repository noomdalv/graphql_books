import React from 'react';
import BookDetails from './BookDetails';
import { getBooksQuery } from '../queries/queries';
import { useQuery } from '@apollo/client';

export default function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);

    const [selectedBookId, setSelectedBookId] = React.useState(null);

    if (loading) return <p>Loading Books...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <ul id="book-list">
                {data.books.map(book => (
                    <li key={book.id} onClick={() => setSelectedBookId(book.id)}>{book.name}</li>
                ))}
            </ul>
            <BookDetails bookId={selectedBookId} />
        </div>
    );
}
