import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { getProductsByCategory, getAllProducts } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';

interface ProductFilterProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth
}) => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.products);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 1000]);
  
  const handleCategoryClick = (category: string) => {
    dispatch(getProductsByCategory(category));
  };
  
  const handleShowAll = () => {
    dispatch(getAllProducts());
  };
  
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Filters
      </Typography>
      
      <Button 
        variant="outlined" 
        fullWidth 
        sx={{ mb: 2 }}
        onClick={handleShowAll}
      >
        Show All Products
      </Button>
      
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Categories
      </Typography>
      
      <List disablePadding>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(category)}>
              <ListItemText 
                primary={category} 
                primaryTypographyProps={{ 
                  style: { textTransform: 'capitalize' } 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Price Range
      </Typography>
      
      <Box sx={{ px: 1 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <TextField
            size="small"
            label="Min"
            value={priceRange[0]}
            InputProps={{
              readOnly: true,
              startAdornment: <Box component="span" mr={0.5}>$</Box>,
            }}
            sx={{ width: '45%' }}
          />
          <TextField
            size="small"
            label="Max"
            value={priceRange[1]}
            InputProps={{
              readOnly: true,
              startAdornment: <Box component="span" mr={0.5}>$</Box>,
            }}
            sx={{ width: '45%' }}
          />
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Popular Tags
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip label="Bestseller" size="small" clickable />
        <Chip label="New Arrival" size="small" clickable />
        <Chip label="Sale" size="small" clickable />
        <Chip label="Top Rated" size="small" clickable />
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth 
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            position: 'relative',
            height: '100%',
            border: 'none',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default ProductFilter;