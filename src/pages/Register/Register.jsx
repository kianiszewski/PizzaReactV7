import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext"; 
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setToken } = useContext(CartContext); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Favor ingresa los datos requeridos');
      return;
    }

    if (password.length < 6) {
      alert('Bonk, la contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      alert('Bonk, las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); 
        alert('Registro exitoso');
        navigate('/'); // Redirigir al home
      } else {
        alert('Error en el registro, por favor intenta de nuevo');
      }

    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Hubo un error en el proceso de registro');
    }
  };

  return (
    <>
      <h1>Registro</h1>
      <form className="formulario" onSubmit={handleRegister}>
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
        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Register;
