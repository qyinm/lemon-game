import { useState, useCallback, useEffect } from 'react';
import { GameState, GameMode, Lemon } from '../types/game';
import { createBoard, canMakeSum10 } from '../utils/boardUtils';
import { tryRemoveLemons, checkGameOver } from '../utils/gameLogic';
import { loadHighScore, saveHighScore } from '../utils/storageUtils';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: createBoard(),
    score: 0,
    highScore: 0,
    gameMode: 'infinite',
    timeRemaining: 120,
    isGameOver: false,
    isPlaying: false,
    selectedLemons: [],
  });

  // 초기 로드 시 최고 점수 불러오기
  useEffect(() => {
    loadHighScore().then(highScore => {
      setGameState(prev => ({ ...prev, highScore }));
    });
  }, []);

  // 게임 시작
  const startGame = useCallback((mode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      board: createBoard(),
      score: 0,
      gameMode: mode,
      timeRemaining: 120,
      isGameOver: false,
      isPlaying: true,
      selectedLemons: [],
    }));
  }, []);

  // 레몬 선택 업데이트
  const updateSelection = useCallback((lemons: Lemon[]) => {
    setGameState(prev => ({
      ...prev,
      selectedLemons: lemons,
      board: prev.board.map(row =>
        row.map(lemon => ({
          ...lemon,
          isSelected: lemons.some(s => s.id === lemon.id),
        }))
      ),
    }));
  }, []);

  // 선택 확정 (합 10 체크 및 제거)
  const confirmSelection = useCallback(() => {
    setGameState(prev => {
      const { success, newBoard, score } = tryRemoveLemons(prev.board, prev.selectedLemons);

      if (!success) {
        // 선택 해제만
        return {
          ...prev,
          selectedLemons: [],
          board: prev.board.map(row =>
            row.map(lemon => ({ ...lemon, isSelected: false }))
          ),
        };
      }

      const newScore = prev.score + score;
      const isGameOver = checkGameOver(newBoard, prev.gameMode, prev.timeRemaining);

      // 최고 점수 업데이트
      if (newScore > prev.highScore) {
        saveHighScore(newScore);
      }

      return {
        ...prev,
        board: newBoard,
        score: newScore,
        highScore: Math.max(prev.highScore, newScore),
        selectedLemons: [],
        isGameOver,
        isPlaying: !isGameOver,
      };
    });
  }, []);

  // 타이머 틱
  const tick = useCallback(() => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.gameMode !== 'timer') return prev;

      const newTime = prev.timeRemaining - 1;
      const isGameOver = newTime <= 0;

      return {
        ...prev,
        timeRemaining: newTime,
        isGameOver,
        isPlaying: !isGameOver,
      };
    });
  }, []);

  // 게임 재시작
  const restartGame = useCallback(() => {
    startGame(gameState.gameMode);
  }, [startGame, gameState.gameMode]);

  return {
    gameState,
    startGame,
    updateSelection,
    confirmSelection,
    tick,
    restartGame,
  };
}
