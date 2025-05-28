import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AddTaskForm from '../components/AddTaskForm';
import { Link } from 'react-router-dom';

function ChildChoreView() {
  const { selectedChild, approveTask, setSelectedChild, setChildrenList } = useApp();

  const [editTaskId, setEditTaskId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [taskFilter, setTaskFilter] = useState('all'); // all, pending, approved

  if (!selectedChild) {
    return (
      <div className="text-center p-6">
        <p className="text-lg text-gray-600">No child selected.</p>
      </div>
    );
  }

  // Delete a task
  const deleteTask = (taskId) => {
    setChildrenList(prev =>
      prev.map(child => {
        if (child.id !== selectedChild.id) return child;
        return {
          ...child,
          tasks: child.tasks.filter(task => task.id !== taskId),
        };
      })
    );
  };

  // Save task edit
  const saveTaskEdit = (taskId) => {
    if (!editValue.trim()) return;
    setChildrenList(prev =>
      prev.map(child => {
        if (child.id !== selectedChild.id) return child;
        return {
          ...child,
          tasks: child.tasks.map(task =>
            task.id === taskId ? { ...task, title: editValue } : task
          ),
        };
      })
    );
    setEditTaskId(null);
    setEditValue('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <div className="text-5xl">{selectedChild.avatar}</div>
        <h2 className="text-2xl font-bold">{selectedChild.name}'s Chores</h2>
        <p className="text-green-700 font-medium">Coins: {selectedChild.coins}</p>
        <button
          onClick={() => setSelectedChild(null)}
          className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      {/* Reward Shop Button */}
      <div className="text-center mb-4">
        <Link
          to="/shop"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          🎁 Visit Reward Shop
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        {['all', 'pending', 'approved'].map(filter => (
          <button
            key={filter}
            onClick={() => setTaskFilter(filter)}
            className={`px-3 py-1 rounded ${
              taskFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <AddTaskForm />

      <div className="space-y-4">
        {selectedChild.tasks
          .filter(task => taskFilter === 'all' || task.status === taskFilter)
          .map(task => (
            <div
              key={task.id}
              className={`p-4 rounded border relative ${
                task.status === 'approved'
                  ? 'bg-green-100 border-green-400'
                  : 'bg-yellow-100 border-yellow-400'
              }`}
            >
              {editTaskId === task.id ? (
                <div className="flex gap-2 items-center">
                  <input
                    className="border p-1 flex-1 rounded"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    onClick={() => saveTaskEdit(task.id)}
                    className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p>Status: {task.status}</p>
                  <div className="task-reward">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => approveTask(selectedChild.id, task.id)}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Mark as Done
                      </button>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditTaskId(task.id);
                        setEditValue(task.title);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                      title="Edit Task"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => window.confirm('Delete this task?') && deleteTask(task.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                      title="Delete Task"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChildChoreView;
