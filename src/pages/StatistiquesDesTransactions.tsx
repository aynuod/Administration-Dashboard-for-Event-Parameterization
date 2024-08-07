import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Exemple de données
const chartData = [
  { month: "January", pointsEarned: 186, transactions: 80 },
  { month: "February", pointsEarned: 305, transactions: 200 },
  { month: "March", pointsEarned: 237, transactions: 120 },
  { month: "April", pointsEarned: 73, transactions: 190 },
  { month: "May", pointsEarned: 209, transactions: 130 },
  { month: "June", pointsEarned: 214, transactions: 140 },
];

const StatistiquesDesTransactions = () => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-lg font-semibold">Statistiques des Transactions</h3>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pointsEarned" stroke="#8884d8" name="Points Gagnés" />
        <Line type="monotone" dataKey="transactions" stroke="#82ca9d" name="Transactions" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default StatistiquesDesTransactions;
