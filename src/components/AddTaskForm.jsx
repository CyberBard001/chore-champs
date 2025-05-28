import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function AddTaskForm() {
  const { selectedChild, setChildrenList } = useApp();
  const [taskTitle, setTaskTitle] = useState('');
  const [coins, setCoins] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setChildrenList(prev =>
      prev.map(child => {
        if (child.id !== selectedChild.id) return child;
        return {
          ...child,
          tasks: [
            ...child.tasks,
            {
              id: Date.now().toString(),
              title: taskTitle,
              status: 'pending',
              coins: parseInt(coins),
            },
          ],
        };
      })
    );

    setTaskTitle('');
    setCoins(10);
  };

  return (
    <form onSubmit={handleSubmit} className="assign-task-form mb-4 bg-white p-4 rounded shadow">
      <h3 className="text-md font-semibold mb-2">Assign New Task</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="e.g., Feed the cat"
          className="flex-1 border p-2 rounded"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Coins"
          className="w-24 border p-2 rounded"
          value={coins}
          onChange={(e) => setCoins(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;
