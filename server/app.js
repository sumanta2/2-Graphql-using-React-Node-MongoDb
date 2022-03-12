const express=require('express')
const {graphqlHTTP} =require('express-graphql')    //const graphqlHTTP =require('express-graphql') in following video this syntax write but now it generate error which i Write it work properly
const schema=require('./schema/schema')
const mongoose=require('mongoose')
const cors = require('cors')
const app=express()

URI='mongodb+srv://sumanta21:mydata21@cluster0.7jz9i.mongodb.net/myData?retryWrites=true&w=majority'

async function main() {
  await mongoose.connect(URI);
}

main().then(()=>{console.log("connected successfully")}).catch(err => console.log(err));

app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true

}));


app.listen(4000,()=> {console.log('Server Running..')})