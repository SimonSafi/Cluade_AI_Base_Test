import { createContext, useContext } from 'react'

/** True when an Act is rendered inside the phone App shell (one topic per screen):
 *  Acts read this to drop full-viewport padding + huge type and fit a phone panel. */
export const CompactCtx = createContext(false)
export const useCompact = () => useContext(CompactCtx)
