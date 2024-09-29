import { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import CardPizza from "../../components/CardPizza/CardPizza";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import styles from './Pizza.module.css';

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pizzas/${id}`)
      .then(response => response.json())
      .then(data => setPizza(data))
      .catch(error => console.error('Se chisporroteo la pizza:', error));
  }, [id]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Header title="Pizzeria Mamma Mia" subtitle="Tenemos las mejores pizzas que podrás encontrar" />
      <Row className="justify-content-center">
        {pizza ? (
          <Col md={8} className="mb-4" key={pizza.id}>
            <div className={styles.cardWrapper}>
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
        ) : (
          <p>Cargando pizza...</p>
        )}
      </Row>
    </Container>
  );
};

export default Pizza;
