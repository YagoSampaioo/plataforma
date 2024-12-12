import { 
  CommissionLevel, 
  PerformanceMetrics,
  SalesPerformance 
} from '../types/commission';
import { COMMISSION_LEVELS, SALES_TARGETS } from '../config/commissionConfig';
import { Sale } from '../types/sale';
import { getLevelTransitions } from './levelCalculator';
import { calculatePixBonus, calculateFeePlanBonus } from './bonusCalculator';
import { calculateProgressToNextLevel } from './progressCalculator';

export function calculateCommission(
  sales: Sale[], 
  userId: string,
  role: 'closer' | 'sdr'
): PerformanceMetrics {
  // Filter sales for the specific user
  const userSales = sales.filter(sale => 
    role === 'closer' ? sale.seller_id === userId : sale.sdr_id === userId
  );

  // Calculate base metrics
  const totalValue = userSales.reduce((sum, sale) => sum + sale.value, 0);
  const target = SALES_TARGETS[role];

  // Get level transitions and current level
  const salesWithLevels = getLevelTransitions(userSales, role);
  const currentLevel = salesWithLevels.length > 0 
    ? salesWithLevels[salesWithLevels.length - 1].level 
    : COMMISSION_LEVELS[0];

  // Calculate commissions and bonuses
  let totalCommission = 0;
  let pixBonus = 0;
  let feePlanBonus = 0;

  salesWithLevels.forEach(({ sale, level }) => {
    // Only apply commission if the sale was made at or after reaching Checkpoint 1
    if (level.threshold >= COMMISSION_LEVELS[1].threshold) {
      totalCommission += role === 'closer' ? level.closerCommission : level.sdrCommission;
      
      // Only closers get bonus payments
      if (role === 'closer') {
        pixBonus += calculatePixBonus(sale);
        feePlanBonus += calculateFeePlanBonus(sale);
      }
    }
  });

  return {
    totalSales: userSales.length,
    totalValue,
    currentLevel,
    progressToNextLevel: calculateProgressToNextLevel(currentLevel, totalValue, target),
    totalCommission,
    pixBonus,
    feePlanBonus,
    totalEarnings: totalCommission + pixBonus + feePlanBonus
  };
}

export function calculateTeamPerformance(
  sales: Sale[], 
  teamMembers: { id: string; name: string; role: 'closer' | 'sdr' }[]
): SalesPerformance[] {
  return teamMembers.map(member => ({
    userId: member.id,
    userName: member.name,
    role: member.role,
    metrics: calculateCommission(sales, member.id, member.role)
  }));
}