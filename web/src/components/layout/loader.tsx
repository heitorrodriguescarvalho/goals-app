import Loading from '@/app/loading'

interface LoaderProps {
  children: React.ReactNode
  isLoading: boolean
}

export default function Loader({ children, isLoading }: LoaderProps) {
  if (isLoading) return <Loading />

  return children
}
