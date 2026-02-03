
import React from 'react';
import './TopBar.css';

const TopBar: React.FC = () => {
  return (
    <header className="whr-topbar" role="banner">
      <div className="whr-wrap">
        <a className="whr-brand" href="#intake">Wiring harness Restoration</a>
        <nav className="whr-nav" aria-label="Primary navigation">
          <a href="#case">CASE SUMMARY</a>
          <a href="#graph">THE GRAPH</a>
          <a href="#disclaimer">DISCLAIMER</a>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
