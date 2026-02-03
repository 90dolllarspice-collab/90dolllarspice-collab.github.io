
import React from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import GoalSection from './components/GoalSection';
import GraphSection from './components/GraphSection';

function App() {
  return (
    <div className="app">
      <TopBar />
      <Hero />
      <GoalSection />
      <GraphSection />
    </div>
  );
}

export default App;
