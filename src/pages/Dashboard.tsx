import Sidebar from './Sidebar';
import StatistiquesDesTransactions from './StatistiquesDesTransactions.tsx';
import Evenements from './Evenements.tsx';

const Dashboard = () => {
  return (
<div className="flex h-screen">
  <Sidebar /> 
  <div className="ml-500 p-1 flex-1 flex flex-col">
    <p className="mb-2 text-xl font-semibold">Bienvenue dans le tableau de bord de la brique de fidélisation</p>
    <div className="mt-4 flex-2 space-y-6">
      <Evenements />
      <StatistiquesDesTransactions />
    </div>
  </div>
</div>

  );
};

export default Dashboard;
