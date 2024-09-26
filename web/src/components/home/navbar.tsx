import SignInDialog from '@/components/auth/sign-in-dialog'
import SignUpDialog from '@/components/auth/sign-up-dialog'
import Logo from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { auth, signOut } from '@/lib/auth'
import { LogOut } from 'lucide-react'

export default async function Navbar() {
  const session = await auth()

  const handleSignOut = async () => {
    'use server'

    await signOut()
  }

  return (
    <header className="flex justify-between items-center py-4 px-8">
      <Logo />
      {!session?.user ? (
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Entrar</Button>
            </DialogTrigger>
            <SignInDialog />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Crie uma conta</Button>
            </DialogTrigger>
            <SignUpDialog />
          </Dialog>
        </div>
      ) : (
        <form action={handleSignOut}>
          <Button variant="secondary" type="submit">
            <LogOut className="size-4 mr-2" />
            Sair
          </Button>
        </form>
      )}
    </header>
  )
}
