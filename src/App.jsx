import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import RegisterPage from './pages/Register/Register';
import LoginPage from './pages/LoginPage/LoginPage';
import { pizzaCart } from './assets/pizza';
import Cart from './pages/Cart/Cart';
import Pizza from './pages/Pizza/Pizza';
import { Link, Route, Routes } from 'react-router-dom';




function App() {
  return (
    <>
    <Navbar/>
{/*     <Home/> */}
{/*     <RegisterPage/> */}
{/*     <LoginPage/> */}
{/*     <Cart/> */}
{/*     <Pizza/> */}
    <Footer/>

    </>
  );
}

export default App;
