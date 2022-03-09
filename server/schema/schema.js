const { GraphQLSchema } = require("graphql");

const graphql=require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,    //GraphQLID means if we pass string("1") or Numerical(1) value in graphql Query parameter it does not provide error 
    GraphQLInt
} =graphql;


// dummy data
var books=[
    {name:'Name of the Wind',genre:'Fantasy',id:'1'},
    {name:'The Final Empire',genre:'Fantasy',id:'2'},
    {name:'The Long Earth',genre:'Sci-Fi',id:'3'}
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
        genre:{type:GraphQLString}
    })
})

const AuthorType= new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
       age:{type:GraphQLInt}
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
  