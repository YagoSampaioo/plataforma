import { CommissionLevel } from '../types/commission';
import { COMMISSION_LEVELS } from '../config/commissionConfig';

export function calculateProgressToNextLevel(
  currentLevel: CommissionLevel,
  totalValue: number,
  target: number
): number {
  const currentLevelIndex = COMMISSION_LEVELS.findIndex(
    level => level.threshold === currentLevel.threshold
  );
  
  // If at max level, return 100%
  if (currentLevelIndex === COMMISSION_LEVELS.length - 1) {
    return 100;
  }

  const nextLevel = COMMISSION_LEVELS[currentLevelIndex + 1];
  const currentThreshold = currentLevel.threshold * target;
  const nextThreshold = nextLevel.threshold * target;
  const progressValue = totalValue - currentThreshold;
  const rangeSize = nextThreshold - currentThreshold;
  
  return Math.min(100, Math.max(0, (progressValue / rangeSize) * 100));
}