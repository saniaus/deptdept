import { db } from '@/lib/db'

export async function GET() {
  const { data } = await db.from('debts').select('*')

  let total_all = 0
  let total_remaining = 0

  for (const d of data || []) {
    total_all += d.total_amount

    const remaining = Math.max(
      0,
      d.total_amount - (d.installment_amount * d.paid_count)
    )

    total_remaining += remaining
  }

  return Response.json({ total_all, total_remaining })
}
