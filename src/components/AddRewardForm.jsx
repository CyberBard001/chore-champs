import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function AddRewardForm() {
  const { setCustomRewards } = useApp();
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !cost) return;

    const newReward = {
      id: Date.now().toString(),
      title,
      cost: parseInt(cost),
    };

    setCustomRewards(prev => [...prev, newReward]);
    setTitle('');
    setCost('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h3 className="text-md font-semibold mb-2">Add Custom Reward</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Reward title"
          className="flex-1 border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          className="w-24 border p-2 rounded"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddRewardForm;