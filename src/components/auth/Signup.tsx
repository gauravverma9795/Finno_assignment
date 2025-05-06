import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { SignupSchema } from '../../utils/validation';
import { registerSuccess } from '../../redux/slices/authSlice';
import { User } from '../../types';
import { useAppDispatch } from '../../redux/store';
import GridItem from '../common/GridItem'; // Import the custom GridItem

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: Omit<User, 'id'>) => {
    // In a real app, we would make an API call here
    // For this demo, we'll just simulate a successful registration
    const newUser: User = {
      ...values,
      id: Math.floor(Math.random() * 1000), // Generate a random ID
    };
    
    dispatch(registerSuccess(newUser));
    navigate('/products');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>
        
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <Grid container spacing={2}>
                <GridItem xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </GridItem>
                
                <GridItem xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="First Name"
                    name="firstName"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </GridItem>
                
                <GridItem xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </GridItem>
                
                <GridItem xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </GridItem>
                
                <GridItem xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isValid || !dirty}
                  >
                    Sign Up
                  </Button>
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
        
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;