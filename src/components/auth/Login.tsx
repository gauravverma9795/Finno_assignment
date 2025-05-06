import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { LoginSchema } from '../../utils/validation';
import { loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (values: LoginFormValues) => {
    // In a real app, we would make an API call here
    // For demo, we'll check against localStorage
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      
      // Check if the credentials match
      if (user.email === values.email && user.password === values.password) {
        dispatch(loginSuccess(user));
        navigate('/products');
      } else {
        dispatch(loginFailure('Invalid Credentials'));
      }
    } else {
      dispatch(loginFailure('User not found'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>
              
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid || !dirty}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link onClick={() => navigate('/signup')} sx={{ cursor: 'pointer' }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;