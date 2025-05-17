import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * pageSize}&limit=${pageSize}`);
                // console.log(response.data.products);
                setData(response.data.products);
                setTotalPages(Math.ceil(response.data.total / pageSize));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, pageSize]);

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    const handleIncrement = () => {
        setPage(page + 1);
        console.log(page);
    }

    const handleDecrement = () => {
        setPage(page - 1);
        console.log(page);
    }

    return (
        <div>
            {
                loading && <div>Loading...</div>
            }

            <button disabled={page === 1} onClick={handleDecrement}>
                Previous
            </button>
            <button disabled={page === totalPages} onClick={handleIncrement}>
                Next
            </button>
            <select onChange={(e) => {
                setPageSize(e.target.value);
                setPage(1);
            }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
            </select>

            {
                !loading && data && data.map((product) => {
                    return (
                        <div key={product.id}>
                            <h1>{product.id}</h1>
                            <h1>{product.title}</h1>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default App
