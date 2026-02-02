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
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease',
  };

  const modalStyle: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '32px 40px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '320px',
    width: '90%',
    border: '1px solid #E0E0E0',
    animation: 'slideIn 0.4s ease',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '8px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#666666',
    marginBottom: '24px',
  };

  const scoreContainerStyle: React.CSSProperties = {
    background: '#F5F5F5',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
    border: '1px solid #E0E0E0',
  };

  const scoreLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  };

  const scoreValueStyle: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: isNewBest ? '#FFE135' : '#333333',
    marginBottom: '16px',
  };

  const bestScoreStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666666',
    fontWeight: '500',
  };

  const newBestBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#FFE135',
    color: '#333333',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '12px',
    boxShadow: 'none',
    animation: 'bounce 0.6s ease',
  };

  const buttonStyle: React.CSSProperties = {
    background: '#FFE135',
    color: '#333333',
    border: 'none',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: 'none',
    transition: 'all 0.2s ease',
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
              e.currentTarget.style.background = '#FFF44F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFE135';
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
