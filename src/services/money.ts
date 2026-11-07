import { DEMO_FEE_RATE, DEMO_FX_ARS_PER_USD } from '../data'
import type { Currency } from '../types'

export const feeFor = (amount: number) => Math.round(amount * DEMO_FEE_RATE * 100) / 100
export const paymentSettlement = (amount: number) => ({ fee: feeFor(amount), credited: amount - feeFor(amount) })
export const convertCurrency = (amount: number, from: Currency, to: Currency) => {
  if (from === to) return amount
  return from === 'USD' ? amount * DEMO_FX_ARS_PER_USD : amount / DEMO_FX_ARS_PER_USD
}
export const agencyNet = (amount: number, supplierCosts: number) => amount - feeFor(amount) - supplierCosts
export const seatsAfterConfirmation = (remaining: number, pax: number) => {
  if (!Number.isInteger(pax) || pax < 1 || pax > remaining) throw new Error('La cantidad de pasajeros supera los lugares disponibles.')
  return remaining - pax
}
export const releaseSeats = (remaining: number, pax: number, capacity: number) => Math.min(capacity, remaining + pax)
export const supplierBatchTotal = (rows: { amount: number; currency: Currency }[], target: Currency) => rows.reduce((sum, row) => sum + convertCurrency(row.amount, row.currency, target), 0)
export const refundNet = (amount: number) => amount - feeFor(amount)
