import { login } from '@/actions/auth/login'
import { auth } from '@/auth'
import GithubIcon from '@/components/icons/github-icon'
import Logo from '@/components/icons/logo'
import LogoutButton from '@/components/layout/user-button'
import { Button } from '@/components/ui/button'

export default async function Navbar() {
  const session = await auth()

  return (
    <header className="sticky top-0 flex items-center justify-between px-8 py-4">
      <Logo />
      {!session?.user ? (
        <form action={login}>
          <Button variant="secondary" type="submit">
            <GithubIcon className="mr-2 size-6" />
            Login com Github
          </Button>
        </form>
      ) : (
        <LogoutButton />
      )}
    </header>
  )
}
