import { Sale } from '../types/sale';
import { CommissionLevel } from '../types/commission';
import { COMMISSION_LEVELS, SALES_TARGETS } from '../config/commissionConfig';

export function calculateLevelAtSale(
  previousSales: Sale[],
  role: 'closer' | 'sdr'
): CommissionLevel {
  const target = role === 'closer' ? SALES_TARGETS.closer : SALES_TARGETS.sdr;
  const totalValue = previousSales.reduce((sum, sale) => sum + sale.value, 0);
  const progress = totalValue / target;

  // Return the highest level achieved
  for (let i = COMMISSION_LEVELS.length - 1; i >= 0; i--) {
    if (progress >= COMMISSION_LEVELS[i].threshold) {
      return COMMISSION_LEVELS[i];
    }
  }

  return COMMISSION_LEVELS[0];
}

export function getLevelTransitions(
  sales: Sale[],
  role: 'closer' | 'sdr'
): { sale: Sale; level: CommissionLevel }[] {
  const sortedSales = [...sales].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  let runningTotal = 0;
  return sortedSales.map(sale => {
    const previousTotal = runningTotal;
    runningTotal += sale.value;
    return {
      sale,
      level: calculateLevelAtSale(sortedSales.filter(s => s.value <= previousTotal), role)
    };
  });
}