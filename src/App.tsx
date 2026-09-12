import { BrowserRouter, Routes, Route } from 'react-router';
import { LayoutMain } from './pages/Layouts/layout-main';
import { PageNotfound } from './pages/page-notfound';
import { PageHome } from './pages/page-home';
import { ThemeProvider } from './context/theme-context';
import { PageSettings } from './pages/page-settings';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route path="/" element={<PageHome />} />
            <Route path="/settings" element={<PageSettings />} />
          </Route>
          <Route path="*" element={<PageNotfound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
