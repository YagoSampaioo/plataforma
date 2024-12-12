export interface CommissionLevel {
  name: string;
  threshold: number;
  closerCommission: number;
  sdrCommission: number;
}

export interface SalesTarget {
  closer: number;
  sdr: number;
}

export interface CommissionBonus {
  pixPaymentBonus: number;
  feePlanBonus: number;
}

export interface PerformanceMetrics {
  totalSales: number;
  totalValue: number;
  currentLevel: CommissionLevel;
  progressToNextLevel: number;
  totalCommission: number;
  pixBonus: number;
  feePlanBonus: number;
  totalEarnings: number;
}

export interface SalesPerformance {
  userId: string;
  userName: string;
  role: 'closer' | 'sdr';
  metrics: PerformanceMetrics;
}