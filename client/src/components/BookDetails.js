import {
    useLazyQuery
} from "@apollo/client";
import { useEffect } from "react";

import { getBookQuery } from '../queries/queries'


function BookDetails({ bookId }) {

    const [bookPosts, { loading: bookLoading, data: bookData, error: bookError }] = useLazyQuery(getBookQuery) //useLazyQuery hook used to send query parameter value to any query request

    useEffect(() => {
        bookPosts({
            variables: {
                id: bookId.selected
            }
        })

    }, [bookId.selected])

    // useEffect(() => {
    //     console.log(bookData)
    // }, [bookData])

    var book = bookData?.book

    if (bookLoading) { return "Loading..." }
    if (bookError) { return "Error in Fetching Data :( " }





    return (
        <div >
            <h2>{book?.name}</h2>
            <p>{book?.genre}</p>
            <p>{book?.author.name}</p>
            {book && <p>All Books by this author:</p>}
            <ul className="other-books">
                {book?.author.books.map((item) => {
                    return <li key={item.id}>{item.name}</li>
                })}
            </ul>
            {!book && <p>No Books Found...</p>}
        </div>
    );
}

export default BookDetails;