import { Lemon } from '../types/game';

/**
 * Generate a random value between 1-9
 */
export function generateRandomValue(): number {
  return Math.floor(Math.random() * 9) + 1;
}

/**
 * Create an 8x8 board with random lemon values
 */
export function createBoard(): Lemon[][] {
  const board: Lemon[][] = [];

  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      board[row][col] = {
        id: `${row}-${col}`,
        value: generateRandomValue(),
        row,
        col,
        isRemoved: false,
        isSelected: false,
      };
    }
  }

  return board;
}

/**
 * Get all active (non-removed) lemons from the board
 */
export function getActiveLemons(board: Lemon[][]): Lemon[] {
  const activeLemons: Lemon[] = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const lemon = board[row][col];
      if (!lemon.isRemoved) {
        activeLemons.push(lemon);
      }
    }
  }

  return activeLemons;
}

/**
 * Calculate the sum of lemon values
 */
export function calculateSum(lemons: Lemon[]): number {
  return lemons.reduce((sum, lemon) => sum + lemon.value, 0);
}

/**
 * Check if there are any possible combinations that sum to 10
 */
export function canMakeSum10(board: Lemon[][]): boolean {
  const activeLemons = getActiveLemons(board);

  // Try all possible combinations of 2 or more lemons
  for (let i = 0; i < activeLemons.length; i++) {
    // Check single lemon (value 10 is not possible with 1-9, but keep for consistency)
    if (activeLemons[i].value === 10) {
      return true;
    }

    // Check pairs
    for (let j = i + 1; j < activeLemons.length; j++) {
      if (activeLemons[i].value + activeLemons[j].value === 10) {
        return true;
      }

      // Check triplets
      for (let k = j + 1; k < activeLemons.length; k++) {
        if (activeLemons[i].value + activeLemons[j].value + activeLemons[k].value === 10) {
          return true;
        }

        // Check quadruplets
        for (let l = k + 1; l < activeLemons.length; l++) {
          if (activeLemons[i].value + activeLemons[j].value + activeLemons[k].value + activeLemons[l].value === 10) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
