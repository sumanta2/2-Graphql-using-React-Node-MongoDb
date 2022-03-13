import {
  // gql,
  useQuery
} from "@apollo/client";
import { useState } from "react";

import { getBooksQuery } from '../queries/queries'
import BookDetails from "./BookDetails";


function BookList() {
  const [Track, setTrack] = useState({ selected: null })
  const { loading, error, data } = useQuery(getBooksQuery)

  if (loading) { return "Loading..." }
  if (error) { return "Error..." }
  //console.log(data)

  return (
    <div >
      <ul id="book-list">
        {
          data.bookss.map((book) => {
            return <li key={book.id} onClick={() => { setTrack({ selected: book.id }) }}>{book.name}</li>
          })
        }
      </ul>
      <BookDetails bookId={Track} />
    </div>
  );
}

export default BookList;
