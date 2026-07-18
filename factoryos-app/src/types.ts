export type ApprovalStatus = 'pending' | 'approved'
export type OrderStatus = 'New Order' | 'Repeat Order' | 'Repeat Order with Changes' | 'Trial Order'
export type WorkStatus = 'Planned' | 'In production' | 'Quality hold' | 'Ready for despatch' | 'Complete'
export type ProductionStage = 'Extrusion' | 'Printing'

export interface Approval {
  role: 'Customer' | 'Sales' | 'Accounts' | 'Quality' | 'Production'
  status: ApprovalStatus
  approvedBy?: string
  approvedAt?: string
}

export interface Customer {
  id: string
  name: string
  contact: string
  phone: string
  email: string
}

export interface OrderConfirmation {
  id: string
  number: string
  customerId: string
  customerOrderNumber: string
  receivedDate: string
  deliveryDate: string
  orderStatus: OrderStatus
  productDescription: string
  quantityKg: number
  quantityUnits: number
  width: number
  length: number
  gauge: number
  tolerance: string
  paymentTerms: string
  specialInstructions: string
  route: string[]
  approvals: Approval[]
  createdAt: string
}

export interface WorksOrder {
  id: string
  number: string
  orderConfirmationId: string
  customerId: string
  productDescription: string
  quantityKg: number
  quantityUnits: number
  machineId: string
  expectedRatePerHour: number
  formulation: string
  route: string[]
  status: WorkStatus
  createdAt: string
}

export interface ProductionRun {
  id: string
  worksOrderId: string
  stage: ProductionStage
  date: string
  shift: 'Day' | 'Night'
  machineId: string
  operator: string
  producedKg: number
  producedUnits: number
  scrapKg: number
  downtimeMinutes: number
  downtimeCode: string
  rollCount: number
  notes: string
  qualityResult: 'Pending' | 'Pass' | 'Fail'
  createdAt: string
}

export interface FinishedGoodsTransfer {
  id: string
  worksOrderId: string
  date: string
  quantityKg: number
  quantityUnits: number
  transferredBy: string
  receivedBy: string
}

export interface Despatch {
  id: string
  worksOrderId: string
  date: string
  quantityKg: number
  quantityUnits: number
  deliveryNote: string
  authorisedBy: string
}

export interface Machine {
  id: string
  number: string
  type: string
  status: 'Available' | 'Running' | 'Maintenance'
}

export interface FactoryData {
  customers: Customer[]
  orderConfirmations: OrderConfirmation[]
  worksOrders: WorksOrder[]
  productionRuns: ProductionRun[]
  finishedGoodsTransfers: FinishedGoodsTransfer[]
  despatches: Despatch[]
  machines: Machine[]
}
