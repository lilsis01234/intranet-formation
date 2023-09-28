import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role');

    if (!token) {
      navigate('/');
      return;
    }

    if (role === "Administrateur" || role === "SuperAdmin") {
      navigate('/admin/home');
    } else {
      navigate('/user/profile');
    }
  }, [navigate]);

  return (
    <div>
      {/* Contenu de la page d'accueil */}
    </div>
  );
};

export default Home;
