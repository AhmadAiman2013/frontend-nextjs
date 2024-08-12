'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { EditStore, createEditStore, defaultInitState } from '@/hooks/useStore'

export type EditStoreApi = ReturnType<typeof createEditStore>

export const EditStoreContext = createContext<EditStoreApi | undefined>(undefined)

export interface EditStoreProviderProps {
    children: ReactNode
  }
  
  export const EditStoreProvider = ({
    children,
  }: EditStoreProviderProps) => {
    const storeRef = useRef<EditStoreApi>()
    if (!storeRef.current) {
      storeRef.current = createEditStore(defaultInitState)
    }
  
    return (
      <EditStoreContext.Provider value={storeRef.current}>
        {children}
      </EditStoreContext.Provider>
    )
  }


export const useEditStore = <T,>(
    selector: (store: EditStore) => T
  ): T => {
    const editStoreContext = useContext(EditStoreContext)
  
    if (!editStoreContext) {
      throw new Error(`useEditStore must be used within BoardStoreProvider`)
    }
  
    return useStore(editStoreContext, selector)
  }