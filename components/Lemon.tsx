import React from 'react';

interface LemonProps {
  value: number;
  isSelected: boolean;
  isRemoved: boolean;
}

const Lemon: React.FC<LemonProps> = ({ value, isSelected, isRemoved }) => {
  const containerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: isRemoved ? 'default' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: isRemoved ? 0 : 1,
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    userSelect: 'none',
    position: 'relative',
    filter: isSelected ? 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.8))' : 'none',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    border: isSelected ? '3px solid #4CAF50' : 'none',
    borderRadius: '50%',
    boxSizing: 'border-box',
  };

  const numberStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2d5016',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  };

  return (
    <div style={containerStyle}>
      {!isRemoved && (
        <>
          <img src="/assets/lemon.png" alt="lemon" style={imageStyle} />
          <span style={numberStyle}>{value}</span>
        </>
      )}
    </div>
  );
};

export default Lemon;
