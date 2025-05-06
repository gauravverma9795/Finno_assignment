import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CartItem from './CartItem';
import { clearCart, updateTotal } from '../../redux/slices/cartSlice';
import { getAllProducts } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import GridItem from '../common/GridItem'; // Import the custom GridItem

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.products);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    dispatch(updateTotal(products));
  }, [dispatch, items, products]);

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { product, quantity: item.quantity };
  }).filter((item) => item.product !== undefined);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      alert('Checkout functionality would be implemented here');
      dispatch(clearCart());
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/products')}
            startIcon={<ArrowBackIcon />}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={4}>
        <GridItem xs={12} md={8}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {cartProducts.map(({ product, quantity }) => 
              product && (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              )
            )}
            
            <Box sx={{ mt: 2 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </Box>
          </Paper>
        </GridItem>
        
        <GridItem xs={12} md={4}>
          <Card elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${total.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">Free</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Tax</Typography>
                <Typography variant="body1">${(total * 0.1).toFixed(2)}</Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${(total + total * 0.1).toFixed(2)}</Typography>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleCheckout}
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>
            
            {!isAuthenticated && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Please login to complete your purchase.
              </Alert>
            )}
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Cart;