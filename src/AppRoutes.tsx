import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/firstcard';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Settings from './pages/Settings';
import FormulaireParametrage from './pages/FormulaireParametrage';
import AjouterEvnt from './pages/ajouterEvnt'; 
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center mt-16">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/parametrage/:id" element={<FormulaireParametrage />} />
            <Route path="/ajouterEvnt" element={<AjouterEvnt />} /> 
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
