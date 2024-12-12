import { Sale } from './sale';

export interface SalesStats {
  totalValue: number;
  totalSales: number;
  newClientsCount: number;
  salesByPlan: {
    silver: { count: number; percentage: number };
    gold: { count: number; percentage: number };
    platinum: { count: number; percentage: number };
  };
  salesBySDR: {
    [key: string]: {
      name: string;
      count: number;
      value: number;
      percentage: number;
    };
  };
  recentSales: Sale[];
}