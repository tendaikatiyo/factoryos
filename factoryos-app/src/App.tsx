import { type ReactNode, useMemo, useRef, useState } from 'react'
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  Boxes,
  Check,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Download,
  Factory,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  Menu,
  PackageCheck,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  Upload,
  Warehouse,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { emptyApprovals } from './data'
import type {
  Approval,
  Customer,
  Despatch,
  FinishedGoodsTransfer,
  Machine,
  OrderConfirmation,
  ProductionRun,
  WorksOrder,
} from './types'
import { useFactoryData } from './useFactoryData'

type Page =
  | 'dashboard'
  | 'orders'
  | 'works-orders'
  | 'production'
  | 'finished-goods'
  | 'despatch'
  | 'machines'
  | 'data'
type Modal = 'order' | 'work-order' | 'run' | 'transfer' | 'despatch' | null
type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

const pages: Array<{ id: Page; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Order confirmations', icon: FileCheck2 },
  { id: 'works-orders', label: 'Works orders', icon: ClipboardList },
  { id: 'production', label: 'Production', icon: Factory },
  { id: 'finished-goods', label: 'Finished goods', icon: Warehouse },
  { id: 'despatch', label: 'Despatch', icon: Truck },
  { id: 'machines', label: 'Machines', icon: Gauge },
]

