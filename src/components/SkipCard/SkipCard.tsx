import React from 'react';
import './SkipCard.css';

// Define the Skip interface locally to avoid import issues
interface Skip {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  weight_limit: number;
  coverage_radius: number;
}

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const features = [
    `Capacité de ${skip.size}`,
    `Limite de poids: ${skip.weight_limit} kg`,
    `Rayon de couverture: ${skip.coverage_radius} km`
  ];

  return (
    <div 
      className={`skip-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      aria-selected={isSelected}
    >
      <div className="card-header">
        <h3>{skip.name}</h3>
        <div className="price">
          <span className="price-currency">£</span>
          {skip.price.toFixed(2)}
        </div>
      </div>
      
      <div className="card-content">
        <div className="size-badge">{skip.size}</div>
        
        <div className="weight-limit">
          <span className="weight-limit-label">Limite de poids:</span>
          <span className="weight-limit-value">{skip.weight_limit} kg</span>
        </div>
        
        <p className="description">{skip.description}</p>
        
        <div className="skip-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <span className="feature-icon">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card-footer">
        <button 
          className="select-button"
          aria-label={`Select ${skip.name}`}
        >
          {isSelected ? 'Selected' : 'Select this skip'}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
