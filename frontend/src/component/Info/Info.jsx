import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router'

import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/action/index';


const Info = () => {
    const {id} = useParams();
    const [info,setInfo] = useState([]);

    const dispatch = useDispatch();
    const addProduct = (pro) => {
        dispatch(addCart(pro));
    }
    /**
    Redux helper function(dispatch actions)
    */


    useEffect(()=>{
        const getInfo = async () => {

            const response = await fetch(`https://grocery-pickup-backend.onrender.com/storeInfo/find/${id}`);

            setInfo(await response.json());
  
            }
        getInfo();
    },[]);
    
    const addZeros = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2)


    const ShowInfo = () =>{
        return(
            <>
                <div className='col-md-6'>
                    <img src={info.image} alt={info.name} height='400px' width='400px'/>
                </div>
                <div className="col-md-6">

                    <h1 className='display-5'>{info.name}</h1>

                    <h3 className='display-6 fw-bold my-4'>
                        ${info.price ? addZeros(info.price.toString()): ""}
                    </h3>
                    <p className=''>
                        {info.description}
                    </p>
                    <button className="btn btn-outline-dark" onClick={()=>addProduct(info)}>Add to Cart</button>
                </div>

            </>
        )
    }
    return (
        <div>
            <div className='container py-5'>
                <div className='row py-4'>
                    <ShowInfo/>
                </div>
            </div>
        </div>
    )
}
export default Info;


