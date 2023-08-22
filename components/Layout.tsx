// components/Layout.js
import Header from './Header';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
  }
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
