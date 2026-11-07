import type { AppState, Currency } from '../../types'
import { DEMO_FX_ARS_PER_USD } from '../../data'
import { convertCurrency } from '../money'

export interface BeloMcpClient { callTool(name: string, args: Record<string, unknown>): Promise<unknown> }
export type BeloAction = (name: string, args: Record<string, unknown>) => unknown

export class MockBeloMcpServer implements BeloMcpClient {
  constructor(private readState: () => AppState, private act: BeloAction) {}
  async callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
    const state = this.readState()
    switch (name) {
      case 'get_balance': return { balances: state.balances, simulated: true }
      case 'create_payment_link': return { url: `https://demo.piluso.local/pagar/${args.bookingId ?? 'nuevo'}`, expiresIn: '24 horas', simulated: true }
      case 'create_qr_payment': return { qr: `PILUSO-DEMO-${args.bookingId ?? 'NUEVO'}`, simulated: true }
      case 'get_transfer_instructions': return { alias: 'estudio.nomade', cbu: '0000003100000000000001', simulated: true }
      case 'get_payment_status': return { bookingId: args.bookingId, status: state.bookings.find(b => b.id === args.bookingId)?.payment ?? 'Pendiente' }
      case 'convert': return { amount: convertCurrency(Number(args.amount ?? 0), args.from as Currency, args.to as Currency), rate: DEMO_FX_ARS_PER_USD, simulated: true }
      case 'send_bank_transfer': case 'send_belo_transfer': case 'refund_payment': return this.act(name, args)
      default: throw new Error(`Herramienta Belo desconocida: ${name}`)
    }
  }
}
