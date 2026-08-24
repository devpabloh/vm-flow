import {BrowserRouter, Routes, Route} from 'react-router'
import { LayoutMain } from './pages/Layouts/layout-main'
import { PageNotfound } from './pages/page-notfound'
import { PageHome } from './pages/page-home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route path='/' element={<PageHome/>}/>

        </Route>
        <Route path='*' element={<PageNotfound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
