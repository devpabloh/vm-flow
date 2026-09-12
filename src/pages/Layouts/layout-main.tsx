import { Outlet } from 'react-router';
import { MainContent } from '../../core-components/main-content';
import { Footer } from '../../core-components/footer';
import { Sidebar } from '../../core-components/sidebar';

export function LayoutMain() {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </div>
  );
}
