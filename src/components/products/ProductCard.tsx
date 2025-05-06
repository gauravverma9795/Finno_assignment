import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Product } from '../../types';
import { addToCart } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'center', 
          bgcolor: 'white', 
          cursor: 'pointer' 
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ 
            height: 200, 
            objectFit: 'contain' 
          }}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          noWrap 
          sx={{ 
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main'
            }
          }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            height: '40px'
          }}
        >
          {product.description}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Rating value={4} readOnly size="small" />
        </Box>
      </CardContent>
      
      <CardActions>
        <Button 
          size="small" 
          variant="contained" 
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;