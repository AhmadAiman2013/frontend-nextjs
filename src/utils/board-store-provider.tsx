'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { BoardStore, createBoardStore, defaultInitState } from '@/hooks/useStore'

export type BoardStoreApi = ReturnType<typeof createBoardStore>

export const BoardStoreContext = createContext<BoardStoreApi | undefined>(undefined)

export interface BoardStoreProviderProps {
    children: ReactNode
  }
  
  export const BoardStoreProvider = ({
    children,
  }: BoardStoreProviderProps) => {
    const storeRef = useRef<BoardStoreApi>()
    if (!storeRef.current) {
      storeRef.current = createBoardStore(defaultInitState)
    }
  
    return (
      <BoardStoreContext.Provider value={storeRef.current}>
        {children}
      </BoardStoreContext.Provider>
    )
  }


export const useBoardStore = <T,>(
    selector: (store: BoardStore) => T
  ): T => {
    const boardStoreContext = useContext(BoardStoreContext)
  
    if (!boardStoreContext) {
      throw new Error(`useBoardStore must be used within BoardStoreProvider`)
    }
  
    return useStore(boardStoreContext, selector)
  }