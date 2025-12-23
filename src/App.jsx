import React, { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Navbar from  './Navbar';
import Cart from './Pages/Cart';
import Sign from './Pages/Sign';
import Checkout from "./Pages/Checkout";
import OrderSummary from './Pages/Ordersummary';
import Payment from "./Pages/Payment";




function App() {
  return (
    <div>
      <Router>
       <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/ordersummary' element={<OrderSummary/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment' element = {<Payment/>}/>
       </Routes>
      </Router>
      
        {/* <Res/>    
        <                                                                                                                                                            */}
    </div>
  )
}

export default App;
