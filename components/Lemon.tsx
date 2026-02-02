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
    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
    userSelect: 'none',
    position: 'relative',
    filter: 'none',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    border: isSelected ? '2px solid #FFE135' : 'none',
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
    color: '#333333',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  };

  return (
    <div style={containerStyle}>
      {!isRemoved && (
        <>
          <img
            src="/assets/lemon.png"
            alt="lemon"
            style={imageStyle}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
          <span style={numberStyle}>{value}</span>
        </>
      )}
    </div>
  );
};

export default Lemon;
