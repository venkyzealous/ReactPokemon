import React, { useState, useEffect} from 'react'

function DataFetcher_v1(props){

    const [isLoading,setLoading] = useState(true)
    const [post,setPost] = useState(null)
    const [error,setError] = useState(null)

    useEffect(() => {   
        const fetchData = async () => {
            try{
                console.log("fetch start")
                    //use fetch API to get a single post from JSONPlaceholder API https://jsonplaceholder.typicode.com/posts/1
                const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
                if(!response.ok){
                    throw new Error('HTTP error! status:${response.status}')
                }
                    //on success update post state with received data and set isLoading false
                const data = await response.json();
                setPost(data);
                setLoading(false);
            }
            catch (e){
                setError(e.message);
            }
            finally{
                setLoading(false);
            }
        };
        fetchData();
        
    },[]) // empty dependency ensures it runs only once when component mounts


    console.log("ready to render")
    console.log("post="+post)
    console.log("error="+error)

    return (
        <>
            <h1>
                {
                    isLoading ? "Loading....." : post.title
                }
                
                </h1>
        </>
    )

}

export default DataFetcher_v1