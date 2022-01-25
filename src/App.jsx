import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Card from './component/card';
import FoodCard from './component/foodCard';
import { Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import About from './screens/About'
import Todos from './screens/Todos';
import AddTodos from './screens/AddTodo';

function App() {



  return (
    <div className="App">
      <h1>Todo App</h1>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="add" element={<AddTodos />} />
      </Routes>
    </div>
  );
}

export default App;
