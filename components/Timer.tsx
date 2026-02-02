import React from 'react';

interface TimerProps {
  timeRemaining: number; // in seconds
}

const Timer: React.FC<TimerProps> = ({ timeRemaining }) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining <= 10;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 20px',
    background: isLowTime
      ? 'linear-gradient(135deg, #ffccbc 0%, #ff8a65 100%)'
      : 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
    borderRadius: '8px',
    boxShadow: isLowTime
      ? '0 2px 8px rgba(244, 67, 54, 0.3), 0 0 20px rgba(244, 67, 54, 0.2)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
    border: isLowTime ? '2px solid #f44336' : '2px solid #81d4fa',
    transition: 'all 0.3s ease',
    animation: isLowTime ? 'pulse 1s infinite' : 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: '600',
    color: isLowTime ? '#b71c1c' : '#01579b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: isLowTime ? '#d32f2f' : '#0277bd',
    fontFamily: 'monospace',
    letterSpacing: '2px',
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>
      <div style={containerStyle}>
        <span style={labelStyle}>{isLowTime ? 'HURRY!' : 'Time'}</span>
        <span style={timeStyle}>{formatTime(timeRemaining)}</span>
      </div>
    </>
  );
};

export default Timer;
