import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Card from './component/card';
import FoodCard from './component/foodCard';
import { Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import About from './screens/About'


function App() {



  return (
    <div className="App">
      <h1>My First React App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
