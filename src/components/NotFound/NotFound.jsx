import React from 'react';
import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button'; 
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <Card className={styles.notFoundCard}>
      <Card.Body>
        <Card.Title>Mamma Mia!</Card.Title>
        <Card.Text>
          La pazzina que estás buscando, no ha sido horneada aun.
        </Card.Text>
        <Button as={Link} to="/" variant="dark">
          Volver al Home
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NotFound;
