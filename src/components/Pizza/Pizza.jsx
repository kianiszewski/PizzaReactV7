import { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import CardPizza from "../../components/CardPizza/CardPizza";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Pizza.module.css'; // Import the CSS module for custom styling

const Pizza = () => {
  const [pizza, setPizza] = useState(null); // State to hold the specific pizza

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas/p001') 
      .then(response => response.json())
      .then(data => setPizza(data))
      .catch(error => console.error('Se chisporroteo la pizza:', error));
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Header title="Pizzeria Mamma Mia" subtitle="Tenemos las mejores pizzas que podrás encontrar" />
      <Row className="justify-content-center"> {/* start manda el card y descripcion a la izq, end lo manda a la dereca*/}
        {pizza && (
          <Col md={8} className="mb-4" key={pizza.id}> {}
            <div className={styles.cardWrapper}> {}
              <CardPizza
                name={pizza.name} 
                price={pizza.price}
                ingredients={pizza.ingredients.map(ingredient => `${ingredient}`)}
                img={pizza.img}
              />
              <div style={{ marginTop: '10px'}}>
                <h5>{pizza.desc}</h5>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Pizza;
