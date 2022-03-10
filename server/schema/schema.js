const { GraphQLSchema } = require("graphql");

const graphql=require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,    //GraphQLID means if we pass string("1") or Numerical(1) value in graphql Query parameter it does not provide error 
    GraphQLInt,
    GraphQLList
} =graphql;


// dummy data
var books=[
    {name:'Name of the Wind',genre:'Fantasy',id:'1',authorId:'1'},
    {name:'The Final Empire',genre:'Fantasy',id:'2',authorId:'2'},
    {name:'The Long Earth',genre:'Sci-Fi',id:'3',authorId:'3'}
]

const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
  ]

const BookType= new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve:(parent,args)=>{    //same as:  resolve(parent,args){
                //console.log(parent)
                return authors.find(author=>author.id === parent.authorId)
            }
        }
    })
})

const AuthorType= new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
       age:{type:GraphQLInt},
       books:{
           type: new GraphQLList(BookType),
           resolve:(parent,args)=>{
               return books.filter(book=>book.authorId == parent.id)
           }
       }
    })
})

const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id: {type:GraphQLID}},  
            resolve:(parent,args)=>{
                //code to get data from db/other source
                return books.find(book => book.id === args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id: {type:GraphQLID}},  
            resolve:(parent,args)=>{
                //code to get data from db/other source
                return authors.find(author => author.id === args.id)
            }
        },
        bookss:{
            type:new GraphQLList(BookType),
            resolve:(parent,args)=>{
                return books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve:(parent,args)=>{
                return authors
            }
        }
    }
})



module.exports=new GraphQLSchema({
    query:RootQuery
})


//Run this code in GraphiQl Windows

// { 
//     book(id:"2") {  it return the name and genre which id no is 2
//       name,
//       genre,
//     } 
//   }

// {
//     author(id:"2") {    it return the name which author id is 2
//       name
      
//     } 
//   }


// {
//     book(id:2){  //according to the book it also return the author name of this book
//       name,
//       genre,
//       author{
//         name
//       }
//     }
//   }


// {
//     author(id:1) {  //it return author name which id is 1 and his all book name
//       name,
//       age,
//       books{
//         name
//       }
//     }
    
//   }
  
  
// {
//     bookss{    //It return all the books name and corresponding author name
//       name,
//       author{
//         name,
//       }
//     }
//   }


// {
//     bookss{    //It return all the books name
//       name,
//     }
//   }

// {
//     authors{  //it return the all authors name corresponding his book name
//       name,
//       books{
//         name
//       }
//     }
//   }