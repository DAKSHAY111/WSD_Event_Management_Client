import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import AddEvent from "./Pages/AddEvent";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";


const Routing = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/addEvent" element={<AddEvent/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes>
  );

}
function App() {
  return (
    <> 
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>

  </>
  );
}

export default App;
