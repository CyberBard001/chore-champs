import React from 'react';
import { useApp } from '../context/AppContext';
import AddChildForm from '../components/AddChildForm';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { childrenList, setSelectedChild } = useApp();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Parent Dashboard</h2>
      <AddChildForm />
      <Link to="/shop" className="go-to-shop text-blue-600 underline">
        Go to Reward Shop
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {childrenList.map(child => (
          <div
            key={child.id}
            onClick={() => setSelectedChild(child)}
            className="child-card border rounded-lg p-4 bg-white shadow cursor-pointer hover:bg-blue-50 transition"
          >
            <div className="text-4xl mb-2">{child.avatar}</div>
            <h3 className="text-xl font-semibold">{child.name}</h3>
            <p className="text-gray-600">Age: {child.age}</p>
            <p className="text-green-600 font-bold">Coins: {child.coins}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
