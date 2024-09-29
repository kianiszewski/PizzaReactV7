import { useState, useEffect, useContext } from 'react';
import Header from "../../components/Header/Header";
import CardPizza from "../../components/CardPizza/CardPizza";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CartContext } from '../../context/CartContext'; 

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext); // Obtener la función addToCart desde el contexto

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Se chisporroteo la pizza:', error)); 
  }, []);

  return (
    <Container>
      <Header title="Pizzeria Mamma Mia" subtitle="Tenemos las mejores pizzas que podrás encontrar" />
      <Row>
        {pizzas.map((pizza) => (
          <Col md={4} className="mb-4" key={pizza.id}>
            <CardPizza
              id={pizza.id} // Asegúrate de pasar el id de la pizza
              name={pizza.name} 
              price={pizza.price}
              ingredients={pizza.ingredients.map(ingredient => `${ingredient}`)}
              img={pizza.img}
              pizza={pizza} // Pasamos toda la pizza como prop
              addToCart={addToCart} // Pasamos la función addToCart a CardPizza
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
