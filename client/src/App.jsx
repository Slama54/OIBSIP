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
import UpdatePizza from "./pages/UpdatePizza";
import PizzaPage from "./pages/PizzaPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CreateBase from "./pages/CreateBase";
import CreateSauce from "./pages/CreateSauce";
import CreateCheese from "./pages/CreateCheese";
import CreateMeet from "./pages/CreateMeet";
import CreateVegetable from "./pages/CreateVegetable";
import CreateCustomPizza from "./pages/CreateCustomPizza";
const stripePromise = loadStripe('pk_test_51Pr5dvRv9JXiD6A0xaQIuMOPmMtHHa4XfHq5SYzOtDDEmJ4zd5EWnrKyhrFyjYzGTpKB9CyUG8rtrO3OLwjWQZRX00HFrunRSi');

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/pizza/:pizzaSlug" element={<PizzaPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/create-custom-pizza" element={<CreateCustomPizza/>}/>


        
        <Route element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/order" element={<Elements stripe={stripePromise}>
              <OrderPage />
            </Elements>}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}> 

            <Route path="/create-pizza" element={<CreatePizza/>}/>
            <Route path="/create-base" element={<CreateBase/>}/>
            <Route path="/create-sauce" element={<CreateSauce/>}/>
            <Route path="/create-cheese" element={<CreateCheese/>}/>
            <Route path="/create-meat" element={<CreateMeet/>}/>
            <Route path="/create-vegetable" element={<CreateVegetable/>}/>
            
            <Route path="/update-pizza/:pizzaId" element={<UpdatePizza/>}/>

        </Route>
        

      </Routes>
    
      <FooterCom/>
    </BrowserRouter>
  )
}
