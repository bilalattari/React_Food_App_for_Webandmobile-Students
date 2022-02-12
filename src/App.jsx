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
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Register from './screens/Register';
import { auth } from './firebase'
import AddEvent from './screens/AddEvent';
import MyEvents from './screens/MyEvents';
function App() {

  console.log('auth.currentUser=>', auth.currentUser)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="/myEvents" element={<MyEvents />} />
      </Routes>
    </div>
  );
}

export default App;
