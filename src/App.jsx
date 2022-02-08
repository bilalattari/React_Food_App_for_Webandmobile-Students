import logo from './logo.svg';
import './App.css';
import Card from './component/card';
import FoodCard from './component/foodCard';
import { Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import About from './screens/About'
import Todos from './screens/Todos';
import AddTodos from './screens/AddTodo';
import Login from './screens/login';
import { onAuthChanges } from './firebase'
function App() {



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
