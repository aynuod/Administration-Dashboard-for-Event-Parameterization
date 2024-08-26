import React from 'react';
import Sidebar from './Sidebar';
// import StatistiquesDesTransactions from './StatistiquesDesTransactions';
import Evenements from './Evenements';

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 p-4 flex flex-col overflow-y-auto">
      <Sidebar />
      <div className="ml-500 p-1 flex-1 flex flex-col">
        <p className="mb-2 text-xl font-semibold">Bienvenue dans le tableau de bord de la brique de fidélisation</p>
        <div className="mt-4 flex-2 space-y-6">
          <div id="evenements">
            <Evenements />
          </div>
          {/* <div id="statistiques-des-transactions">
            <StatistiquesDesTransactions />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
