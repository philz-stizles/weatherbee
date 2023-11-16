import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../shared';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
