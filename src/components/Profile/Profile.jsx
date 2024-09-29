import React, { useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button'; 
import styles from './Profile.module.css'; 
import { CartContext } from '../../context/CartContext'; // Asegúrate de que la ruta sea correcta

function Profile() {
  const { getProfile, userProfile, logout } = useContext(CartContext);


  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <Card className={styles.profileCard}>
      <Card.Body>
        <Card.Title>Panel de usuario</Card.Title>
        {userProfile ? ( 
          <Card.Text>
            Email: {userProfile.email} {}
          </Card.Text>
        ) : (
          <Card.Text>Cargando perfil...</Card.Text> 
        )}
        <Button 
          variant="dark" 
          className={styles.logoutButton} 
          onClick={logout} // loggout
        >
          Logout
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Profile;
