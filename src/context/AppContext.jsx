import React, { createContext, useContext, useState, useEffect } from 'react';
import { dummyChildren } from '../data/dummyData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Load children from localStorage or start empty
  const [childrenList, setChildrenList] = useState(() => {
    const stored = localStorage.getItem('choreChamps_children');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedChildId, setSelectedChildId] = useState(null);

  // Load rewards from localStorage or start empty
  const [customRewards, setCustomRewards] = useState(() => {
    const stored = localStorage.getItem('choreChamps_rewards');
    return stored ? JSON.parse(stored) : [];
  });

  // Persist childrenList to localStorage
  useEffect(() => {
    localStorage.setItem('choreChamps_children', JSON.stringify(childrenList));
  }, [childrenList]);

  // Persist customRewards to localStorage
  useEffect(() => {
    localStorage.setItem('choreChamps_rewards', JSON.stringify(customRewards));
  }, [customRewards]);

  const selectedChild = childrenList.find(child => child.id === selectedChildId) || null;

  const setSelectedChild = (child) => {
    setSelectedChildId(child ? child.id : null);
  };

  const approveTask = (childId, taskId) => {
    setChildrenList(prev =>
      prev.map(child => {
        if (child.id !== childId) return child;
        const taskToApprove = child.tasks.find(t => t.id === taskId);
        const rewardCoins = taskToApprove?.coins || 10;
        return {
          ...child,
          coins: child.coins + rewardCoins,
          tasks: child.tasks.map(task =>
            task.id === taskId ? { ...task, status: 'approved' } : task
          ),
        };
      })
    );
  };

  const addChild = (child) => {
    setChildrenList(prev => [
      ...prev,
      { ...child, id: `c${Date.now()}`, coins: 0, tasks: [] }
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        childrenList,
        setChildrenList,
        selectedChild,
        setSelectedChild,
        approveTask,
        addChild,
        customRewards,
        setCustomRewards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
