import React from 'react';
import { useApp } from '../context/AppContext';
import AddRewardForm from '../components/AddRewardForm';

const dummyRewards = [
  { id: '1', title: '30 mins screen time', cost: 20 },
  { id: '2', title: 'Trip to the park', cost: 50 },
  { id: '3', title: '1 extra bedtime story', cost: 15 },
];

function RewardShop() {
  const {
    selectedChild,
    setSelectedChild,
    childrenList,
    setChildrenList,
    customRewards,
  } = useApp();

  const handleRedeem = (reward) => {
    if (!selectedChild) return alert("Select a child first.");
    if (selectedChild.coins < reward.cost) return alert("Not enough coins!");

    const confirm = window.confirm(`Redeem "${reward.title}" for ${reward.cost} coins?`);
    if (!confirm) return;

    setChildrenList(prev =>
      prev.map(child => {
        if (child.id !== selectedChild.id) return child;
        return {
          ...child,
          coins: child.coins - reward.cost,
        };
      })
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Reward Shop</h2>
      <AddRewardForm />

      {childrenList.length > 0 && (
        <div className="mb-4 text-center">
          <label className="mr-2 font-medium">Select Child:</label>
          <select
            className="border p-2 rounded"
            value={selectedChild?.id || ''}
            onChange={(e) => {
              const chosen = childrenList.find(child => child.id === e.target.value);
              setSelectedChild(chosen || null);
            }}
          >
            <option value="">-- Select --</option>
            {childrenList.map(child => (
              <option key={child.id} value={child.id}>
                {child.name} ({child.coins} coins)
              </option>
            ))}
          </select>
        </div>
      )}

      {!selectedChild && (
        <p className="text-center text-red-500 mb-4">
          Please select a child to view available rewards.
        </p>
      )}

      <div className="grid gap-4">
        {[...dummyRewards, ...customRewards].map(reward => (
          <div key={reward.id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{reward.title}</h3>
            <p className="text-gray-600">Cost: {reward.cost} coins</p>
            <button
              onClick={() => handleRedeem(reward)}
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              disabled={!selectedChild || selectedChild.coins < reward.cost}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardShop;
