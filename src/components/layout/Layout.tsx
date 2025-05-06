import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
        <Container>
          <Box>
            © {new Date().getFullYear()} E-Commerce Store
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;