import React from 'react';
import { getBooksQuery } from '../queries/queries';
import { useQuery } from '@apollo/client';

export default function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <p>Loading Books...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <ul id="book-list">
                {data.books.map(book => (
                    <li key={book.id}>{book.name}</li>
                ))}
            </ul>
        </div>
    );
}
