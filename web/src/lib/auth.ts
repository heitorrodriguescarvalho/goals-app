import { createUser } from '@/actions/http/create-user'
import NextAuth from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    credentials({
      credentials: {
        email: {},
        password: {},
      },
    }),
  ],
  callbacks: {
    async signIn({ account, credentials }) {
      console.log(credentials)
      if (!credentials?.email) return false

      if (account?.provider === 'credentials' && !credentials.password) {
        console.log('Password - Error')
        return false
      }

      const { email, password } = credentials as Record<string, string>

      console.log('Credentials - OK')

      try {
        const result = await createUser({ email, password })

        console.log('Create User - OK')
        console.log(`Result error: ${result?.error}`)

        if (result.error?.statusCode !== 409) return false

        return true
      } catch {
        return false
      }
    },
  },
})
