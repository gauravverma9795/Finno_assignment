import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from '../../types';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/store';
import GridItem from '../common/GridItem'; // Import the custom GridItem

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
    }
  };

  const handleIncrement = () => {
    dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }));
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Card elevation={0} sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <GridItem xs={3} sm={2}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{ 
                height: 80, 
                width: '100%', 
                objectFit: 'contain',
                bgcolor: 'white' 
              }}
            />
          </GridItem>
          
          <GridItem xs={9} sm={5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {product.category}
            </Typography>
          </GridItem>
          
          <GridItem xs={6} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" onClick={handleDecrement}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              
              <TextField
                value={quantity}
                onChange={handleQuantityChange}
                type="number"
                size="small"
                inputProps={{ min: 1, style: { textAlign: 'center', width: '40px', padding: '5px' } }}
                variant="outlined"
                sx={{ mx: 1 }}
              />
              
              <IconButton size="small" onClick={handleIncrement}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </GridItem>
          
          <GridItem xs={4} sm={2} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              ${(product.price * quantity).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.price.toFixed(2)} each
            </Typography>
          </GridItem>
          
          <GridItem xs={2} sm={1} sx={{ textAlign: 'right' }}>
            <IconButton color="error" onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </GridItem>
        </Grid>
      </Card>
      <Divider />
    </Box>
  );
};

export default CartItem;