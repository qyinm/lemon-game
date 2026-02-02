import React from 'react';

interface ScoreDisplayProps {
  currentScore: number;
  bestScore: number;
  timeRemaining?: number;
  gameMode?: 'infinite' | 'timer';
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  currentScore,
  bestScore,
  timeRemaining,
  gameMode
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining !== undefined && timeRemaining <= 10;

  const containerStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    background: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
  };

  const scoreItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: '600',
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
  };

  const timerLabelStyle: React.CSSProperties = {
    ...labelStyle,
    color: isLowTime ? '#FF6B6B' : '#999999',
  };

  const timerValueStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: isLowTime ? '#FF6B6B' : '#333333',
    fontFamily: 'monospace',
    letterSpacing: '1px',
  };

  const dividerStyle: React.CSSProperties = {
    width: '1px',
    height: '40px',
    background: '#E0E0E0',
  };

  return (
    <div style={containerStyle}>
      <div style={scoreItemStyle}>
        <span style={labelStyle}>Current</span>
        <span style={valueStyle}>{currentScore}</span>
      </div>

      <div style={dividerStyle}></div>

      <div style={scoreItemStyle}>
        {gameMode === 'timer' && timeRemaining !== undefined ? (
          <>
            <span style={timerLabelStyle}>Time</span>
            <span style={timerValueStyle}>{formatTime(timeRemaining)}</span>
          </>
        ) : (
          <div style={{ width: '60px' }}></div>
        )}
      </div>

      <div style={dividerStyle}></div>

      <div style={scoreItemStyle}>
        <span style={labelStyle}>Best</span>
        <span style={valueStyle}>{bestScore}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
