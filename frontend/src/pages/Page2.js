import './Page2.css'
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Page2() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const address = searchParams.get("address");



    const handleSearch = event => {
        setSearch(event.target.value);
        console.log(search);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`https://grocery-pickup-backend.onrender.com/store/search?address=${address}`)
            .then(res => res.json())
            .then(data => {
                if (data.message == "Success") {
                    console.log('yeahhhhhhh');
                    console.log(data);
                    setData(data.availableStores);
                    setFilter(data.availableStores);
                } else {
                    console.log('noooooo');
                    console.log(data);
                    toast.error("The address '" + address + "' is not found", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }
                setLoading(false);

            });
    }, []);

    const ShowProducts = () => {
        return (
            <>
                {filter.map((store) => {
                    return (
                        <NavLink to={`/products/${store._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="item" key={store._id}>
                                <img src={store.image} className="itemPic" alt={store.name} />
                                <div className="itemTxt">{store.name}</div>
                            </div>
                        </NavLink>
                    );
                })}
            </>
        );
    }

    const navigate = useNavigate();
    const searchButton = () => {
        navigate('/stores?address=' + search);
        window.location.reload(false);
    }


    return (
        <div className="Page2 container">
            <div className="row2 container">
                <div className="row2l container">
                    Search for a location
                </div>

                <div className="row2r container">
                    <input type="text" id="searchInput" name="searchInput" placeholder="Enter your address" onChange={handleSearch} value={search}></input>
                    <button className="myBtn" onClick={searchButton}>
                        Search
                    </button>
                </div>
            </div>

            <h2> Search result for '{address}' </h2>

            <div className="row3 container">
                <div className="row3r container">
                    < ShowProducts />
                    <div hidden={!loading} className="spinner-border sin-spinner">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Page2;
