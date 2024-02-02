// frontend/src/components/layout/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    leadsCount: 0,
    tasksCount: 0,
  });

  // Fetch summary data from the backend
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        // Placeholder for actual API request URLs
        const leadsResponse = await api.get('/leads/summary');
        const tasksResponse = await api.get('/tasks/summary');
        setSummary({
          leadsCount: leadsResponse.data.count,
          tasksCount: tasksResponse.data.count,
        });
      } catch (error) {
        console.error('Failed to fetch summary data:', error);
      }
    };

    fetchSummary();
  }, []);

  // Navigate to specific pages
  const goTo = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        {/* Leads Summary Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Leads Summary</Typography>
              <Typography variant="body1">{`Total Leads: ${summary.leadsCount}`}</Typography>
              <Button variant="contained" color="primary" onClick={() => goTo('/leads')}>View Leads</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Summary Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Tasks Summary</Typography>
              <Typography variant="body1">{`Total Tasks: ${summary.tasksCount}`}</Typography>
              <Button variant="contained" color="primary" onClick={() => goTo('/tasks')}>View Tasks</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Other summary cards can be added here */}

      </Grid>
    </Container>
  );
}

export default Dashboard;