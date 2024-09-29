import { Container, Row, Col, Button, Card, Image, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, totalPrice, token, checkout, checkoutStatus } = useContext(CartContext);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar cuándo mostrar el Alert

  const handleCheckout = async () => {
    await checkout(); // Llamamos la función checkout del contexto
    setShowAlert(true); // Activamos el Alert después de completar el checkout
  };

  return (
    <Container>
      <h2 className="my-4">Tu Carrito</h2>
      
      {/* Alert para mostrar el resultado del checkout */}
      {showAlert && checkoutStatus && (
        <Alert 
          variant="info" 
          onClose={() => setShowAlert(false)} 
          dismissible
        >
          {checkoutStatus}
        </Alert>
      )}
      
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {cart.map((pizza) => (
            <Card key={pizza.id} className="mb-3">
              <Row className="no-gutters">
                <Col md={4}>
                  <Image src={pizza.img} alt={pizza.name} fluid />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Pizza {pizza.name}</Card.Title>
                    <Card.Text>
                      Precio: ${pizza.price}
                      <br />
                      Cantidad: {pizza.count}
                    </Card.Text>
                    <Button variant="outline-dark" onClick={() => decreaseQuantity(pizza.id)} className="me-2">-</Button>
                    <Button variant="dark" onClick={() => addToCart(pizza)}>+</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <h3>Total a pagar: ${totalPrice}</h3>
          <Button 
            variant="dark" 
            disabled={!token} // Deshabilitar el botón si no hay token
            onClick={handleCheckout} // Usar la nueva función para gestionar el checkout y mostrar el Alert
          >
            Pagar
          </Button>

          {!token && <p className="mt-2 text-danger">Epa! Ponle oregano y loggeate antes de pagar.</p>}
        </>
      )}
    </Container>
  );
};

export default Cart;
