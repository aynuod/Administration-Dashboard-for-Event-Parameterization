import React from 'react';
import { ModeToggle } from '../components/mode-toggle'; // Assurez-vous que le chemin est correct

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex items-center">
      <div className="flex-grow text-center">
        <span className="text-sm text-gray-400"> Attijariwafa © 2024</span>
      </div>
      <div className="flex-none">
        <ModeToggle className="text-sm" />
      </div>
    </footer>
  );
};

export default Footer;
