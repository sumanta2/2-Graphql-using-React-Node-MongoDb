import {
    // gql,
    useQuery
  } from "@apollo/client";

  import {getBooksQuery} from '../queries/queries'

  
function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery)

    if (loading){ return "Loading..."}
    if(error){return "Error..."}
    //console.log(data)

    return (
      <div >
        <ul id="book-list">
            {
                data.bookss.map((book)=>{
                     return <li key={book.id}>{book.name}</li>
                    })
            }
        </ul>
      </div>
    );
  }
  
  export default BookList;
  