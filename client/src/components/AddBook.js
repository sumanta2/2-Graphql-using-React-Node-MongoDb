import {useState} from 'react'
import {
    // gql,
    useQuery,
    useMutation
} from "@apollo/client";

import { getAuthorsQuery,AddBookMutation} from '../queries/queries'



function AddBook() {
    const [value, setValue] = useState({ name: '', genre: '', authorId: 'Not Selected' })

    const { loading:AuthorsLoading, data:AuthorsData } = useQuery(getAuthorsQuery)   //fetch multiple graphql query  data in same file
    //const {loading:bookLoading, data:myData} = useQuery(AddBookMutation)
    const [createPost, {loading:bookLoading, data:myData}] = useMutation(AddBookMutation);


    if (AuthorsLoading ) { return "Loading..." }
    //console.log(data)

    const submitForm=(e)=>{

        e.preventDefault()
        createPost({variables:{
                name:value.name,
                genre:value.genre,
                authorId:value.authorId
        }})

        if (bookLoading){ return "Loading"}
        console.log(value)

    }


    const inputEvent=(event)=>{

        const { value, name }=event.target
        setValue((preValue)=>{

            return{
                ...preValue,   
                [name]:value,  
            }
        })}


    return (
        <>
            <form id="add-book" onSubmit={submitForm}>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name="name" value={value.name} onChange={inputEvent} />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name="genre" value={value.genre} onChange={inputEvent} />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={inputEvent} >
                    {AuthorsLoading && <option>Loading Authors</option>}
                    <option >select author</option>
                    {!AuthorsLoading &&
                        AuthorsData?.authors.map((author) => {
                            return <option key={author.id} value={author.id}>{author.name}</option>
                        })}
                    </select>
                
            </div>
            <button type="submit">+</button>

        </form>
      </>
    );
}

export default AddBook;