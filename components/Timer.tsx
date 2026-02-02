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
    background: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: 'none',
    marginBottom: '16px',
    border: isLowTime ? '2px solid #FF6B6B' : '1px solid #E0E0E0',
    transition: 'all 0.3s ease',
    animation: isLowTime ? 'pulse 1s infinite' : 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: '600',
    color: isLowTime ? '#FF6B6B' : '#999999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: isLowTime ? '#FF6B6B' : '#333333',
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
