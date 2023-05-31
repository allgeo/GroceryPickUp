import logo from "./logo.PNG"
import './Page1.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Page1() {
    const [search, setSearch] = useState('');

    const handleSearch = event => {
        setSearch(event.target.value);
        console.log(search);
    };

    const navigate = useNavigate();
    const searchButton = () => {
        navigate('/stores?address=' + search);
    }

    return (
        <div className="Page1 container">

            <div className="myBody container">
                <div className="myMiddle container">
                    <div className="left container">
                        <div>
                            Enter your location to see stores in you area!
                        </div>
                        <div className='container searchBar'>
                            <input type="text" id="searchInput" placeholder="Enter your address" name="searchInput" onChange={handleSearch} value={search}></input>
                            <button className='myBtn' onClick={searchButton}>Search</button>
                        </div>
                    </div>

                    <div className="right">
                        <img src={logo}></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page1;