import {useState} from 'react'
import {
    // gql,
    useQuery
} from "@apollo/client";

import { getAuthorsQuery } from '../queries/queries'


function AddBook() {
    const [value, setValue] = useState({ name: '', genre: '', authorId: 'Not Selected' })

    const { loading, data } = useQuery(getAuthorsQuery)

    if (loading) { return "Error..." }
    //console.log(data)

    const submitForm=(e)=>{
        e.preventDefault()
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
                    {loading && <option>Loading Authors</option>}
                    <option >select author</option>
                    {!loading &&
                        data?.authors.map((author) => {
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