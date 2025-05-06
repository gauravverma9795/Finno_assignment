import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getProductById } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import GridItem from '../common/GridItem'; // Import the custom GridItem

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductById(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({ productId: selectedProduct.id, quantity }));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading product details: {error}
      </Alert>
    );
  }

  if (!selectedProduct) {
    return (
      <Alert severity="info">
        Product not found.
      </Alert>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box mb={2}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
          sx={{ mb: 2 }}
        >
          Back to Products
        </Button>
      </Box>

      {addedToCart && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Product added to cart successfully!
        </Alert>
      )}

      <Grid container spacing={4}>
        <GridItem xs={12} md={6}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              height="400"
              image={selectedProduct.image}
              alt={selectedProduct.title}
              sx={{ objectFit: 'contain', bgcolor: 'white', p: 2 }}
            />
          </Card>
        </GridItem>

        <GridItem xs={12} md={6}>
          <Box>
            <Chip 
              label={selectedProduct.category} 
              color="primary" 
              size="small" 
              sx={{ mb: 1, textTransform: 'capitalize' }} 
            />
            
            <Typography variant="h4" component="h1" gutterBottom>
              {selectedProduct.title}
            </Typography>
            
            <Box display="flex" alignItems="center" mb={2}>
              <Rating value={4} readOnly />
              <Typography variant="body2" color="text.secondary" ml={1}>
                (16 reviews)
              </Typography>
            </Box>
            
            <Typography variant="h5" color="primary" mb={2}>
              ${selectedProduct.price.toFixed(2)}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body1" paragraph>
              {selectedProduct.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" mr={2}>
                Quantity:
              </Typography>
              <IconButton size="small" onClick={handleDecrement}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                onChange={handleQuantityChange}
                type="number"
                inputProps={{ min: 1 }}
                size="small"
                sx={{ width: '70px', mx: 1 }}
              />
              <IconButton size="small" onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Paper>
  );
};

export default ProductDetail;