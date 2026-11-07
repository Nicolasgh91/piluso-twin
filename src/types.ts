export type Currency = 'ARS' | 'USD'
export type Page = 'overview' | 'packages' | 'bookings' | 'conversations' | 'payments' | 'settings'
export type Role = 'owner' | 'agent' | 'traveler'
export type PackageItem = {
  id: string; name: string; origin: string; destination: string; dates: string; type: string
  description: string; itinerary: string[]; services: string[]; flights: string; transfer: string
  excursions: string[]; paxTotal: number; seatsLeft: number; currency: Currency
  priceDouble: number; priceSingle: number; costs: number; published: boolean; archived?: boolean
  theme: 'patagonia' | 'iguazu' | 'desert' | 'rio'
}
export type Customer = { id: string; name: string; email: string; phone: string; initials: string; note: string }
export type Supplier = { id: string; name: string; service: string; currency: Currency; destination: string; contact: string; cbu?: string; alias?: string }
export type Booking = {
  id: string; ref: string; customerId: string; packageId: string; pax: number; tariff: 'double' | 'single'
  amount: number; currency: Currency; payment: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Reembolsado'
  status: 'Solicitada' | 'Confirmada' | 'Cancelación solicitada' | 'Cancelada'; agent: string; createdAt: string
  supplierIds: string[]; history: string[]; internalNotes: string[]
}
export type Message = { id: string; from: 'customer' | 'agent' | 'pili'; text: string; time: string }
export type Conversation = { id: string; customerId: string; channel: 'WhatsApp' | 'Web'; packageId?: string; assigned: string; mode: 'Pili' | 'Agente'; status: 'Abierta' | 'Resuelta'; messages: Message[]; updated: string }
export type SupplierPayment = { id: string; bookingId: string; supplierId: string; concept: string; amount: number; currency: Currency; destination: string; status: 'Pendiente' | 'Pagada' | 'Cancelada' }
export type Transaction = { id: string; date: string; kind: string; detail: string; amount: number; currency: Currency; status: string; bookingId?: string }
export type Notice = { id: string; title: string; detail: string; time: string; read: boolean }
export type McpCall = { id: string; tool: string; request: unknown; response: unknown; status: 'ok' | 'error'; at: string }
export type AppState = {
  role: Role; agencyName: string; agencyCountry: string; agencyEmail: string; packages: PackageItem[]; customers: Customer[]; suppliers: Supplier[]
  bookings: Booking[]; conversations: Conversation[]; supplierPayments: SupplierPayment[]
  transactions: Transaction[]; notices: Notice[]; calls: McpCall[]; balances: Record<Currency, number>
  cart?: { bookingId: string; pax: number; tariff: 'double' | 'single'; customerId: string }
}
