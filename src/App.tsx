import { useMode } from '@/lib/mode'
import { TourApp } from '@/tour/TourApp'
import { AppShell } from '@/app/AppShell'

export default function App() {
  const [mode] = useMode()
  return mode === 'app' ? <AppShell /> : <TourApp />
}
