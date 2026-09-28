import { BrowserRouter, Routes, Route } from 'react-router';
import { LayoutMain } from './pages/Layouts/layout-main';
import { PageNotfound } from './pages/page-notfound';
import { PageHome } from './pages/page-home';
import { ThemeProvider } from './context/theme-context';
import { PageSettings } from './pages/page-settings';
import { UserProvider } from './context/user-context';
import { PageMonitoring } from './pages/page-monitoring';
import { PageVirtualMachines } from './pages/page-virtual-machines';
import { PageLogin } from './pages/page-login';
import { ProtectedRoutes } from './auth/protected-routes';
import { RoleRoute } from './auth/role-route';
import { ROLES } from './auth/roles';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<PageLogin />} />

            <Route element={<LayoutMain />}>
              <Route path="/" element={<PageHome />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/settings" element={<PageSettings />} />
                <Route element={<RoleRoute allowed={[ROLES.admin]} />}>
                  <Route path="/virtual-machines" element={<PageVirtualMachines />} />
                  <Route path="/monitoring" element={<PageMonitoring />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
