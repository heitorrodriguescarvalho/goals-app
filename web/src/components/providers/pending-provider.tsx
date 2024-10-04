'use client'

import { PendingContext } from '@/contexts/pending-context'
import { useState } from 'react'

export function PendingProvider({ children }: { children: React.ReactNode }) {
  const [pendingActions, setPendingActions] = useState<string[]>([])

  const addPendingAction = (action: string) =>
    setPendingActions(prev => [...prev, action])

  const removePendingAction = (removeAction: string) =>
    setPendingActions(prev => prev.filter(action => action !== removeAction))

  const isPending = pendingActions.length > 0

  return (
    <PendingContext.Provider
      value={{ isPending, addPendingAction, removePendingAction }}
    >
      {children}
    </PendingContext.Provider>
  )
}
