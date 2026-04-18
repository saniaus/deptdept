import { db } from '@/lib/db'

export async function POST(req: Request) {
  const { installmentId, debtId } = await req.json()

  const { data } = await db
    .from('installments')
    .select('*')
    .eq('id', installmentId)
    .single()

  if (!data || data.is_paid) {
    return new Response('Invalid / already paid', { status: 400 })
  }

  await db.from('installments')
    .update({ is_paid: true })
    .eq('id', installmentId)

  await db.rpc('increment_paid', { debt_id_input: debtId })

  return Response.json({ ok: true })
}
