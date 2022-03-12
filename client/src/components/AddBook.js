import {
    // gql,
    useQuery
  } from "@apollo/client";

  import {getAuthorsQuery} from '../queries/queries'


  function AddBook() {
    const { loading,data } = useQuery(getAuthorsQuery)

    if(loading){return "Error..."}
    //console.log(data)

    return (
      <>
          <form id="add-book">
            
            <div className="field">
                <label>Book name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Author:</label>
                <input type="text"/>
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
                {loading && <option>Loading Authors</option> }
                    
                    {  !loading &&
                        data?.authors.map((author)=>{
                        return <option key={author.id} value={author.name}>{author.name}</option>
                        })}
                </select>
            </div>
            <button>+</button>

          </form>
      </>
    );
  }
  
  export default AddBook;