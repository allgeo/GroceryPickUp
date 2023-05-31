import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';

const Product = () => {
    const {id} = useParams();
    console.log(id)
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            const response = await fetch(`https://grocery-pickup-backend.onrender.com/storeinfo/all/${id}`);
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());

            }
            console.log(componentMounted);
        }
        getProducts();
    }, []);

    const addZeros = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2)

    const ShowProducts = () => {
        return (
            <>
                {filter.map((product) => {
                    return (
                        <>
                            <div className='col-md-3'>
                                <div className="card text-center p-5" key={product._id}>
                                    <img src={product.image} className="card-img-top" alt={product.name} height="250px"/>
                                        <div className="card-body fw-bolder">
                                            <h5 className="card-title">{product.name.substring(0,12)}..</h5>
                                            <p className="card-text">${addZeros(product.price.toString())}</p>
                                            <NavLink to={`/info/${product._id}`} className="btn btn-outline-info me-2">Detail</NavLink>
                                        </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </>
        )

    }
    return (
        <div>
            <div className="container my-5 ">
                <div className='row'>
                    <div className='col-12 mb-5'>
                        <h1 className='fw-bolder text-center'>Products</h1>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <ShowProducts />
                </div>
            </div>
        </div>
    )
}

export default Product;