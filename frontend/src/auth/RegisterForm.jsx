import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const RegisterForm = () => {
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', newUser);
      // Handle registration success (e.g., redirect to login page)
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure (e.g., show error message)
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
          onChange={handleChange}
          value={newUser.username}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={newUser.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={newUser.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
