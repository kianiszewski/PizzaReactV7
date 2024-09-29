import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import styles from './Navbar.module.css'; 
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Home from '../../pages/Home/Home';
import Cart from '../../pages/Cart/Cart';
import Register from '../../pages/Register/Register';
import Login from '../../pages/LoginPage/LoginPage';
import Pizza from '../../pages/Pizza/Pizza';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function NavbarPizza() {
  const { totalPrice, token, logout } = useContext(CartContext);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="ms-0">
            Pizzeria Mamma Mia
          </Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="outline-light" as={Link} to="/">🍕 Home</Button>{' '}
            <div className={token ? styles.visible : styles.hidden}>
              <Button variant="outline-light" as={Link} to="/profile">🔓 Profile</Button>{' '}
              <Button variant="outline-light" onClick={logout}>🔒 Logout</Button>{' '}
            </div>
            <div className={!token ? styles.visible : styles.hidden}>
              <Button variant="outline-light" as={Link} to="/login">🔐 Login</Button>{' '}
              <Button variant="outline-light" as={Link} to="/register">🔐 Register</Button>{' '}
            </div>
          </Nav>
          <Nav>
            <Button variant="outline-light" as={Link} to="/cart">
              🛒 Total: ${totalPrice}
            </Button>{' '}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizzas/:id" element={<Pizza />} />
        <Route path="/pizzas/undefined" element={<Navigate to="/" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default NavbarPizza;
