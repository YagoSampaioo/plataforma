import { Sale } from '../types/sale';
import { COMMISSION_BONUS } from '../config/commissionConfig';

export function calculatePixBonus(sale: Sale): number {
  if (!sale.payment_method) return 0;
  return sale.payment_method === 'pix' ? sale.value * COMMISSION_BONUS.pixPaymentBonus : 0;
}

export function calculateFeePlanBonus(sale: Sale): number {
  return sale.plan === 'fee' ? COMMISSION_BONUS.feePlanBonus : 0;
}