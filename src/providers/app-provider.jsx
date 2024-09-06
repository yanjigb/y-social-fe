// 'use client'

// import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
// import { createContext, useContextSelector } from 'use-context-selector'
// import { useMediaQuery } from 'usehooks-ts'

// export interface AppContextValues {
//     isExpandSidebar: boolean
//     toggleSidebar: () => void
// }

// export type UseAppContext = (value: AppContextValues) => any

// const AppContext = createContext < AppContextValues > ({} as AppContextValues)

// const useAppState = (selector: UseAppContext) => useContextSelector(AppContext, selector)

// function AppProvider({ children }: PropsWithChildren) {
//     const isTablet = useMediaQuery('(max-width: 63.9988rem)')

//     const [isExpandSidebar, setIsExpandSidebar] = useState(!isTablet)

//     const toggleSidebar = useCallback(() => {
//         setIsExpandSidebar((prev) => !prev)
//     }, [])

//     const memoizedValue = useMemo(
//         () => ({ isExpandSidebar, toggleSidebar }),
//         [isExpandSidebar, toggleSidebar],
//     )

//     return <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
// }

// export { AppProvider, useAppState }
