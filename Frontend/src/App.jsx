import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
   
  //urlPath is a parameter inside the customReactQuery function.
  //  const [products,error, loading] =  customReactQuery('/api/products')

  //  const customReactQuery = (urlPath) => {

    const [products, setProducts] = useState([])
    const[error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState()
    

     useEffect(() => {
      const controller  = new AbortController() //through this controller , the signal is sended to the axios request
      //while using iffe method always put ; before  it help js code to understand where iffe statement is started.
      ;( async() => {
         try {
          setLoading(true)
          setError(false)
          const response =  await axios.get('/api/products? search=' + search, {signal: controller.signal});
          console.log(response.data)
          setProducts(response.data)
          setLoading(false)
         } catch (error) {
          if(axios.isCancel(error)){
            console.log('Request Canceled', error.message)
            return
          }

          setError(true)
          setLoading(false) 
         }
      })()

      //we have to unmound the controller or basically end the controller , which is called as clean up section
      return () => { // this code is written for race condition, not for cancel condition for that we learn about debouncing
        controller.abort() // here abort means that close the sending signal or request
      }
     }, [search])

  //  if(error){
  //   return  <h1>Something went wrong</h1>
  //  }

  //  if(loading){
  //   return <h1>Loading...</h1>
  //  }
  return (
   <>
     <h1>Api Handling in react</h1>
     <input type="text" placeholder="search" value= {search} onChange={(e) => setSearch(e.target.value)}/>
     {loading && (<h1>Loading...</h1>)}
     {error && (<h1>Something went wrong</h1>)}
     <h2>Number of Products are: {products.length}</h2>
    </>
  );
 }

export default App



