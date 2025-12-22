import './App.css'
import { useSyncFiltersWithUrl } from './hooks/useSyncFiltersWithUrl'

import AppRouter from './router'
function App() {

  useSyncFiltersWithUrl();

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
