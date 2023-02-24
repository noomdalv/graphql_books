import React from 'react';
import { useQuery, gql } from '@apollo/client';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

export default function AddBook({ book }) {
    const { loading, error, data } = useQuery(getAuthorsQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <form id="add-book">
                <div className='field'>
                    <label htmlFor="book-name">
                        Book name:
                    </label>
                    <input type="text" id='book-name' />
                </div>
                <div className='field'>
                    <label htmlFor="book-genre">
                        Genre:
                    </label>
                    <input type="text" id='book-genre' />
                </div>
                <div className='field'>
                    <label htmlFor="book-author">
                        Author:
                    </label>
                    <select id="book-author">
                        <option>Select Author</option>
                        {data.authors.map(author => (
                            <option key={author.id}>{author.name}</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
}
