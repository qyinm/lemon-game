import { useCallback } from 'react';
import './App.css';
import ModeSelector from '../../components/ModeSelector';
import GameBoard from '../../components/GameBoard';
import ScoreDisplay from '../../components/ScoreDisplay';
import Timer from '../../components/Timer';
import GameOver from '../../components/GameOver';
import { useGameState } from '../../hooks/useGameState';
import { useTimer } from '../../hooks/useTimer';
import { GameMode } from '../../types/game';
import { calculateSum } from '../../utils/boardUtils';

function App() {
  const {
    gameState,
    startGame,
    updateSelection,
    confirmSelection,
    tick,
    restartGame,
  } = useGameState();

  // 타이머 - 타이머 모드에서만 동작
  useTimer({
    isRunning: gameState.isPlaying && gameState.gameMode === 'timer',
    onTick: tick,
    interval: 1000
  });

  // 현재 선택된 레몬들의 합계
  const currentSum = calculateSum(gameState.selectedLemons);

  // 모드 선택 핸들러
  const handleModeSelect = useCallback((mode: 'infinite' | 'timer') => {
    startGame(mode);
  }, [startGame]);

  // 선택 변경 핸들러 - GameBoard에서 호출
  const handleSelectionChange = useCallback((selectedCells: { row: number; col: number }[]) => {
    const selectedLemons = selectedCells
      .map(({ row, col }) => gameState.board[row]?.[col])
      .filter(lemon => lemon && !lemon.isRemoved);
    updateSelection(selectedLemons);
  }, [gameState.board, updateSelection]);

  // 선택 완료 핸들러 - 마우스 업 시 호출
  const handleSelectionComplete = useCallback(() => {
    confirmSelection();
  }, [confirmSelection]);

  // 재시작 핸들러
  const handleRestart = useCallback(() => {
    restartGame();
  }, [restartGame]);

  return (
    <div className="game-container">
      {!gameState.isPlaying && !gameState.isGameOver ? (
        <ModeSelector onModeSelect={handleModeSelect} />
      ) : (
        <>
          <div className="game-header">
            <ScoreDisplay
              currentScore={gameState.score}
              bestScore={gameState.highScore}
              currentSum={currentSum}
            />
            {gameState.gameMode === 'timer' && (
              <Timer timeRemaining={gameState.timeRemaining} />
            )}
          </div>
          <div className="game-content">
            <GameBoard
              board={gameState.board}
              onSelectionChange={handleSelectionChange}
              onSelectionComplete={handleSelectionComplete}
            />
          </div>
        </>
      )}
      {gameState.isGameOver && (
        <GameOver
          finalScore={gameState.score}
          bestScore={gameState.highScore}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
