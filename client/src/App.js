import BookList from "./components/BookList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

//apollo client setup
const client = new ApolloClient({   //here we provide the server endpoint url 
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <h1>Sumatra's Reading List</h1>
      <BookList/> 

    </div>
    </ApolloProvider>
  );
}

export default App;
