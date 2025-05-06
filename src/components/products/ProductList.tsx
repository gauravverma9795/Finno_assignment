import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getAllProducts, getAllCategories } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { useAppDispatch } from '../../redux/store';
import GridItem from '../common/GridItem'; // Import the custom GridItem

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, categories } = useSelector(
    (state: RootState) => state.products
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const ITEMS_PER_PAGE = 8;
  const drawerWidth = 280;

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter and sort products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading && products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading products: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductFilter 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle} 
        drawerWidth={drawerWidth} 
      />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` } 
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            All Products
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <GridItem xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>
            
            <GridItem xs={8} sm={4} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOrder}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="name-asc">Name: A to Z</MenuItem>
                  <MenuItem value="name-desc">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            
            <GridItem xs={4} sm={2} md={1} sx={{ display: { sm: 'none' } }}>
              <IconButton 
                color="primary" 
                onClick={handleDrawerToggle}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <FilterListIcon />
              </IconButton>
            </GridItem>
            
            <GridItem xs={12} sm={12} md={4} sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </Typography>
            </GridItem>
          </Grid>
        </Box>

        {paginatedProducts.length === 0 ? (
          <Alert severity="info" sx={{ mt: 4 }}>
            No products found. Try adjusting your search or filters.
          </Alert>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <GridItem key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </GridItem>
              ))}
            </Grid>
            
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={currentPage} 
                  onChange={handlePageChange}
                  color="primary" 
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductList;