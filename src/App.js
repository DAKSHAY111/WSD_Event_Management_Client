import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import AddEvent from "./Pages/AddEvent";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import EventDetails from "./Pages/EventDetails";
import Dashboard from "./Pages/Dashboard";
import ViewParticipant from "./Pages/ViewParticipant";
import UpdateEvent from "./Pages/UpdateEvent";

const Routing = () => {
  let user = localStorage.getItem("user")
  return (
    <Routes>
      <Route path="/Home" element={<Home/>}/>
      
      {user ? <Route path="/AddEvent" element={<AddEvent/>}/> : <Route path="/AddEvent" element={<Home/>}/> }
      {user ? <Route path="/updateEvent/:eventId" element={<UpdateEvent/>}/> : <Route path="/updateEvent/:eventId" element={<Home/>}/> }

      <Route path="/contact" element={<Contact/>}/>

      {user && <Route path="/dashboard" element={<Dashboard/>}/>}
      <Route path="/login" element={<Login/>}/>
      <Route path="/events/:eventId" element={<EventDetails/>}/>

      {user && <Route path="/eventsParticipant/:eventId" element={<ViewParticipant/>}/>}

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
