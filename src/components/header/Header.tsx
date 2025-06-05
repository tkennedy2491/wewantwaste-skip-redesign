import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  step?: number;
  totalSteps?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  step = 2, 
  totalSteps = 4 
}) => {
  const progress = (step / totalSteps) * 100;
  
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-logo">
          We<span>Want</span>Waste
        </div>
        
        <h1 className="header-title">{title}</h1>
        
        <nav className="header-nav">
          <a href="#" className="nav-link">Aide</a>
          <a href="#" className="nav-link">Contact</a>
        </nav>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-indicator" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
