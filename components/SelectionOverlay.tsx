import React from 'react';

interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface SelectionOverlayProps {
  selectionBox: SelectionBox | null;
  isVisible: boolean;
}

const SelectionOverlay: React.FC<SelectionOverlayProps> = ({ selectionBox, isVisible }) => {
  if (!isVisible || !selectionBox) return null;

  const { startX, startY, endX, endY } = selectionBox;

  const left = Math.min(startX, endX);
  const top = Math.min(startY, endY);
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    background: 'rgba(76, 175, 80, 0.2)',
    border: '2px dashed #4CAF50',
    borderRadius: '4px',
    pointerEvents: 'none',
    zIndex: 10,
    transition: 'all 0.05s ease',
  };

  return <div style={overlayStyle}></div>;
};

export default SelectionOverlay;
