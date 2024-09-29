import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext"; 
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(CartContext); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Favor ingresa los datos requeridos');
      return;
    }

    if (password.length < 6) {
      alert('Bonk, la contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); 
        alert('Inicio de sesión exitoso');
        navigate('/'); 
      } else {
        alert('Credenciales incorrectas, por favor intenta de nuevo');
      }

    } catch (error) {
      console.error('Error durante el login:', error);
      alert('Hubo un error en el proceso de autenticación');
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form className="formulario" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Login;
