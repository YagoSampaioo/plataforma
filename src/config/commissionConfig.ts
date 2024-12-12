import { CommissionLevel, SalesTarget, CommissionBonus } from '../types/commission';

export const COMMISSION_LEVELS: CommissionLevel[] = [
  {
    name: 'Base',
    threshold: 0,
    closerCommission: 0,
    sdrCommission: 0
  },
  {
    name: 'Checkpoint 1',
    threshold: 0.20,
    closerCommission: 130,
    sdrCommission: 100
  },
  {
    name: 'Checkpoint 2',
    threshold: 0.65,
    closerCommission: 230,
    sdrCommission: 180
  },
  {
    name: 'Checkpoint Alpha',
    threshold: 1.0,
    closerCommission: 330,
    sdrCommission: 250
  }
];

export const SALES_TARGETS: SalesTarget = {
  closer: 50000,
  sdr: 62000
};

export const COMMISSION_BONUS: CommissionBonus = {
  pixPaymentBonus: 0.08,
  feePlanBonus: 200
};