//import './App.css';
import Navbar from './component/Navbar/Navbar';
import Product from './component/Product/Product';
import Info from './component/Info/Info';
import Cart from './component/Cart/Cart';
import Checkout from './component/Order/Order';
import About from './component/About/About';
import Register from './component/Register/Register';
import Inventory from './component/Inventory/Inventory';
import Signin from './component/Signin/Signin';
import Admin from './component/Admin/Admin';

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

import Confirm from './component/confirm/confirm';
import { setAdmin } from './redux/action/User';


import { Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  
  const dispatch = useDispatch();

  // Check on startup to see if anything is stored in localStorage
  // tokens, ids, etc load them into 
  useEffect(() => {
    dispatch(setAdmin({
      userToken: localStorage.getItem("userToken"),
      userId: localStorage.getItem("userId"),
      storeId: localStorage.getItem("storeId"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName")
    }));

    console.log(`User Id: ${localStorage.getItem("userId")}`);
    console.log(`Store Id: ${localStorage.getItem("storeId")}`);
    console.log(`User Token: ${localStorage.getItem("userToken")}`);
    console.log(`${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`);
  }, []);

  return (
    <div className="App">
      <Navbar/>

      <Routes> 
        <Route path="/"                   element={<Page1/>}/>
        <Route path="/products/:id"       element={<Product/>}/>
        <Route path="/info/:id"           element={<Info/>}/>
        <Route path="/cart"               element={<Cart/>}/>
        <Route path="/order"              element={<Checkout/>}/>
        <Route path="/about"              element={<About/>}/>
        <Route path="/Confirm"            element={<Confirm/>}/>
        <Route path="/landing"            element={<Page1/>}/>
        <Route path="/stores"             element={<Page2/>}/>
        <Route path="/signup"             element={<Signin/>}/>
        <Route path="/login"              element={<Signin login/>}/>
        <Route path="/register"           element={<Register/>}/>
        <Route path="/inventory/:storeId" element={<Inventory/>}/>
        <Route path="/admin/:storeId"     element={<Admin/>}/>
        <Route path="*"                   element={<div style={{textAlign: "center"}}>
          <h3>404 page not found</h3> 
          <Link to="/landing">Click here to go to the home page</Link>
        </div>}/>
      </Routes>
    </div>
  );
}

export default App;
