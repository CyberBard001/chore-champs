import React, { useEffect, useState } from 'react';
import Joyride from 'react-joyride';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import ChildChoreView from './pages/ChildChoreView';
import RewardShop from './pages/RewardShop';

function App() {
  const { selectedChild } = useApp();

  // Joyride onboarding state
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('seenChoreChampsTour');
    if (!hasSeenTour) {
      setRunTour(true);
      localStorage.setItem('seenChoreChampsTour', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Joyride
        run={runTour}
        stepIndex={stepIndex}
        steps={[
          {
            target: '.add-child-form',
            content: 'Start by adding your first child. You can add as many as you like!',
          },
          {
            target: '.child-card',
            content: 'Click on a child to see their tasks and progress.',
          },
          {
            target: '.go-to-shop',
            content: 'Here’s where kids can redeem coins for rewards!',
          },
          {
            target: '.assign-task-form',
            content: 'Add chores for your child. These earn coins when marked complete!',
          },
          {
            target: '.task-reward',
            content: 'Review completed tasks here and approve them to reward your child.',
          },
        ]}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#4F46E5',
          },
        }}
        callback={(data) => {
          const { status, type } = data;
          if (['finished', 'skipped'].includes(status)) {
            setRunTour(false);
            setStepIndex(0);
          } else if (type === 'step:after') {
            setStepIndex(prev => prev + 1);
          }
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={selectedChild ? <ChildChoreView /> : <Dashboard />} />
          <Route path="/shop" element={<RewardShop />} />
        </Routes>
      </Router>
      <button
        onClick={() => {
          setRunTour(true);
          setStepIndex(0);
        }}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
        title="Replay Tutorial"
      >
        ❓ Help
      </button>
    </div>
  );
}

export default App;
