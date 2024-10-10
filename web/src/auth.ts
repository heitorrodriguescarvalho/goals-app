import { createUser } from '@/actions/http/create-user'
import { getUser } from '@/actions/http/get-user'
import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      const { email, image } = user

      const { user: newUser, error } = await createUser({
        email,
        image: image || undefined,
      })

      if (newUser) {
        user.id = newUser.id

        return true
      }

      if (error.statusCode === 409) {
        const dbUser = await getUser({ email })

        if (!dbUser) return false

        user.id = dbUser.id

        return true
      }

      return false
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id

      return token
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub

      return session
    },
  },
})
