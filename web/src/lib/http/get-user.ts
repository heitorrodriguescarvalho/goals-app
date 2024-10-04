interface GetUserType {
  email: string
}

interface UserType {
  id: string
  email: string
  password: string | null
  createdAt: Date
}

export async function getUser({ email }: GetUserType) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${email}`
  )

  switch (response.status) {
    case 404:
      return null

    case 500:
      throw new Error('Failed to fetch user')
  }

  const data: { user: UserType } = await response.json()

  return data.user
}
