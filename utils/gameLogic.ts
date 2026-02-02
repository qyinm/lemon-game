import { Lemon, SelectionBox, GameMode } from '../types/game';
import { calculateSum, canMakeSum10 } from './boardUtils';

/**
 * Calculate score based on number of lemons removed
 */
export function calculateScore(removedCount: number): number {
  return removedCount * 10;
}

/**
 * Get lemons within the selection box
 */
export function getLemonsInSelection(
  board: Lemon[][],
  selection: SelectionBox,
  cellSize: number,
  boardOffset: { x: number; y: number }
): Lemon[] {
  const selectedLemons: Lemon[] = [];

  const minX = Math.min(selection.start.x, selection.end.x);
  const maxX = Math.max(selection.start.x, selection.end.x);
  const minY = Math.min(selection.start.y, selection.end.y);
  const maxY = Math.max(selection.start.y, selection.end.y);

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const lemon = board[row][col];

      if (lemon.isRemoved) continue;

      // Calculate lemon position on canvas
      const lemonX = boardOffset.x + col * cellSize + cellSize / 2;
      const lemonY = boardOffset.y + row * cellSize + cellSize / 2;

      // Check if lemon center is within selection box
      if (lemonX >= minX && lemonX <= maxX && lemonY >= minY && lemonY <= maxY) {
        selectedLemons.push(lemon);
      }
    }
  }

  return selectedLemons;
}

/**
 * Try to remove selected lemons if their sum equals 10
 * Returns { success: boolean, newBoard: Lemon[][], removedCount: number }
 */
export function tryRemoveLemons(
  board: Lemon[][],
  selectedLemons: Lemon[]
): { success: boolean; newBoard: Lemon[][]; removedCount: number } {
  if (selectedLemons.length === 0) {
    return { success: false, newBoard: board, removedCount: 0 };
  }

  const sum = calculateSum(selectedLemons);

  if (sum !== 10) {
    return { success: false, newBoard: board, removedCount: 0 };
  }

  // Create a new board with lemons marked as removed
  const newBoard = board.map(row =>
    row.map(lemon => {
      const isSelected = selectedLemons.some(
        selected => selected.row === lemon.row && selected.col === lemon.col
      );
      return isSelected ? { ...lemon, isRemoved: true, isSelected: false } : lemon;
    })
  );

  return { success: true, newBoard, removedCount: selectedLemons.length };
}

/**
 * Check if the game is over
 */
export function checkGameOver(
  board: Lemon[][],
  gameMode: GameMode,
  timeRemaining: number
): boolean {
  // Timer mode: game over when time runs out
  if (gameMode === 'timer' && timeRemaining <= 0) {
    return true;
  }

  // Both modes: game over when no more valid moves
  return !canMakeSum10(board);
}
