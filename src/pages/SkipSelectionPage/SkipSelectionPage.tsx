import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import SkipCard from '../../components/SkipCard/SkipCard';
import useSkipsData from './useSkipsData';
import '../../assets/styles/SkipSelectionPage.css';

const SkipSelectionPage = () => {
  const { skips, loading, error } = useSkipsData();
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [filteredSkips, setFilteredSkips] = useState(skips);

  useEffect(() => {
    if (skips.length > 0) {
      if (filter === 'all') {
        setFilteredSkips(skips);
      } else if (filter === 'small') {
        setFilteredSkips(skips.filter(skip => 
          parseInt(skip.size.split(' ')[0]) <= 6
        ));
      } else if (filter === 'medium') {
        setFilteredSkips(skips.filter(skip => {
          const size = parseInt(skip.size.split(' ')[0]);
          return size > 6 && size <= 10;
        }));
      } else if (filter === 'large') {
        setFilteredSkips(skips.filter(skip => 
          parseInt(skip.size.split(' ')[0]) > 10
        ));
      }
    }
  }, [skips, filter]);

  const handleContinue = () => {
    if (selectedSkip) {
      console.log('Selected skip:', selectedSkip);
      // Navigation logic would go here
      alert(`Benne ${selectedSkip} sélectionnée! Vous allez être redirigé vers la prochaine étape.`);
    }
  };

  const getSelectedSkipDetails = () => {
    if (!selectedSkip) return null;
    return skips.find(skip => skip.id === selectedSkip);
  };

  const selectedSkipDetails = getSelectedSkipDetails();

  const handleBackClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Pour un défilement fluide
    });
    setSelectedSkip(null); // Réinitialise la sélection
  };

  return (
    <div className="skip-selection-page">
      <Header title="Choose Your Skip Size" />
      
      <div className="container">
        <div className="page-header">
          <h1>Trouvez la benne parfaite pour votre projet</h1>
          <p>
            Sélectionnez la taille de benne qui convient le mieux à vos besoins. 
            Nos bennes sont disponibles en différentes tailles pour s'adapter à tous types de projets.
          </p>
        </div>
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des options de bennes...</p>
          </div>
        )}
        
        {error && (
          <div className="error">
            <h3>Une erreur est survenue</h3>
            <p>{error}</p>
            <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
              Réessayer
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <div className="skip-selection-container">
            <div className="skip-filters">
              <button 
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Toutes les tailles
              </button>
              <button 
                className={`filter-button ${filter === 'small' ? 'active' : ''}`}
                onClick={() => setFilter('small')}
              >
                Petites bennes (≤ 6 yards)
              </button>
              <button 
                className={`filter-button ${filter === 'medium' ? 'active' : ''}`}
                onClick={() => setFilter('medium')}
              >
                Moyennes bennes (7-10 yards)
              </button>
              <button 
                className={`filter-button ${filter === 'large' ? 'active' : ''}`}
                onClick={() => setFilter('large')}
              >
                Grandes bennes (&gt; 10 yards)
              </button>
            </div>
            
            <div className="grid-container">
              {filteredSkips.map((skip) => (
                <SkipCard 
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkip === skip.id}
                  onSelect={() => setSelectedSkip(skip.id)}
                />
              ))}
            </div>

            {selectedSkipDetails && (
              <div className="selected-summary">
                <p>Vous avez sélectionné: <strong>{selectedSkipDetails.name}</strong> à £{selectedSkipDetails.price.toFixed(2)}</p>
              </div>
            )}

            <div className="buttons-container">
              <button 
                className="back-button"
                onClick={handleBackClick}
              >
                Back
              </button>
              
              <button 
                className="continue-button"
                disabled={!selectedSkip}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        <div className="help-section">
          <h3>Besoin d'aide pour choisir la bonne taille?</h3>
          <p>
            Si vous n'êtes pas sûr de la taille de benne dont vous avez besoin, 
            n'hésitez pas à nous contacter. Notre équipe d'experts est là pour vous aider 
            à trouver la solution parfaite pour votre projet.
          </p>
          <a href="#" className="help-link">
            Voir notre guide des tailles de bennes
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkipSelectionPage;
