import './App.css'
import Criteria from './components/Criteria/Criteria'
import Footer from './components/Footer/footer'
import PropertySelection from './components/PropertySelection/PropertySelection'
import Test from './components/Test/test'
import { useSyncReduxFiltersWithUrl } from './hooks/useSyncReduxFiltersWithUrl'
import AppRouter from './router'


function App() {
  // useSyncReduxFiltersWithUrl();

  return (
    <>
      {/* <AppRouter /> */}
      <Test />

    </>
  )
}

export default App
