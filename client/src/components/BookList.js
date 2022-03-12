import {
    gql,
    useQuery
  } from "@apollo/client";

  const getBooksQuery=gql`
  {
      bookss
      {
        name,
        id
      }
  }
  `
  
function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery)

    if (loading){ return "Loading..."}
    if(error){return "Error..."}
    //console.log(data)

    return (
      <div >
        <ul id="book-list">
            <li>Book Name</li>
            {
                data.bookss.map(({name})=>{console.log(name)})
            }
        </ul>
      </div>
    );
  }
  
  export default BookList;
  