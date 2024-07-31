import React from 'react';
import logo from '/Logo_AWB.svg.png'; // Assurez-vous que le chemin est correct

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
      <img src={logo} alt="Attijari Logo" width={100} height={50} />
      <span className="text-orange-500">Brique de fidélité</span>
    </header>
  );
};

export default Header;
