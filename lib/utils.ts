import dayjs from 'dayjs'

export function generateInstallments(startDate: string, dayOfMonth: number, tenor: number, amount: number) {
  const arr = []
  let base = dayjs(startDate)

  for (let i = 0; i < tenor; i++) {
    arr.push({
      due_date: base.add(i, 'month').date(dayOfMonth).toISOString(),
      amount
    })
  }

  return arr
}

export function diffDays(date: string) {
  return dayjs(date).diff(dayjs(), 'day')
}
