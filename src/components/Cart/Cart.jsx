import { useEffect, useState } from 'react';
import { pizzaCart } from '../../assets/pizza';
import PizzaTarjeta from '../../components/TarjetaCart/PizzaTarjeta';

const Cart = () => {
  const [pizzaList, setPizzaList] = useState(pizzaCart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcularTotal();
  }, [pizzaList]);
  const calcularTotal = () => {
    let totalPizza = 0;
    pizzaList.forEach((pizza) => {
      totalPizza += pizza.price * pizza.count;
    });
    setTotal(totalPizza);
  };
  const deletePizza = (id) => {
    const newPizzalist = pizzaList.filter((pizza) => {
      return pizza.id !== id;
    });
    setPizzaList(newPizzalist);
  };

  const handleIncrement = (id) => {
    const newPizzaList = pizzaList.map((pizza) => {
      if (pizza.id === id) {
        if (pizza.count === 10) return pizza;
        return { ...pizza, count: pizza.count + 1 };
      }
      return pizza;
    });
    setPizzaList(newPizzaList);
  };

  const handleDecrement = (id) => {
    setPizzaList((prevPizzaList) => {

      return prevPizzaList.map((pizza) => {
        if (pizza.id === id) {
          if (pizza.count === 1) {
            deletePizza(id);
            return pizza;
          }
          return { ...pizza, count: pizza.count - 1 };
        }
        return pizza;
      });
    });
  };

  return (
    <div>
      <hr />
      <h1>Carrito de compras</h1>
      <h2>Total: ${total}</h2>
      {pizzaList.map((pizza) => {
        return (
          <PizzaTarjeta
            key={pizza.id}
            pizza={pizza}
            increment={handleIncrement}
            decrement={handleDecrement}
          />
        );
      })}
    </div>
  );
};

export default Cart;