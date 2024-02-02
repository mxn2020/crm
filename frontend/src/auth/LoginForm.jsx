import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      const { token } = response.data;
      localStorage.setItem('userToken', token); // Store the token
      onLoginSuccess();
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., show an error message)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={handleChange}
          value={credentials.username}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={credentials.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
