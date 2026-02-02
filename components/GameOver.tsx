import React from 'react';

interface GameOverProps {
  finalScore: number;
  bestScore: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ finalScore, bestScore, onRestart }) => {
  const isNewBest = finalScore >= bestScore;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease',
  };

  const modalStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
    borderRadius: '16px',
    padding: '32px 40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    maxWidth: '320px',
    width: '90%',
    border: '3px solid #ffd54f',
    animation: 'slideIn 0.4s ease',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '8px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#5d4037',
    marginBottom: '24px',
  };

  const scoreContainerStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    border: '2px solid #ffd54f',
  };

  const scoreLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#5d4037',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  };

  const scoreValueStyle: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: isNewBest ? '#4CAF50' : '#2d5016',
    marginBottom: '16px',
  };

  const bestScoreStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#5d4037',
    fontWeight: '500',
  };

  const newBestBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '12px',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
    animation: 'bounce 0.6s ease',
  };

  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
    width: '100%',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <div style={titleStyle}>Game Over!</div>
          <div style={subtitleStyle}>🍋 Well played!</div>

          <div style={scoreContainerStyle}>
            <div style={scoreLabelStyle}>Final Score</div>
            <div style={scoreValueStyle}>{finalScore}</div>
            <div style={bestScoreStyle}>Best Score: {bestScore}</div>
            {isNewBest && finalScore > 0 && (
              <div style={newBestBadgeStyle}>🎉 NEW BEST SCORE!</div>
            )}
          </div>

          <button
            style={buttonStyle}
            onClick={onRestart}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default GameOver;
