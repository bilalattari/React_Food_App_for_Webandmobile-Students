import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import Login from './screens/login';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Register from './screens/Register';
import { auth } from './firebase'
import AddEvent from './screens/AddEvent';
import MyEvents from './screens/MyEvents';
import Event from './screens/Event';
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
        <Route path="/event/:name/:id" element={<Event />} />
        <Route path="/event/edit/:id" element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default App;
