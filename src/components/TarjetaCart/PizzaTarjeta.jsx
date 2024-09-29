import { useState } from 'react';
import styles from './PizzaTarjeta.module.css';

const PizzaTarjeta = ({ pizza, increment, decrement }) => {
  return (
    <div className={styles.container}>
      <img src={pizza.img} alt="" className={styles.image} />
      <h3>Pizza {pizza.name}</h3>
      <p>$ {pizza.price}</p>
      <div className={styles.buttons}>
        <button onClick={() => {decrement(pizza.id);}}>-</button>  {/* Restar unidades de pizza */}
        <p className={styles.count}>{pizza.count}</p>
        <button onClick={() => {increment(pizza.id);}}>+</button> {/* Aumentar unidades de pizza */}
      </div>
    </div>
  );
};

export default PizzaTarjeta;