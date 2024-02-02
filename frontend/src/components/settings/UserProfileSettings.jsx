import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import axios from 'axios';

const UserProfileSettings = () => {
  const [userProfile, setUserProfile] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to update user profile
    axios.put('http://localhost:5000/api/userProfile', userProfile)
      .then(response => {
        // Handle success
        alert('Profile updated successfully!');
      })
      .catch(error => {
        // Handle error
        console.error('There was an error updating the profile:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">User Profile Settings</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={userProfile.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={userProfile.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={userProfile.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default UserProfileSettings;
