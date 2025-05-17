import { useState, useEffect } from 'react'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        async function getPosts() {
            try {
                setIsLoading(true);
                const result = await axios.get("https://jsonplaceholder.typicode.com/posts");
                await new Promise(resolve => setTimeout(resolve, 2000));
                setPosts(result.data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        getPosts();


        // setPosts([
        //     {
        //         title: "Test Title",
        //         content: "This is a test content which is very long and is used just as an example"
        //     },
        //     {
        //         title: "Test Title 2",
        //         content: "This is a test content which is very long and is used just as an example"
        //     },
        //     {
        //         title: "Test Title 3",
        //         content: "This is a test content which is very long and is used just as an example"
        //     },
        //     {
        //         title: "Test Title 4",
        //         content: "This is a test content which is very long and is used just as an example"
        //     },
        //     {
        //         title: "Test Title 5",
        //         content: "This is a test content which is very long and is used just as an example"
        //     },
        // ]);

    }, []);


    if (isLoading) {
        // return <div style={{ height: "100vh", display: "flex", justifyContent: 'center', alignItems: "center" }}>
        //     <p>loading...</p>
        // </div>

        return <div style={{ padding: "16px" }}>
            {
                [1, 2, 3].map((i) => {
                    return <div style={{ padding: "16px", border: "1px solid #ddd", marginBottom: "16px", borderRadius: "12px" }}>
                        <Skeleton style={{ marginBottom: "16px" }} height={32} width={150} />
                        <Skeleton style={{ marginBottom: "6px" }} count={4} height={18} width="100%" />
                    </div>;
                })
            }
        </div>
    }

    if (error) {
        return <p style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "tomato", fontSize: "40px" }}>{error}</p>
    }

    return (
        <div>
            {
                posts.map((post) => {
                    return <div>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                })
            }
        </div>
    )
}

export default App
