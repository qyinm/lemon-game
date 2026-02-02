import React from 'react';

type GameMode = 'infinite' | 'timer';

interface ModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeSelect }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    gap: '24px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: '8px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#5d4037',
    marginBottom: '16px',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '280px',
  };

  const buttonBaseStyle: React.CSSProperties = {
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    overflow: 'hidden',
  };

  const infiniteButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
    color: 'white',
  };

  const timerButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
    color: 'white',
  };

  const modeDescStyle: React.CSSProperties = {
    fontSize: '12px',
    opacity: 0.9,
    marginTop: '4px',
    fontWeight: 'normal',
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center' }}>
        <div style={titleStyle}>🍋 Lemon Game</div>
        <div style={subtitleStyle}>Select a game mode to start</div>
      </div>

      <div style={buttonContainerStyle}>
        <button
          style={infiniteButtonStyle}
          onClick={() => onModeSelect('infinite')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
        >
          <div>Infinite Mode</div>
          <div style={modeDescStyle}>Play at your own pace</div>
        </button>

        <button
          style={timerButtonStyle}
          onClick={() => onModeSelect('timer')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
        >
          <div>Timer Mode</div>
          <div style={modeDescStyle}>Race against the clock (2:00)</div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
