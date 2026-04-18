export async function sendTelegram(text: string, retry = 1) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text
      })
    })

    if (!res.ok) throw new Error()
  } catch {
    if (retry > 0) {
      await new Promise(r => setTimeout(r, 1000))
      return sendTelegram(text, retry - 1)
    }
  }
}
