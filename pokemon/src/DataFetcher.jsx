import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { setLoading,setPost } from './features/posts/postsslice'
import { fetchData } from './features/posts/postsslice';


function DataFetcher(){

    // const [isLoading,setLoading] = useState(true)
    // const [post,setPost] = useState(null)
    // const [error,setError] = useState(null)


    const post = useSelector(state => state.posts.post)
    const isLoading = useSelector(state => state.posts.isLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("isLoading in component changed to:", isLoading);
    }, [isLoading]);
    
    useEffect(() => {   
        // const fetchData = async () => {
        //     try{
        //         console.log("fetch start")
        //             //use fetch API to get a single post from JSONPlaceholder API https://jsonplaceholder.typicode.com/posts/1
        //         const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        //         console.info(response)
        //         if(!response.ok){
        //             throw new Error('HTTP error! status:${response.status}')
        //         }
        //             //on success update post state with received data and set isLoading false
        //         const data = await response.json();
        //         console.info(data)
        //         dispatch(setPost(data))
        //         dispatch(setLoading(false))

        //         // setPost(data);
        //         // setLoading(false);
        //     }
        //     catch (e){
        //         // setError(e.message);
        //     }
        //     finally{
        //         // setLoading(false);
        //     }
        // };
        // fetchData();
        dispatch(fetchData());
    },[dispatch]) // empty dependency ensures it runs only once when component mounts


    console.log("ready to render")
    console.log("post="+post)

    return (
        <>
            <h1>
                {
                    isLoading ? "Loading....." : (post == null) ? "~": post.title
                }
                
                </h1>
        </>
    )

}

export default DataFetcher