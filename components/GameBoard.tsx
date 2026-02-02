import React, { useRef, useState, useEffect } from 'react';
import Lemon from './Lemon';
import SelectionOverlay from './SelectionOverlay';

interface LemonCell {
  value: number;
  isSelected: boolean;
  isRemoved: boolean;
}

interface GameBoardProps {
  board: LemonCell[][];
  onSelectionChange: (selectedCells: { row: number; col: number }[]) => void;
  onSelectionComplete: () => void;
}

interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onSelectionChange, onSelectionComplete }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setIsDragging(true);
    setSelectionBox({ startX, startY, endX: startX, endY: startY });
    setSelectedCells([]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !boardRef.current || !selectionBox) return;

    const rect = boardRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    setSelectionBox({ ...selectionBox, endX, endY });

    // Calculate selected cells based on selection box
    const cellSize = 45; // 40px lemon + 5px gap
    const selected: { row: number; col: number }[] = [];

    const minX = Math.min(selectionBox.startX, endX);
    const maxX = Math.max(selectionBox.startX, endX);
    const minY = Math.min(selectionBox.startY, endY);
    const maxY = Math.max(selectionBox.startY, endY);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cellLeft = col * cellSize;
        const cellTop = row * cellSize;
        const cellRight = cellLeft + 40;
        const cellBottom = cellTop + 40;

        // Check if cell intersects with selection box
        if (
          cellRight >= minX &&
          cellLeft <= maxX &&
          cellBottom >= minY &&
          cellTop <= maxY &&
          !board[row][col].isRemoved
        ) {
          selected.push({ row, col });
        }
      }
    }

    setSelectedCells(selected);
    onSelectionChange(selected);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setSelectionBox(null);

      if (selectedCells.length > 0) {
        onSelectionComplete();
      }

      setSelectedCells([]);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, selectedCells]);

  const isSelected = (row: number, col: number) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const boardStyle: React.CSSProperties = {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 40px)',
    gridTemplateRows: 'repeat(8, 40px)',
    gap: '5px',
    padding: '10px',
    background: '#F5F5F5',
    borderRadius: '8px',
    boxShadow: 'none',
    border: '1px solid #E0E0E0',
    userSelect: 'none',
    cursor: isDragging ? 'crosshair' : 'default',
    margin: '0 auto',
    width: 'fit-content',
  };

  return (
    <div
      ref={boardRef}
      style={boardStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Lemon
            key={`${rowIndex}-${colIndex}`}
            value={cell.value}
            isSelected={isSelected(rowIndex, colIndex)}
            isRemoved={cell.isRemoved}
          />
        ))
      )}
      <SelectionOverlay selectionBox={selectionBox} isVisible={isDragging} />
    </div>
  );
};

export default GameBoard;
