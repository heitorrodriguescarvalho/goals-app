'use server'

type SummaryType = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

export async function getSummary(): Promise<SummaryType> {
  const response = await fetch('http://localhost:3333/summary')
  const data: { summary: SummaryType } = await response.json()

  return data.summary
}