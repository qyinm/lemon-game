import React from 'react';

interface ScoreDisplayProps {
  currentScore: number;
  bestScore: number;
  currentSum: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ currentScore, bestScore, currentSum }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
    border: '2px solid #ffd54f',
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
    color: '#5d4037',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d5016',
  };

  const currentSumStyle: React.CSSProperties = {
    ...valueStyle,
    color: currentSum > 0 ? '#4CAF50' : '#2d5016',
    fontSize: currentSum > 0 ? '24px' : '20px',
    transition: 'all 0.2s ease',
  };

  const dividerStyle: React.CSSProperties = {
    width: '1px',
    height: '40px',
    background: 'linear-gradient(to bottom, transparent, #d4af37, transparent)',
  };

  return (
    <div style={containerStyle}>
      <div style={scoreItemStyle}>
        <span style={labelStyle}>Current</span>
        <span style={valueStyle}>{currentScore}</span>
      </div>

      <div style={dividerStyle}></div>

      <div style={scoreItemStyle}>
        <span style={labelStyle}>Selection</span>
        <span style={currentSumStyle}>{currentSum > 0 ? `+${currentSum}` : '0'}</span>
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
