import React, { useState } from 'react';
import { Home, BarChart, Users, Bell, Settings, ShoppingBag, Tag, Menu, X, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Initialiser à false pour que le sidebar soit fermé par défaut

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900 text-white flex flex-col justify-between transition-width duration-300 z-50 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div>
        <button onClick={toggleSidebar} className="p-4 text-white focus:outline-none">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <nav className="space-y-2 p-4">
          <a href="#evenements" className="flex items-center p-2 rounded hover:bg-orange-500">
            <Home className={`w-5 h-5 mr-2`} />
            {isOpen && <span className="text-sm">Liste des événements</span>}
          </a>
          <a href="#statistiques-des-transactions" className="flex items-center p-2 rounded hover:bg-orange-500">
            <BarChart className={`w-5 h-5 mr-2`} />
            {isOpen && <span className="text-sm">Statistiques des transactions</span>}
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-orange-500">
            <Users className={`w-5 h-5 mr-2`} />
            {isOpen && <span className="text-sm">Utilisateurs actifs</span>}
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-orange-500">
            <Bell className={`w-5 h-5 mr-2`} />
            {isOpen && <span className="text-sm">Notifications et alertes</span>}
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-orange-500">
            <Settings className={`w-5 h-5 mr-2`} />
            {isOpen && <span className="text-sm">Paramétrage rapide des événements</span>}
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-orange-500">
            <ShoppingBag className={`w-5 h-5 mr-2`} />
            {isOpen && <span className="text-sm">Promotions et offres spéciales</span>}
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-orange-500">
            <Tag className={`w-5 h-5 mr-2`} />
            {isOpen && <span className="text-sm">Intégration du catalogue de produits</span>}
          </a>
        </nav>
      </div>
      <div className="p-4 flex flex-col items-start">
        <div className={`flex items-center ${isOpen ? 'space-x-2' : 'justify-center'}`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="text-white ml-2">
              <span className="block text-xs font-semibold text-white-300">A.Admin</span>
              <a href="/" className="flex items-center text-xs text-red-400 hover:text-white-300">
                <LogOut className="w-4 h-4 mr-1" /> Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
