import { describe, expect, it } from 'vitest'
import { agencyNet, feeFor, paymentSettlement, refundNet, releaseSeats, seatsAfterConfirmation, supplierBatchTotal } from './money'

describe('demo money rules', () => {
  it('credits an approved payment after the 1% fee and records the fee amount', () => {
    expect(paymentSettlement(100_000)).toEqual({ fee: 1_000, credited: 99_000 })
  })
  it('computes the agency margin after fee and supplier costs', () => {
    expect(agencyNet(100_000, 68_000)).toBe(31_000)
    expect(feeFor(3700000)).toBe(37000)
  })
  it('converts a mixed supplier batch using the demo rate', () => {
    expect(supplierBatchTotal([{ amount: 10_000, currency: 'ARS' }, { amount: 10, currency: 'USD' }], 'ARS')).toBe(21_800)
  })
  it('retains the demo fee when simulating a refund', () => {
    expect(refundNet(100_000)).toBe(99_000)
  })
  it('decrements seats on confirmation and releases them up to package capacity', () => {
    expect(seatsAfterConfirmation(8, 3)).toBe(5)
    expect(releaseSeats(5, 3, 8)).toBe(8)
    expect(() => seatsAfterConfirmation(2, 3)).toThrow(/lugares disponibles/)
  })
})
