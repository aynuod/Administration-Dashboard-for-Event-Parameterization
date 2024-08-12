import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import logo from '/Logo_AWB.svg.png'; // Importez le logo

const Header: React.FC = () => {
  const navigate = useNavigate(); // Créez une instance de navigate

  // Fonction pour gérer le clic sur le logo
  const handleLogoClick = () => {
    navigate('/dashboard'); // le chemin de tableau de bord
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
      <img 
        src={logo} 
        alt="Attijari Logo" 
        width={100} 
        height={50} 
        onClick={handleLogoClick} // Associez le gestionnaire d'événements
        style={{ cursor: 'pointer' }} // Changez le curseur pour indiquer qu'il est cliquable
      />
      <span className="text-orange-500" onClick={handleLogoClick}>Brique de fidélité</span>
    </header>
  );
};

export default Header;
