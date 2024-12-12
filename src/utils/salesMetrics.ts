import { Sale } from '../types/sale';
import type { SalesStats } from '../types/stats';

export function calculateSalesMetrics(periodSales: Sale[], recentSales: Sale[]): SalesStats {
  // Count approved sales
  const approvedSales = periodSales.filter(sale => sale.status === 'approved');
  const totalSales = periodSales.length;

  // Calculate sales by plan
  const planCounts = periodSales.reduce((acc, sale) => {
    if (sale.plan !== 'fee') { // Exclude fee plan from regular plan stats
      acc[sale.plan] = (acc[sale.plan] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate sales by SDR
  const sdrSales = periodSales.reduce((acc, sale) => {
    if (!acc[sale.sdr_id]) {
      acc[sale.sdr_id] = {
        name: sale.sdr_name,
        count: 0,
        value: 0,
        percentage: 0
      };
    }
    acc[sale.sdr_id].count += 1;
    acc[sale.sdr_id].value += sale.value;
    return acc;
  }, {} as Record<string, { name: string; count: number; value: number; percentage: number }>);

  // Calculate percentages for SDRs
  Object.values(sdrSales).forEach(sdr => {
    sdr.percentage = totalSales > 0 ? (sdr.count / totalSales) * 100 : 0;
  });

  const calculatePercentage = (count: number) => 
    totalSales > 0 ? (count / totalSales) * 100 : 0;

  return {
    totalValue: periodSales.reduce((sum, sale) => sum + sale.value, 0),
    totalSales,
    approvedCount: approvedSales.length,
    approvalRate: totalSales > 0 
      ? (approvedSales.length / totalSales) * 100 
      : 0,
    newClientsCount: new Set(periodSales.map(sale => sale.client_name)).size,
    salesByPlan: {
      silver: {
        count: planCounts.silver || 0,
        percentage: calculatePercentage(planCounts.silver || 0)
      },
      gold: {
        count: planCounts.gold || 0,
        percentage: calculatePercentage(planCounts.gold || 0)
      },
      platinum: {
        count: planCounts.platinum || 0,
        percentage: calculatePercentage(planCounts.platinum || 0)
      }
    },
    salesBySDR: sdrSales,
    recentSales
  };
}