import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/products')}
        >
          E-Commerce Store
        </Typography>
        
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit"
              onClick={() => navigate('/profile')}
            >
              <AccountCircleIcon />
            </IconButton>
            
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/cart')}
            >
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            <Button 
              color="inherit" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            
            <Button 
              color="inherit" 
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;