// frontend/src/components/settings/SettingsForm.jsx

import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import api from '../services/api';

function SettingsForm({ userId }) {
  const [userSettings, setUserSettings] = useState({
    email: '',
    password: '',
    notifications: false,
  });

  useEffect(() => {
    // Fetch user settings from the backend
    const fetchSettings = async () => {
      try {
        const response = await api.get(`/userSettings/${userId}`);
        setUserSettings(response.data);
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    fetchSettings();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Update user settings in the backend
    try {
      await api.put(`/userSettings/${userId}`, userSettings);
      // Implement success logic (e.g., show success message, redirect)
    } catch (error) {
      console.error("Error updating user settings:", error);
      // Implement error handling logic
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">User Settings</Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          value={userSettings.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          name="password"
          type="password"
          value={userSettings.password}
          onChange={handleChange}
          helperText="Leave blank to keep your current password."
        />
        {/* Additional fields for notifications or preferences can be added here */}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '20px' }}
        >
          Update Settings
        </Button>
      </form>
    </Container>
  );
}

export default SettingsForm;