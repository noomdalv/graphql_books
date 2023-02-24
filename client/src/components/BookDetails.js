import React from 'react';
import { getBookQuery } from '../queries/queries';
import { useQuery } from '@apollo/client';

export default function BookDetails({ bookId }) {
    const { loading, error, data } = useQuery(getBookQuery, { variables: { id: bookId } });

    if (!bookId) return <div id="book-details">Select a book for details</div>;
    if (loading) return <p>Loading details...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            {data &&
                <div id="book-details">
                    <p>{data.book.name}</p>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className='other-books'>
                        {data.book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>;
                        })}
                    </ul>
                </div>
            }
        </>
    );
}
