import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePizza from "./pages/CreatePizza";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        
        <Route element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}> 

            <Route path="/create-pizza" element={<CreatePizza/>}/>
        </Route>
        

      </Routes>
    
      <FooterCom/>
    </BrowserRouter>
  )
}
