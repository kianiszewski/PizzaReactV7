import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userPizza, setUserPizza] = useState([]);
  const [token, setToken] = useState(null); // El token se gestiona aquí
  const [userProfile, setUserProfile] = useState(null); // Estado para almacenar el perfil del usuario
  const [checkoutStatus, setCheckoutStatus] = useState(null); // Para manejar el estado del checkout

  const addToCart = (pizza) => {
    const index = cart.findIndex((item) => item.id === pizza.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].count++;
      setCart(newCart);
    } else {
      const newCart = [...cart, { ...pizza, count: 1 }];
      setCart(newCart);
    }
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, pizza) => total + pizza.price * pizza.count,
    0
  );

  const getQuantity = () => {
    return Math.round(cart.reduce((total, pizza) => total + pizza.count, 0));
  };

  const getPizza = async (id) => {
    const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
    const data = await response.json();
    setUserPizza(data);
  };

  const logout = () => {
    setToken(null); // Cambiar token a null al cerrar sesión
    setUserProfile(null); // Limpiar el perfil del usuario al cerrar sesión
  };

  // Función para obtener el perfil del usuario
  const getProfile = async () => {
    if (!token) return; // Verificar si hay un token válido
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
        },
      });

      if (!response.ok) throw new Error("Error al obtener el perfil");
      const data = await response.json();
      setUserProfile(data); // Almacenar el perfil en el estado
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }
  };

  // Función para procesar el checkout
  const checkout = async () => {
    if (!token) {
      setCheckoutStatus("No has iniciado sesión");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Usar el token JWT
        },
        body: JSON.stringify({
          cart: cart, // Enviar el carrito en el body
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el checkout");
      }

      const data = await response.json();
      setCheckoutStatus("Compra realizada con éxito"); // Mensaje de éxito
      setCart([]); // Limpiar carrito después de la compra

    } catch (error) {
      setCheckoutStatus("Error durante el proceso de pago"); // Mensaje de error
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        totalPrice,
        getQuantity,
        getPizza,
        userPizza,
        setUserPizza,
        token,
        setToken,
        logout,
        getProfile, // Incluir función para obtener el perfil
        userProfile, // Estado del perfil del usuario
        checkout, // Incluir función de checkout
        checkoutStatus, // Estado del checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
