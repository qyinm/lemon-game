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
    color: '#333333',
    marginBottom: '8px',
    textShadow: 'none',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666666',
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
    fontWeight: '600',
    borderRadius: '8px',
    border: '2px solid #FFE135',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: 'none',
    position: 'relative',
    overflow: 'hidden',
    background: '#FFFFFF',
    color: '#333333',
  };

  const infiniteButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
  };

  const timerButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
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
            e.currentTarget.style.background = '#FFE135';
            e.currentTarget.style.borderColor = '#FFF44F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.borderColor = '#FFE135';
          }}
        >
          <div>Infinite Mode</div>
          <div style={modeDescStyle}>Play at your own pace</div>
        </button>

        <button
          style={timerButtonStyle}
          onClick={() => onModeSelect('timer')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FFE135';
            e.currentTarget.style.borderColor = '#FFF44F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.borderColor = '#FFE135';
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
