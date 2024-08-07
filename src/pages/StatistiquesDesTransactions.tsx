import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Fonction pour générer des données simulées
const generateRandomData = () => {
  const now = new Date();
  return {
    time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
    pointsEarned: Math.floor(Math.random() * 500),
    transactions: Math.floor(Math.random() * 300),
  };
};

const StatistiquesDesTransactions = () => {
  const [chartData, setChartData] = useState(() => [generateRandomData()]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = generateRandomData();
        return [...prevData.slice(-9), newData]; // Conserve les 10 dernières données
      });
    }, 1000); // Met à jour les données toutes les secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Statistiques des Transactions</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pointsEarned" stroke="#8884d8" name="Points Gagnés" />
          <Line type="monotone" dataKey="transactions" stroke="#82ca9d" name="Transactions" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatistiquesDesTransactions;
