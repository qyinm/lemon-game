export interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  highestCombo: number;
  totalLemonsRemoved: number;
}

/**
 * Save high score to Chrome storage
 */
export async function saveHighScore(score: number): Promise<void> {
  try {
    await chrome.storage.local.set({ highScore: score });
  } catch (error) {
    console.error('Error saving high score:', error);
  }
}

/**
 * Load high score from Chrome storage
 */
export async function loadHighScore(): Promise<number> {
  try {
    const result = await chrome.storage.local.get('highScore');
    return result.highScore || 0;
  } catch (error) {
    console.error('Error loading high score:', error);
    return 0;
  }
}

/**
 * Save game statistics to Chrome storage
 */
export async function saveStats(stats: GameStats): Promise<void> {
  try {
    await chrome.storage.local.set({ gameStats: stats });
  } catch (error) {
    console.error('Error saving stats:', error);
  }
}

/**
 * Load game statistics from Chrome storage
 */
export async function loadStats(): Promise<GameStats> {
  try {
    const result = await chrome.storage.local.get('gameStats');
    return result.gameStats || {
      gamesPlayed: 0,
      totalScore: 0,
      highestCombo: 0,
      totalLemonsRemoved: 0,
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    return {
      gamesPlayed: 0,
      totalScore: 0,
      highestCombo: 0,
      totalLemonsRemoved: 0,
    };
  }
}

/**
 * Update game statistics after a game ends
 */
export async function updateStats(
  score: number,
  combo: number,
  lemonsRemoved: number
): Promise<void> {
  const currentStats = await loadStats();

  const updatedStats: GameStats = {
    gamesPlayed: currentStats.gamesPlayed + 1,
    totalScore: currentStats.totalScore + score,
    highestCombo: Math.max(currentStats.highestCombo, combo),
    totalLemonsRemoved: currentStats.totalLemonsRemoved + lemonsRemoved,
  };

  await saveStats(updatedStats);
}
