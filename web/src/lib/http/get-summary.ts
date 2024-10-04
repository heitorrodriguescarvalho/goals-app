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

export async function getSummary({
  userId,
}: { userId: string }): Promise<SummaryType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/summary/${userId}`
  )
  const data: { summary: SummaryType } = await response.json()

  return data.summary
}
