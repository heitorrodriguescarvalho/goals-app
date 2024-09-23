interface CreateGoalType {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalType) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
}
