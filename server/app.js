const express=require('express')
const {graphqlHTTP} =require('express-graphql')    //const graphqlHTTP =require('express-graphql') in following video this syntax write but now it generate error which i Write it work properly
const schema=require('./schema/schema')
const app=express()

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true

}));


app.listen(4000,()=> {console.log('Server Running..')})