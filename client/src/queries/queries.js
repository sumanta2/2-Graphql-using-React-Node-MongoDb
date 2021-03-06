import {
    gql,
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

  const getAuthorsQuery=gql`
  {
      authors
      {
        name,
        id
      }
  }
  `
  //THE EXAMPLE OF QUERY VARIABLE
  //here ! indicate this value is mandatory Blank data not allowed
  const AddBookMutation=gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){   
      addBook(name:$name,genre:$genre,authorId:$authorId,){
        name,
        id
      }
  }`


  const getBookQuery=gql`
  query($id:ID){
    book(id:$id){
      id,
      name,
      genre
      author{
        id
        name 
        age
        books{
          name
          id 
        }
      }
    }
  }
  `

  export {getAuthorsQuery, getBooksQuery, AddBookMutation,getBookQuery};