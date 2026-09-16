import { BrowserRouter, Routes, Route } from 'react-router';
import { LayoutMain } from './pages/Layouts/layout-main';
import { PageNotfound } from './pages/page-notfound';
import { PageHome } from './pages/page-home';
import { ThemeProvider } from './context/theme-context';
import { PageSettings } from './pages/page-settings';
import { UserProvider } from './context/user-context';
import { PageAbout } from './pages/page-about';
import { PageMonitoring } from './pages/page-monitoring';
import { PageVirtualMachines } from './pages/page-virtual-machines';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutMain />}>
              <Route path="/" element={<PageHome />} />
              <Route path="/virtual-machines" element={<PageVirtualMachines />} />
              <Route path="/monitoring" element={<PageMonitoring />} />
              <Route path="about" element={<PageAbout />} />
              <Route path="/settings" element={<PageSettings />} />
            </Route>
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