const ROUTE_OPTIONS = ['Extrusion', 'Printing', 'Lamination', 'Slitting', 'Bagmaking', 'Recycling', 'Core M/C']
const DOWNTIME_CODES = ['Set Up', 'Heat Up', 'Screen Change', 'Die Change', 'No Operator', 'Sample Trial', 'Waiting for Material', 'Electrical Fault', 'Mechanical Fault', 'No Electricity', 'No Work']

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`))
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
const uid = (prefix: string) => `${prefix}-${crypto.randomUUID()}`
const today = () => new Date().toISOString().slice(0, 10)
const num = (value: number) => value.toLocaleString()

const statusTone = (status: WorksOrder['status']): Tone =>
  status === 'Quality hold' ? 'danger' : status === 'Complete' ? 'success' : 'info'
const badgeVariant = (tone: Tone) => tone as 'success' | 'warning' | 'info' | 'neutral' | 'danger'

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{children}</span>
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
      <Boxes size={26} strokeWidth={1.5} className="text-muted-foreground" />
      <h3 className="font-heading mt-3 text-[15px] font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">{copy}</p>
    </div>
  )
}

function PageIntro({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display mt-2 text-3xl font-normal leading-[1.04] tracking-[-0.035em] sm:text-[40px]">{title}</h2>
        <p className="mt-2 text-[13px] text-muted-foreground">{copy}</p>
      </div>
      {action}
    </div>
  )
}

export default function App() {
  const { data, setData, reset, exportData, importData } = useFactoryData()
  const [page, setPage] = useState<Page>('dashboard')
  const [modal, setModal] = useState<Modal>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const customerName = (id: string) => data.customers.find((c) => c.id === id)?.name ?? 'Unknown customer'
  const machineNumber = (id: string) => data.machines.find((m) => m.id === id)?.number ?? '—'
  const orderForWork = (work: WorksOrder) => data.orderConfirmations.find((o) => o.id === work.orderConfirmationId)
  const workProduced = (id: string) => sum(data.productionRuns.filter((r) => r.worksOrderId === id).map((r) => r.producedKg))
  const workPassed = (id: string) => sum(data.productionRuns.filter((r) => r.worksOrderId === id && r.qualityResult === 'Pass').map((r) => r.producedKg))
  const workTransferred = (id: string) => sum(data.finishedGoodsTransfers.filter((t) => t.worksOrderId === id).map((t) => t.quantityKg))
  const workDespatched = (id: string) => sum(data.despatches.filter((d) => d.worksOrderId === id).map((d) => d.quantityKg))
  const allApproved = (order: OrderConfirmation) => order.approvals.every((a) => a.status === 'approved')

  const filteredOrders = useMemo(
    () =>
      data.orderConfirmations.filter((order) =>
        `${order.number} ${customerName(order.customerId)} ${order.productDescription}`.toLowerCase().includes(search.toLowerCase()),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.orderConfirmations, data.customers, search],
  )

  const stats = {
    pendingApprovals: data.orderConfirmations.filter((o) => !allApproved(o)).length,
    openWorks: data.worksOrders.filter((w) => w.status !== 'Complete').length,
    produced: sum(data.productionRuns.map((r) => r.producedKg)),
    ready: sum(data.finishedGoodsTransfers.map((t) => t.quantityKg)) - sum(data.despatches.map((d) => d.quantityKg)),
  }

  const approve = (orderId: string, approval: Approval) => {
    const order = data.orderConfirmations.find((o) => o.id === orderId)
    if (!order) return
    const customerApproved = order.approvals.find((a) => a.role === 'Customer')?.status === 'approved'
    const salesApproved = order.approvals.find((a) => a.role === 'Sales')?.status === 'approved'
    if (approval.status === 'pending' && approval.role === 'Sales' && !customerApproved) {
      toast.warning('Customer approval is required before internal routing.')
      return
    }
    if (approval.status === 'pending' && !['Customer', 'Sales'].includes(approval.role) && !salesApproved) {
      toast.warning('Sales must approve before other departments.')
      return
    }
    setData((current) => ({
      ...current,
      orderConfirmations: current.orderConfirmations.map((item) =>
        item.id !== orderId
          ? item
          : {
              ...item,
              approvals: item.approvals.map((entry) =>
                entry.role === approval.role
                  ? {
                      ...entry,
                      status: entry.status === 'approved' ? 'pending' : 'approved',
                      approvedBy: entry.status === 'approved' ? undefined : `${entry.role} user`,
                      approvedAt: entry.status === 'approved' ? undefined : today(),
                    }
                  : entry,
              ),
            },
      ),
    }))
  }

  const createOrder = (payload: Omit<OrderConfirmation, 'id' | 'number' | 'tolerance' | 'approvals' | 'createdAt'>) => {
    const order: OrderConfirmation = {
      ...payload,
      id: uid('oc'),
      number: `OC-${new Date().getFullYear()}-${String(data.orderConfirmations.length + 151).padStart(4, '0')}`,
      tolerance: '±10%',
      approvals: emptyApprovals(),
      createdAt: new Date().toISOString(),
    }
    setData((c) => ({ ...c, orderConfirmations: [order, ...c.orderConfirmations] }))
    setModal(null)
    setPage('orders')
    toast.success(`${order.number} created`, { description: 'Capture approvals to release it to planning.' })
  }

  const createWorkOrder = (payload: { orderConfirmationId: string; machineId: string; expectedRatePerHour: number; formulation: string }) => {
    const order = data.orderConfirmations.find((o) => o.id === payload.orderConfirmationId)
    if (!order || !allApproved(order)) return
    const work: WorksOrder = {
      id: uid('wo'),
      number: `WO-${new Date().getFullYear()}-${String(data.worksOrders.length + 93).padStart(4, '0')}`,
      orderConfirmationId: order.id,
      customerId: order.customerId,
      productDescription: order.productDescription,
      quantityKg: order.quantityKg,
      quantityUnits: order.quantityUnits,
      machineId: payload.machineId,
      expectedRatePerHour: payload.expectedRatePerHour,
      formulation: payload.formulation,
      route: order.route,
      status: 'Planned',
      createdAt: new Date().toISOString(),
    }
    setData((c) => ({ ...c, worksOrders: [work, ...c.worksOrders] }))
    setModal(null)
    setPage('works-orders')
    toast.success(`${work.number} issued`, { description: `Linked to ${order.number}.` })
  }

  const createRun = (payload: Omit<ProductionRun, 'id' | 'createdAt'>) => {
    const run: ProductionRun = { ...payload, id: uid('run'), createdAt: new Date().toISOString() }
    setData((c) => ({
      ...c,
      productionRuns: [run, ...c.productionRuns],
      worksOrders: c.worksOrders.map((w) =>
        w.id === run.worksOrderId ? { ...w, status: run.qualityResult === 'Fail' ? 'Quality hold' : 'In production' } : w,
      ),
    }))
    setModal(null)
    setPage('production')
    toast.success('Production run recorded', {
      description: run.qualityResult === 'Fail' ? 'Works order placed on quality hold.' : `${num(run.producedKg)} kg captured.`,
    })
  }

  const createTransfer = (payload: Omit<FinishedGoodsTransfer, 'id'>) => {
    const transfer: FinishedGoodsTransfer = { ...payload, id: uid('fgt') }
    setData((c) => ({
      ...c,
      finishedGoodsTransfers: [transfer, ...c.finishedGoodsTransfers],
      worksOrders: c.worksOrders.map((w) => (w.id === transfer.worksOrderId ? { ...w, status: 'Ready for despatch' } : w)),
    }))
    setModal(null)
    setPage('finished-goods')
    toast.success('Transferred to Finished Goods', { description: `${num(transfer.quantityKg)} kg received into stores.` })
  }

  const createDespatch = (payload: Omit<Despatch, 'id'>) => {
    const available = workTransferred(payload.worksOrderId) - workDespatched(payload.worksOrderId)
    if (payload.quantityKg > available) {
      toast.error('Insufficient Finished Goods', { description: `Only ${num(available)} kg is available.` })
      return
    }
    const despatch: Despatch = { ...payload, id: uid('dsp') }
    setData((c) => ({
      ...c,
      despatches: [despatch, ...c.despatches],
      worksOrders: c.worksOrders.map((w) =>
        w.id === despatch.worksOrderId && workDespatched(despatch.worksOrderId) + despatch.quantityKg >= w.quantityKg
          ? { ...w, status: 'Complete' }
          : w,
      ),
    }))
    setModal(null)
    setPage('despatch')
    toast.success('Despatch recorded', { description: `${despatch.deliveryNote} · ${num(despatch.quantityKg)} kg.` })
  }

  const title = pages.find((p) => p.id === page)?.label ?? 'Data & backup'
  const currentDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  const availableOrders = data.orderConfirmations.filter((o) => allApproved(o) && !data.worksOrders.some((w) => w.orderConfirmationId === o.id))

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-foreground/40 backdrop-blur-[2px] md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-[244px] flex-col border-r bg-card px-3.5 py-5 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center gap-3 px-2 pb-6">
          <span className="grid size-9 place-items-center rounded-[10px] bg-primary text-primary-foreground"><Factory size={18} /></span>
          <div className="leading-tight">
            <strong className="font-display block text-lg font-semibold">FactoryOS</strong>
            <small className="text-[11px] text-muted-foreground">Rawplast Industries</small>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5">
          <span className="font-mono px-2.5 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Operations</span>
          {pages.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSidebarOpen(false) }}
              className={cn(
                'flex items-center gap-2.5 rounded-[9px] px-2.5 py-2.5 text-[13px] transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]',
                page === item.id ? 'bg-secondary font-semibold text-foreground' : 'text-muted-foreground hover:bg-canvas-soft hover:text-foreground',
              )}
            >
              <item.icon size={17} strokeWidth={1.8} />
              {item.label}
              {item.id === 'orders' && stats.pendingApprovals > 0 && (
                <span className="ml-auto grid size-[19px] place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{stats.pendingApprovals}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={() => { setPage('data'); setSidebarOpen(false) }}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2.5 text-[13px] transition-colors duration-150',
              page === 'data' ? 'bg-secondary font-semibold text-foreground' : 'text-muted-foreground hover:bg-canvas-soft hover:text-foreground',
            )}
          >
            <Settings size={17} /> Data & backup
          </button>
          <div className="mt-3.5 flex items-center gap-2.5 border-t px-2 pt-3.5">
            <span className="size-[7px] rounded-full bg-success shadow-[0_0_0_4px_var(--success-bg)]" />
            <div className="leading-tight">
              <strong className="block text-[11px] font-semibold">Stored locally</strong>
              <small className="text-[11px] text-muted-foreground">This browser only</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="w-full min-w-0 md:pl-[244px]">
        <header className="sticky top-0 z-10 flex h-[79px] items-center justify-between gap-3 border-b bg-background/90 px-5 backdrop-blur-md md:px-8">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></Button>
          <div className="mr-auto">
            <span className="font-mono hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:block">{currentDate}</span>
            <h1 className="font-display text-[22px] font-medium tracking-[-0.02em]">{title}</h1>
          </div>
          <label className="hidden h-[38px] w-[230px] items-center gap-2 rounded-full border bg-card px-3 text-muted-foreground focus-within:border-foreground sm:flex">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records" className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground" />
          </label>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">AM</span>
            <div className="hidden leading-tight sm:block">
              <strong className="block text-[11px]">A. Mutota</strong>
              <small className="text-[11px] text-muted-foreground">Operations Manager</small>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 pb-16 md:px-8">
          {page === 'dashboard' && (
            <div className="flex flex-col gap-5">
              <div className="relative grid items-end gap-10 overflow-hidden rounded-3xl border bg-canvas-soft p-8 md:grid-cols-[1.45fr_0.55fr] md:p-11">
                <div className="pointer-events-none absolute -top-[310px] right-[7%] size-[520px] rounded-full opacity-80 blur-[8px] [background:radial-gradient(circle,#a7e5d3_0%,rgba(167,229,211,0.46)_30%,rgba(167,229,211,0)_68%)]" />
                <div className="relative z-[1]">
                  <Eyebrow>Saturday operations brief</Eyebrow>
                  <h2 className="font-display mt-2.5 mb-4 text-[clamp(40px,5vw,60px)] font-normal leading-[0.98] tracking-[-0.045em]">From confirmed order<br />to finished product.</h2>
                  <p className="mb-5 max-w-lg text-sm text-muted-foreground">One operational record across Sales, Planning, Production, Quality and Despatch.</p>
                  <Button onClick={() => setModal('order')}><Plus size={16} /> New order confirmation</Button>
                </div>
                <div className="relative z-[1] rounded-2xl border border-white/90 bg-white/80 p-5 backdrop-blur-xl">
                  <Eyebrow>Current production</Eyebrow>
                  <strong className="font-heading tnum mt-3 mb-1 block text-3xl">{num(stats.produced)} kg</strong>
                  <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">recorded across {data.productionRuns.length} production runs</p>
                  <Progress value={(stats.produced / Math.max(1, sum(data.worksOrders.map((w) => w.quantityKg)))) * 100} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatCard icon={<ClipboardCheck size={18} />} label="Pending approvals" value={stats.pendingApprovals} hint="order confirmations" />
                <StatCard icon={<Activity size={18} />} label="Open works orders" value={stats.openWorks} hint="on the factory floor" />
                <StatCard icon={<Factory size={18} />} label="Production captured" value={num(stats.produced)} hint="kilograms total" />
                <StatCard icon={<PackageCheck size={18} />} label="Ready to despatch" value={num(stats.ready)} hint="kilograms in FG" />
              </div>

              <div className="grid gap-3.5 lg:grid-cols-[1.6fr_0.7fr]">
                <Card className="gap-0 overflow-hidden py-0">
                  <CardHeader className="flex flex-row items-center justify-between border-b py-4 [.border-b]:pb-4">
                    <div>
                      <Eyebrow>Live workflow</Eyebrow>
                      <CardTitle className="font-heading mt-1 text-base">Active works orders</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setPage('works-orders')}>View all <ArrowRight size={15} /></Button>
                  </CardHeader>
                  <CardContent className="px-0">
                    {data.worksOrders.length ? data.worksOrders.map((work) => {
                      const produced = workProduced(work.id)
                      return (
                        <div key={work.id} className="grid grid-cols-[1.1fr_auto] items-center gap-4 border-b px-5 py-3.5 last:border-b-0 md:grid-cols-[1.1fr_1.3fr_1.1fr_auto]">
                          <div className="flex items-center gap-2.5">
                            <span className="grid size-9 place-items-center rounded-[9px] bg-secondary"><ClipboardList size={17} /></span>
                            <div className="min-w-0">
                              <strong className="block text-[11px]">{work.number}</strong>
                              <small className="block truncate text-[10px] text-muted-foreground">{customerName(work.customerId)}</small>
                            </div>
                          </div>
                          <div className="hidden min-w-0 md:block">
                            <Eyebrow>Product</Eyebrow>
                            <p className="truncate text-[10px] text-muted-foreground">{work.productDescription}</p>
                          </div>
                          <div className="hidden flex-col gap-2 md:flex">
                            <div className="flex justify-between text-[10px] text-muted-foreground"><span>Progress</span><span>{num(produced)} / {num(work.quantityKg)} kg</span></div>
                            <Progress value={(produced / work.quantityKg) * 100} />
                          </div>
                          <Badge variant={badgeVariant(statusTone(work.status))}>{work.status}</Badge>
                        </div>
                      )
                    }) : <EmptyState title="No works orders" copy="Create one from a fully approved order confirmation." />}
                  </CardContent>
                </Card>

                <Card className="gap-0 overflow-hidden py-0">
                  <CardHeader className="border-b py-4 [.border-b]:pb-4">
                    <Eyebrow>Release queue</Eyebrow>
                    <CardTitle className="font-heading mt-1 text-base">Awaiting approval</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    {data.orderConfirmations.filter((o) => !allApproved(o)).slice(0, 5).map((order) => (
                      <button key={order.id} onClick={() => setPage('orders')} className="grid w-full grid-cols-[1fr_auto_16px] items-center gap-2.5 border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-canvas-soft">
                        <div>
                          <strong className="block text-[11px]">{order.number}</strong>
                          <span className="text-[9px] text-muted-foreground">{customerName(order.customerId)}</span>
                        </div>
                        <div className="flex gap-1">
                          {order.approvals.map((a) => <i key={a.role} className={cn('size-1.5 rounded-full', a.status === 'approved' ? 'bg-success' : 'bg-input')} title={`${a.role}: ${a.status}`} />)}
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </button>
                    ))}
                    {stats.pendingApprovals === 0 && <EmptyState title="All clear" copy="Every order confirmation is fully approved." />}
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Operating spine</span>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {['Order confirmed', 'Works order', 'Production', 'Quality', 'Finished goods', 'Despatch'].map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-white/50">{String(index + 1).padStart(2, '0')}</span>
                      <strong className="text-[10px] font-medium">{step}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {page === 'orders' && (
            <div className="flex flex-col gap-5">
              <PageIntro eyebrow="DI/R-03 digital register" title="Customer orders, correctly captured." copy="The Order Confirmation remains the commercial contract and approval gateway." action={<Button onClick={() => setModal('order')}><Plus size={16} /> New confirmation</Button>} />
              <div className="grid gap-3.5">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="gap-0 overflow-hidden py-0">
                    <CardHeader className="flex flex-row items-start justify-between border-b py-5 [.border-b]:pb-5">
                      <div>
                        <Eyebrow>{order.orderStatus}</Eyebrow>
                        <CardTitle className="font-heading mt-1 text-lg">{order.number}</CardTitle>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{customerName(order.customerId)} · PO {order.customerOrderNumber}</p>
                      </div>
                      <Badge variant={allApproved(order) ? 'success' : 'warning'}>{allApproved(order) ? 'Approved' : 'Approval pending'}</Badge>
                    </CardHeader>
                    <CardContent className="grid gap-7 py-5 md:grid-cols-2">
                      <div className="flex flex-col items-start gap-1.5">
                        <Eyebrow>Product specification</Eyebrow>
                        <strong className="text-[13px]">{order.productDescription}</strong>
                        <p className="text-[11px] text-muted-foreground">{order.width} × {order.length || '—'} mm · {order.gauge} micron · {order.tolerance}</p>
                        <div className="mt-1 flex flex-wrap gap-1.5">{order.route.map((r) => <Badge key={r} variant="neutral">{r}</Badge>)}</div>
                      </div>
                      <dl className="grid grid-cols-3">
                        <Detail label="Quantity" value={`${num(order.quantityKg)} kg${order.quantityUnits ? ` / ${num(order.quantityUnits)} units` : ''}`} />
                        <Detail label="Delivery" value={formatDate(order.deliveryDate)} />
                        <Detail label="Terms" value={order.paymentTerms} />
                      </dl>
                    </CardContent>
                    <div className="flex flex-col items-start justify-between gap-4 border-t bg-canvas-soft px-6 py-3 sm:flex-row sm:items-center">
                      <div className="flex gap-4">
                        {order.approvals.map((a) => (
                          <button key={a.role} onClick={() => approve(order.id, a)} className="flex flex-col items-center gap-1.5 transition-transform active:scale-95" title={a.approvedBy}>
                            <span className={cn('grid size-6 place-items-center rounded-full border text-[9px] transition-colors', a.status === 'approved' ? 'border-success bg-success text-white' : 'border-input text-muted-foreground')}>
                              {a.status === 'approved' ? <Check size={13} /> : a.role.charAt(0)}
                            </span>
                            <small className="text-[9px] text-muted-foreground">{a.role}</small>
                          </button>
                        ))}
                      </div>
                      {allApproved(order) && !data.worksOrders.some((w) => w.orderConfirmationId === order.id) && (
                        <Button variant="outline" size="sm" onClick={() => setModal('work-order')}>Create works order <ArrowRight size={14} /></Button>
                      )}
                    </div>
                  </Card>
                ))}
                {filteredOrders.length === 0 && <Card className="py-0"><EmptyState title="No matching orders" copy="Adjust your search or create a new order confirmation." /></Card>}
              </div>
            </div>
          )}

          {page === 'works-orders' && (
            <div className="flex flex-col gap-5">
              <PageIntro eyebrow="DI/R-07 digital register" title="The factory instruction set." copy="Works Orders inherit approved contract data. Changes require a new Works Order." action={<Button onClick={() => setModal('work-order')}><Plus size={16} /> New works order</Button>} />
              <Card className="overflow-hidden py-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Works order</TableHead><TableHead>Customer / product</TableHead><TableHead>Route</TableHead><TableHead>Produced</TableHead><TableHead>FG / despatched</TableHead><TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.worksOrders.map((work) => {
                      const produced = workProduced(work.id)
                      return (
                        <TableRow key={work.id}>
                          <TableCell><strong className="block text-[11px]">{work.number}</strong><small className="text-[9px] text-muted-foreground">{orderForWork(work)?.number}</small></TableCell>
                          <TableCell><strong className="block text-[11px]">{customerName(work.customerId)}</strong><small className="text-[9px] text-muted-foreground">{work.productDescription}</small></TableCell>
                          <TableCell><div className="flex flex-wrap gap-1">{work.route.map((r) => <Badge key={r} variant="neutral">{r}</Badge>)}</div></TableCell>
                          <TableCell><strong className="block text-[11px]">{num(produced)} kg</strong><Progress value={(produced / work.quantityKg) * 100} className="mt-1.5 w-28" /></TableCell>
                          <TableCell><strong className="block text-[11px]">{num(workTransferred(work.id))} / {num(workDespatched(work.id))} kg</strong><small className="text-[9px] text-muted-foreground">transferred / out</small></TableCell>
                          <TableCell><Badge variant={badgeVariant(statusTone(work.status))}>{work.status}</Badge></TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                {data.worksOrders.length === 0 && <EmptyState title="No works orders yet" copy="Approve an order confirmation, then issue a works order." />}
              </Card>
            </div>
          )}

          {page === 'production' && (
            <div className="flex flex-col gap-5">
              <PageIntro eyebrow="Digital production books" title="Capture the work where it happens." copy="Extrusion and Printing records retain rates, scrap, downtime and quality results." action={<Button onClick={() => setModal('run')}><Plus size={16} /> Record production</Button>} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StatCard label="Total output" value={num(sum(data.productionRuns.map((r) => r.producedKg)))} hint="kg recorded" />
                <StatCard label="Total scrap" value={num(sum(data.productionRuns.map((r) => r.scrapKg)))} hint="kg recorded" />
                <StatCard label="Downtime" value={num(sum(data.productionRuns.map((r) => r.downtimeMinutes)))} hint="minutes recorded" />
              </div>
              <Card className="overflow-hidden py-0">
                <Table>
                  <TableHeader>
                    <TableRow><TableHead>Date / shift</TableHead><TableHead>Works order</TableHead><TableHead>Stage / machine</TableHead><TableHead>Operator</TableHead><TableHead>Output</TableHead><TableHead>Scrap / downtime</TableHead><TableHead>Quality</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.productionRuns.map((run) => (
                      <TableRow key={run.id}>
                        <TableCell><strong className="block text-[11px]">{formatDate(run.date)}</strong><small className="text-[9px] text-muted-foreground">{run.shift} shift</small></TableCell>
                        <TableCell><strong className="text-[11px]">{data.worksOrders.find((w) => w.id === run.worksOrderId)?.number}</strong></TableCell>
                        <TableCell><strong className="block text-[11px]">{run.stage}</strong><small className="text-[9px] text-muted-foreground">{machineNumber(run.machineId)} · {run.rollCount} rolls</small></TableCell>
                        <TableCell className="text-[11px]">{run.operator}</TableCell>
                        <TableCell><strong className="block text-[11px]">{num(run.producedKg)} kg</strong><small className="text-[9px] text-muted-foreground">{run.producedUnits ? `${num(run.producedUnits)} units` : ''}</small></TableCell>
                        <TableCell><strong className="block text-[11px]">{run.scrapKg} kg / {run.downtimeMinutes} min</strong><small className="text-[9px] text-muted-foreground">{run.downtimeCode || 'No downtime'}</small></TableCell>
                        <TableCell><Badge variant={run.qualityResult === 'Pass' ? 'success' : run.qualityResult === 'Fail' ? 'danger' : 'warning'}>{run.qualityResult}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {data.productionRuns.length === 0 && <EmptyState title="No production recorded" copy="Record an Extrusion or Printing run against a works order." />}
              </Card>
            </div>
          )}

          {page === 'finished-goods' && (
            <div className="flex flex-col gap-5">
              <PageIntro eyebrow="DI/R-35 digital register" title="Verified before transfer." copy="Finished product quantities enter stores against a Works Order." action={<Button onClick={() => setModal('transfer')}><Plus size={16} /> Record transfer</Button>} />
              <Card className="overflow-hidden py-0">
                {data.finishedGoodsTransfers.length ? (
                  <Table>
                    <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Works order</TableHead><TableHead>Customer</TableHead><TableHead>Quantity</TableHead><TableHead>Transferred by</TableHead><TableHead>Received by</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {data.finishedGoodsTransfers.map((t) => {
                        const work = data.worksOrders.find((w) => w.id === t.worksOrderId)
                        return <TableRow key={t.id}><TableCell className="text-[11px]">{formatDate(t.date)}</TableCell><TableCell><strong className="block text-[11px]">{work?.number}</strong><small className="text-[9px] text-muted-foreground">{work?.productDescription}</small></TableCell><TableCell className="text-[11px]">{work ? customerName(work.customerId) : '—'}</TableCell><TableCell><strong className="block text-[11px]">{num(t.quantityKg)} kg</strong><small className="text-[9px] text-muted-foreground">{t.quantityUnits ? `${num(t.quantityUnits)} units` : ''}</small></TableCell><TableCell className="text-[11px]">{t.transferredBy}</TableCell><TableCell className="text-[11px]">{t.receivedBy}</TableCell></TableRow>
                      })}
                    </TableBody>
                  </Table>
                ) : <EmptyState title="No Finished Goods transfers" copy="Record a transfer after production has passed inspection." />}
              </Card>
            </div>
          )}

          {page === 'despatch' && (
            <div className="flex flex-col gap-5">
              <PageIntro eyebrow="Outbound fulfilment" title="Close the order loop." copy="Despatch against available Finished Goods and maintain the live Works Order balance." action={<Button onClick={() => setModal('despatch')}><Plus size={16} /> Record despatch</Button>} />
              <Card className="overflow-hidden py-0">
                {data.despatches.length ? (
                  <Table>
                    <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Delivery note</TableHead><TableHead>Works order</TableHead><TableHead>Customer</TableHead><TableHead>Quantity</TableHead><TableHead>Authorised by</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {data.despatches.map((d) => {
                        const work = data.worksOrders.find((w) => w.id === d.worksOrderId)
                        return <TableRow key={d.id}><TableCell className="text-[11px]">{formatDate(d.date)}</TableCell><TableCell><strong className="text-[11px]">{d.deliveryNote}</strong></TableCell><TableCell className="text-[11px]">{work?.number}</TableCell><TableCell className="text-[11px]">{work ? customerName(work.customerId) : '—'}</TableCell><TableCell><strong className="text-[11px]">{num(d.quantityKg)} kg</strong></TableCell><TableCell className="text-[11px]">{d.authorisedBy}</TableCell></TableRow>
                      })}
                    </TableBody>
                  </Table>
                ) : <EmptyState title="Nothing despatched yet" copy="Finished Goods must be transferred before it can be despatched." />}
              </Card>
            </div>
          )}

          {page === 'machines' && (
            <div className="flex flex-col gap-5">
              <PageIntro eyebrow="Plant register" title="Machines available to the plan." copy="MVP reference register seeded from the preventative maintenance schedule." />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {data.machines.map((m) => (
                  <Card key={m.id} className="flex-row items-center gap-3.5 py-4">
                    <CardContent className="flex w-full items-center gap-3.5">
                      <span className="grid size-11 place-items-center rounded-xl bg-secondary"><Factory size={20} /></span>
                      <div><Eyebrow>{m.type}</Eyebrow><h3 className="font-heading text-xl">{m.number}</h3></div>
                      <Badge className="ml-auto" variant={m.status === 'Available' ? 'success' : m.status === 'Maintenance' ? 'danger' : 'info'}>{m.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {page === 'data' && (
            <div className="flex flex-col gap-5">
              <PageIntro eyebrow="Pilot administration" title="Your data lives in this browser." copy="Export regular JSON backups. This local-storage MVP is not a multi-user production database." />
              <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
                <DataCard icon={<Download size={24} />} title="Export backup" copy="Download every FactoryOS record as a portable JSON file." action={<Button onClick={() => { exportData(); toast.success('Backup downloaded') }}><ArrowDownToLine size={16} /> Download backup</Button>} />
                <DataCard icon={<Upload size={24} />} title="Restore backup" copy="Replace current browser data with a prior FactoryOS JSON backup." action={<><input ref={fileInputRef} hidden type="file" accept=".json,application/json" onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} /><Button variant="outline" onClick={() => fileInputRef.current?.click()}><Upload size={16} /> Choose backup</Button></>} />
                <DataCard icon={<ShieldCheck size={24} />} title="Reset demonstration" copy="Remove local changes and restore the supplied demonstration records." action={<Button variant="outline" onClick={() => { if (window.confirm('Reset all local FactoryOS data?')) { reset(); toast.success('Demo data restored') } }}>Reset demo data</Button>} />
              </div>
              <div className="flex gap-3.5 rounded-2xl bg-info-bg p-5 text-info">
                <ShieldCheck size={21} className="shrink-0" />
                <div>
                  <strong className="text-xs">Pilot storage boundary</strong>
                  <p className="mt-1 text-[11px] leading-relaxed">Use this app to validate forms, workflow and operator acceptance. Move persistence to a shared database before live multi-user deployment.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={modal !== null} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent showCloseButton={false} className="max-h-[calc(100vh-2rem)] gap-0 overflow-y-auto bg-canvas-soft p-0 sm:max-w-2xl">
          {modal === 'order' && (
            <FormFrame title="New order confirmation" description="Capture the customer contract using the existing DI/R-03 workflow.">
              <OrderForm customers={data.customers} onSubmit={createOrder} />
            </FormFrame>
          )}
          {modal === 'work-order' && (
            <FormFrame title="Create works order" description="Only fully approved Order Confirmations are available.">
              <WorkOrderForm orders={availableOrders} machines={data.machines} customerName={customerName} onSubmit={createWorkOrder} />
            </FormFrame>
          )}
          {modal === 'run' && (
            <FormFrame title="Record production run" description="Digital Extrusion / Printing production book entry.">
              <ProductionForm works={data.worksOrders.filter((w) => w.status !== 'Complete')} machines={data.machines} onSubmit={createRun} />
            </FormFrame>
          )}
          {modal === 'transfer' && (
            <FormFrame title="Finished Goods transfer" description="Verify and transfer passed product into Finished Goods stores.">
              <TransferForm works={data.worksOrders} available={(id) => Math.max(0, workPassed(id) - workTransferred(id))} onSubmit={createTransfer} />
            </FormFrame>
          )}
          {modal === 'despatch' && (
            <FormFrame title="Record despatch" description="Despatch cannot exceed available Finished Goods.">
              <DespatchForm works={data.worksOrders} available={(id) => Math.max(0, workTransferred(id) - workDespatched(id))} onSubmit={createDespatch} />
            </FormFrame>
          )}
        </DialogContent>
      </Dialog>

      <Toaster position="bottom-right" />
    </div>
  )
}

function StatCard({ icon, label, value, hint }: { icon?: ReactNode; label: string; value: ReactNode; hint: string }) {
  return (
    <Card className="relative gap-0 py-5">
      <CardContent className="px-5">
        {icon && <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-[10px] bg-secondary">{icon}</span>}
        <span className="block text-[11px] text-muted-foreground">{label}</span>
        <strong className="font-heading tnum mt-4 block text-3xl leading-none tracking-[-0.04em]">{value}</strong>
        <small className="mt-1 block text-[10px] text-muted-foreground">{hint}</small>
      </CardContent>
    </Card>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l pl-4 first:border-l-0 first:pl-0">
      <dt className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-[11px] font-semibold">{value}</dd>
    </div>
  )
}

function DataCard({ icon, title, copy, action }: { icon: ReactNode; title: string; copy: string; action: ReactNode }) {
  return (
    <Card className="min-h-[248px] justify-start gap-0">
      <CardContent className="flex h-full flex-col items-start">
        <span className="mb-8 text-foreground">{icon}</span>
        <h3 className="font-heading mb-2 text-lg">{title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{copy}</p>
        <div className="mt-auto pt-6">{action}</div>
      </CardContent>
    </Card>
  )
}

function FormFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <>
      <DialogHeader className="sticky top-0 z-[2] border-b bg-canvas-soft/95 px-6 py-6 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Eyebrow>FactoryOS record</Eyebrow>
            <DialogTitle className="font-display text-2xl font-normal tracking-[-0.03em]">{title}</DialogTitle>
            <DialogDescription className="text-[11px]">{description}</DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="outline" size="icon" aria-label="Close dialog"><X size={16} /></Button>
          </DialogClose>
        </div>
      </DialogHeader>
      {children}
    </>
  )
}

function FormActions() {
  return (
    <div className="sticky bottom-0 z-[2] mt-6 flex items-center justify-between border-t bg-canvas-soft/95 px-6 py-3.5 backdrop-blur-md">
      <span className="hidden text-[9px] text-muted-foreground sm:block">Saved automatically to this browser</span>
      <div className="flex items-center gap-2">
        <DialogClose asChild>
          <Button type="button" variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save record <ArrowRight size={15} /></Button>
      </div>
    </div>
  )
}

function Field({ label, children, full }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <div className={cn('flex flex-col gap-2', full && 'sm:col-span-2')}>
      <Label className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

function OrderForm({ customers, onSubmit }: { customers: Customer[]; onSubmit: (payload: Omit<OrderConfirmation, 'id' | 'number' | 'tolerance' | 'approvals' | 'createdAt'>) => void }) {
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? '')
  const [orderStatus, setOrderStatus] = useState<OrderConfirmation['orderStatus']>('New Order')
  const [paymentTerms, setPaymentTerms] = useState('Prepayment')
  const [route, setRoute] = useState<string[]>(['Extrusion'])
  const [form, setForm] = useState({ customerOrderNumber: '', receivedDate: today(), deliveryDate: '', productDescription: '', quantityKg: '', quantityUnits: '0', width: '', length: '0', gauge: '', specialInstructions: '' })
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const toggleRoute = (r: string) => setRoute((current) => (current.includes(r) ? current.filter((x) => x !== r) : [...current, r]))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerId || !form.deliveryDate || route.length === 0) {
      toast.warning('Customer, delivery date and at least one route are required.')
      return
    }
    onSubmit({
      customerId, customerOrderNumber: form.customerOrderNumber, receivedDate: form.receivedDate, deliveryDate: form.deliveryDate,
      orderStatus, productDescription: form.productDescription, quantityKg: Number(form.quantityKg), quantityUnits: Number(form.quantityUnits),
      width: Number(form.width), length: Number(form.length), gauge: Number(form.gauge), paymentTerms, specialInstructions: form.specialInstructions, route,
    })
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 px-6 pt-6 sm:grid-cols-2">
        <Field label="Customer">
          <Select value={customerId} onValueChange={setCustomerId}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{customers.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Customer order number"><Input required value={form.customerOrderNumber} onChange={set('customerOrderNumber')} placeholder="PO / quotation reference" /></Field>
        <Field label="Date received"><Input type="date" value={form.receivedDate} onChange={set('receivedDate')} required /></Field>
        <Field label="Expected delivery"><Input type="date" value={form.deliveryDate} onChange={set('deliveryDate')} required /></Field>
        <Field label="Order status">
          <Select value={orderStatus} onValueChange={(v) => setOrderStatus(v as OrderConfirmation['orderStatus'])}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{['New Order', 'Repeat Order', 'Repeat Order with Changes', 'Trial Order'].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Payment terms">
          <Select value={paymentTerms} onValueChange={setPaymentTerms}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{['Prepayment', 'COD', 'BOD', '7 Days', '14 Days', '21 Days', '30 Days'].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Product description" full><Input required value={form.productDescription} onChange={set('productDescription')} placeholder="e.g. Printed LDPE sheeting roll" /></Field>
        <Field label="Quantity (kg)"><Input type="number" min="0" step="0.01" required value={form.quantityKg} onChange={set('quantityKg')} /></Field>
        <Field label="Quantity (units)"><Input type="number" min="0" value={form.quantityUnits} onChange={set('quantityUnits')} /></Field>
        <Field label="Width (mm)"><Input type="number" min="0" required value={form.width} onChange={set('width')} /></Field>
        <Field label="Length (mm)"><Input type="number" min="0" value={form.length} onChange={set('length')} /></Field>
        <Field label="Gauge (micron)"><Input type="number" min="0" required value={form.gauge} onChange={set('gauge')} /></Field>
        <Field label="Production route" full>
          <div className="flex flex-wrap gap-2">
            {ROUTE_OPTIONS.map((r) => (
              <button type="button" key={r} onClick={() => toggleRoute(r)} className={cn('rounded-full border px-3 py-1.5 text-[11px] transition-colors active:scale-[0.97]', route.includes(r) ? 'border-primary bg-primary text-primary-foreground' : 'border-input text-muted-foreground hover:border-foreground')}>{r}</button>
            ))}
          </div>
        </Field>
        <Field label="Special instructions" full><Textarea rows={3} value={form.specialInstructions} onChange={set('specialInstructions')} placeholder="Product features, treatment, print direction, artwork or trial notes" /></Field>
      </div>
      <FormActions />
    </form>
  )
}

function WorkOrderForm({ orders, machines, customerName, onSubmit }: { orders: OrderConfirmation[]; machines: Machine[]; customerName: (id: string) => string; onSubmit: (payload: { orderConfirmationId: string; machineId: string; expectedRatePerHour: number; formulation: string }) => void }) {
  const [orderConfirmationId, setOrderConfirmationId] = useState(orders[0]?.id ?? '')
  const [machineId, setMachineId] = useState(machines[0]?.id ?? '')
  const [rate, setRate] = useState('')
  const [formulation, setFormulation] = useState('')

  if (orders.length === 0) return <div className="p-6"><EmptyState title="No orders available" copy="Complete every required approval before creating a Works Order." /></div>

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderConfirmationId || !machineId || !rate || !formulation) { toast.warning('All fields are required.'); return }
    onSubmit({ orderConfirmationId, machineId, expectedRatePerHour: Number(rate), formulation })
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 px-6 pt-6 sm:grid-cols-2">
        <Field label="Approved order confirmation" full>
          <Select value={orderConfirmationId} onValueChange={setOrderConfirmationId}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{orders.map((o) => <SelectItem key={o.id} value={o.id}>{o.number} · {customerName(o.customerId)} · {o.productDescription}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Primary machine">
          <Select value={machineId} onValueChange={setMachineId}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{machines.map((m) => <SelectItem key={m.id} value={m.id}>{m.number} · {m.type}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Expected rate / hour (kg)"><Input type="number" min="1" required value={rate} onChange={(e) => setRate(e.target.value)} /></Field>
        <Field label="Raw material formulation" full><Textarea rows={4} required value={formulation} onChange={(e) => setFormulation(e.target.value)} placeholder="Base material, LLDPE, additive and recycled proportions" /></Field>
      </div>
      <div className="mx-6 mt-4 flex gap-3 rounded-xl bg-warning-bg p-3.5 text-warning">
        <ShieldCheck size={17} className="shrink-0" />
        <p className="text-[10px] leading-relaxed"><strong>No alterations.</strong> Any change after issue must be communicated and a new Works Order generated.</p>
      </div>
      <FormActions />
    </form>
  )
}

function ProductionForm({ works, machines, onSubmit }: { works: WorksOrder[]; machines: Machine[]; onSubmit: (payload: Omit<ProductionRun, 'id' | 'createdAt'>) => void }) {
  const [worksOrderId, setWorksOrderId] = useState(works[0]?.id ?? '')
  const [stage, setStage] = useState<ProductionRun['stage']>('Extrusion')
  const [shift, setShift] = useState<ProductionRun['shift']>('Day')
  const [machineId, setMachineId] = useState(machines[0]?.id ?? '')
  const [downtimeCode, setDowntimeCode] = useState('none')
  const [quality, setQuality] = useState<ProductionRun['qualityResult']>('Pending')
  const [form, setForm] = useState({ date: today(), operator: '', producedKg: '', producedUnits: '0', rollCount: '0', scrapKg: '0', downtimeMinutes: '0', notes: '' })
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value }))

  if (works.length === 0) return <div className="p-6"><EmptyState title="No works orders" copy="Issue a works order before recording production." /></div>

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!worksOrderId || !form.operator || !form.producedKg) { toast.warning('Works order, operator and produced quantity are required.'); return }
    onSubmit({
      worksOrderId, stage, date: form.date, shift, machineId, operator: form.operator,
      producedKg: Number(form.producedKg), producedUnits: Number(form.producedUnits), scrapKg: Number(form.scrapKg),
      downtimeMinutes: Number(form.downtimeMinutes), downtimeCode: downtimeCode === 'none' ? '' : downtimeCode,
      rollCount: Number(form.rollCount), notes: form.notes, qualityResult: quality,
    })
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 px-6 pt-6 sm:grid-cols-2">
        <Field label="Works order" full>
          <Select value={worksOrderId} onValueChange={setWorksOrderId}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{works.map((w) => <SelectItem key={w.id} value={w.id}>{w.number} · {w.productDescription}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Production stage"><Select value={stage} onValueChange={(v) => setStage(v as ProductionRun['stage'])}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Extrusion">Extrusion</SelectItem><SelectItem value="Printing">Printing</SelectItem></SelectContent></Select></Field>
        <Field label="Machine"><Select value={machineId} onValueChange={setMachineId}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{machines.map((m) => <SelectItem key={m.id} value={m.id}>{m.number} · {m.type}</SelectItem>)}</SelectContent></Select></Field>
        <Field label="Date"><Input type="date" value={form.date} onChange={set('date')} required /></Field>
        <Field label="Shift"><Select value={shift} onValueChange={(v) => setShift(v as ProductionRun['shift'])}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Day">Day</SelectItem><SelectItem value="Night">Night</SelectItem></SelectContent></Select></Field>
        <Field label="Operator" full><Input required value={form.operator} onChange={set('operator')} /></Field>
        <Field label="Produced (kg)"><Input type="number" step="0.01" min="0" required value={form.producedKg} onChange={set('producedKg')} /></Field>
        <Field label="Produced (units)"><Input type="number" min="0" value={form.producedUnits} onChange={set('producedUnits')} /></Field>
        <Field label="Roll count"><Input type="number" min="0" value={form.rollCount} onChange={set('rollCount')} /></Field>
        <Field label="Scrap (kg)"><Input type="number" step="0.01" min="0" value={form.scrapKg} onChange={set('scrapKg')} /></Field>
        <Field label="Downtime (minutes)"><Input type="number" min="0" value={form.downtimeMinutes} onChange={set('downtimeMinutes')} /></Field>
        <Field label="Downtime code"><Select value={downtimeCode} onValueChange={setDowntimeCode}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem>{DOWNTIME_CODES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select></Field>
        <Field label="Quality result"><Select value={quality} onValueChange={(v) => setQuality(v as ProductionRun['qualityResult'])}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Pass">Pass</SelectItem><SelectItem value="Fail">Fail</SelectItem></SelectContent></Select></Field>
        <Field label="Comments / deviations" full><Textarea rows={3} value={form.notes} onChange={set('notes')} /></Field>
      </div>
      <FormActions />
    </form>
  )
}

function TransferForm({ works, available, onSubmit }: { works: WorksOrder[]; available: (id: string) => number; onSubmit: (payload: Omit<FinishedGoodsTransfer, 'id'>) => void }) {
  const eligible = works.filter((w) => available(w.id) > 0)
  const [worksOrderId, setWorksOrderId] = useState(eligible[0]?.id ?? '')
  const [form, setForm] = useState({ date: today(), quantityKg: '', quantityUnits: '0', transferredBy: '', receivedBy: '' })
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }))

  if (eligible.length === 0) return <div className="p-6"><EmptyState title="No product available" copy="Record passed production before transferring to Finished Goods." /></div>

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const qty = Number(form.quantityKg)
    if (!worksOrderId || qty <= 0 || !form.transferredBy || !form.receivedBy) { toast.warning('Complete all fields with a positive quantity.'); return }
    if (qty > available(worksOrderId)) { toast.error(`Only ${num(available(worksOrderId))} kg available to transfer.`); return }
    onSubmit({ worksOrderId, date: form.date, quantityKg: qty, quantityUnits: Number(form.quantityUnits), transferredBy: form.transferredBy, receivedBy: form.receivedBy })
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 px-6 pt-6 sm:grid-cols-2">
        <Field label="Works order with untransferred production" full>
          <Select value={worksOrderId} onValueChange={setWorksOrderId}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{eligible.map((w) => <SelectItem key={w.id} value={w.id}>{w.number} · available {num(available(w.id))} kg</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Date"><Input type="date" value={form.date} onChange={set('date')} required /></Field>
        <Field label="Quantity (kg)"><Input type="number" step="0.01" min="0.01" required value={form.quantityKg} onChange={set('quantityKg')} /></Field>
        <Field label="Quantity (units)"><Input type="number" min="0" value={form.quantityUnits} onChange={set('quantityUnits')} /></Field>
        <Field label="Transferred by"><Input required value={form.transferredBy} onChange={set('transferredBy')} /></Field>
        <Field label="Received by (FG Stores)" full><Input required value={form.receivedBy} onChange={set('receivedBy')} /></Field>
      </div>
      <FormActions />
    </form>
  )
}

function DespatchForm({ works, available, onSubmit }: { works: WorksOrder[]; available: (id: string) => number; onSubmit: (payload: Omit<Despatch, 'id'>) => void }) {
  const eligible = works.filter((w) => available(w.id) > 0)
  const [worksOrderId, setWorksOrderId] = useState(eligible[0]?.id ?? '')
  const [form, setForm] = useState({ date: today(), deliveryNote: '', quantityKg: '', quantityUnits: '0', authorisedBy: '' })
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }))

  if (eligible.length === 0) return <div className="p-6"><EmptyState title="No Finished Goods available" copy="Record a Finished Goods transfer before despatch." /></div>

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const qty = Number(form.quantityKg)
    if (!worksOrderId || qty <= 0 || !form.deliveryNote || !form.authorisedBy) { toast.warning('Complete all fields with a positive quantity.'); return }
    onSubmit({ worksOrderId, date: form.date, deliveryNote: form.deliveryNote, quantityKg: qty, quantityUnits: Number(form.quantityUnits), authorisedBy: form.authorisedBy })
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 px-6 pt-6 sm:grid-cols-2">
        <Field label="Works order with available Finished Goods" full>
          <Select value={worksOrderId} onValueChange={setWorksOrderId}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{eligible.map((w) => <SelectItem key={w.id} value={w.id}>{w.number} · available {num(available(w.id))} kg</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field label="Date"><Input type="date" value={form.date} onChange={set('date')} required /></Field>
        <Field label="Delivery note"><Input required value={form.deliveryNote} onChange={set('deliveryNote')} placeholder="DN-..." /></Field>
        <Field label="Quantity (kg)"><Input type="number" step="0.01" min="0.01" required value={form.quantityKg} onChange={set('quantityKg')} /></Field>
        <Field label="Quantity (units)"><Input type="number" min="0" value={form.quantityUnits} onChange={set('quantityUnits')} /></Field>
        <Field label="Authorised by" full><Input required value={form.authorisedBy} onChange={set('authorisedBy')} /></Field>
      </div>
      <FormActions />
    </form>
  )
}
