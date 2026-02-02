export interface Lemon {
  id: string;
  value: number; // 1-9
  row: number;
  col: number;
  isRemoved: boolean;
  isSelected: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface SelectionBox {
  start: Position;
  end: Position;
}

export type GameMode = 'infinite' | 'timer';

export interface GameState {
  board: Lemon[][];
  score: number;
  highScore: number;
  gameMode: GameMode;
  timeRemaining: number;
  isGameOver: boolean;
  isPlaying: boolean;
  selectedLemons: Lemon[];
}
