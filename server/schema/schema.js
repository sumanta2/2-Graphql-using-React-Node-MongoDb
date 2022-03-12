const { GraphQLSchema } = require("graphql");

const graphql=require('graphql')
const Book= require("../models/book")
const Author=require("../models/author"); 

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,    //GraphQLID means if we pass string("1") or Numerical(1) value in graphql Query parameter it does not provide error 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} =graphql;


// dummy data
// var books=[
//     {name:'Name of the Wind',genre:'Fantasy',id:'1',authorId:'1'},
//     {name:'The Final Empire',genre:'Fantasy',id:'2',authorId:'2'},
//     {name:'The Long Earth',genre:'Sci-Fi',id:'3',authorId:'3'}
// ]

// const authors =  [
//     {name: 'Patrick Rothfuss', age: 44, id:"1"},
//     {name: 'Brandon Sanderson', age: 42, id:"2"},
//     {name: 'Terry Pratchett', age: 66, id:"3"},
//   ]

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
                // return authors.find(author=>author.id === parent.authorId)
                return Author.findById(parent.authorId)
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
            //    return books.filter(book=>book.authorId == parent.id)
            return Book.find({authorId:parent.id})
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
                // return books.find(book => book.id === args.id)
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id: {type:GraphQLID}},  
            resolve:(parent,args)=>{
                //code to get data from db/other source
                // return authors.find(author => author.id === args.id)
                return Author.findById(args.id)
            }
        },
        bookss:{
            type:new GraphQLList(BookType),
            resolve:(parent,args)=>{
                // return books
                return Book.find({})   //here empty braces return all data
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve:(parent,args)=>{
                // return authors
                return Author.find({})  //here empty braces return all data
            }
        }
    }
})

const Mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},  //new GraphQLNonNull means it is mandatory property in query if does not provide this property value graphql generate error
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>{
                let author= new Author({
                    name:args.name,
                    age:args.age
                });
                 return author.save()  //it save the data to online database
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},  //new GraphQLNonNull means it is mandatory property in query if does not provide this property value graphql generate error
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)},
            },
            resolve:(parent,args)=>{
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save()          //it save the data to online database
            }
        }
    }
})



module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation      //it used for mutation type request like insert data delete or update data etc
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


// mutation{
//     addAuthor(name:"Shgign",age:37){      //this is mutation type query help to insert data in database
//       name,age
//   }
//   }

// mutation{
//     addBook(name:"Red Bull",genre:"Avhi",authorId:"622b61351cb77557a470df7c"){
//       name,
//       genre              //this is mutation type query help to insert data in database
//   }
//   }