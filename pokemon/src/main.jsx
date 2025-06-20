import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Counter from "./Counter.jsx"
import DataFetcher_v1 from './DataFetcher_v1.jsx'
import DataFetcher from './DataFetcher.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { BrowserRouter} from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache()
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
        <App />
        {/* <Counter name="Hi" initialValue={10} /> */}
        {/* <DataFetcher_v1 /> */}
        {/* <DataFetcher/> */}
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
   </StrictMode>,
)
