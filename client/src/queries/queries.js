import {
    gql,
  } from "@apollo/client";
import { useEffect } from "react";

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
  
  const AddBookMutation=gql`
  {
    mutation{
      addBook(name:"",genre:"",authorId:"",){
        name,
        id
      }
    }
  }`

  export {getAuthorsQuery, getBooksQuery, AddBookMutation};