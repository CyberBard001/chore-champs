import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function AddChildForm() {
  const { addChild } = useApp();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState('🧒');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age) return;

    const newChild = {
      id: Date.now().toString(),
      name,
      age: parseInt(age),
      avatar,
      coins: 0,
      tasks: [],
    };

    addChild(newChild);
    setName('');
    setAge('');
    setAvatar('🧒');
  };

  return (
    <form onSubmit={handleSubmit} className="add-child-form mb-6 bg-white p-4 rounded shadow max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2">Add New Child</h3>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          className="border p-2 rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        >
          <option value="🧒">🧒</option>
          <option value="🐱">🐱</option>
          <option value="🐶">🐶</option>
          <option value="🦄">🦄</option>
          <option value="🐉">🐉</option>
          <option value="👾">👾</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Child
        </button>
      </div>
    </form>
  );
}

export default AddChildForm;
