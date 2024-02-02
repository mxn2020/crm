// frontend/src/components/leads/LeadsFilter.jsx

import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import api from '../services/api';

function LeadsFilter({ onFilter }) {
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    searchQuery: ''
  });

  const handleStatusChange = (event) => {
    setFilterCriteria({ ...filterCriteria, status: event.target.value });
  };

  const handleSearchQueryChange = (event) => {
    setFilterCriteria({ ...filterCriteria, searchQuery: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Assuming the backend supports filtering by both status and search query
      const response = await api.get('/leads', { params: filterCriteria });
      // onFilter is a prop function to handle the filtered leads data
      onFilter(response.data);
    } catch (error) {
      console.error('Failed to fetch filtered leads:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={filterCriteria.status}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* Populating menu items dynamically based on available statuses */}
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="contacted">Contacted</MenuItem>
          <MenuItem value="qualified">Qualified</MenuItem>
          <MenuItem value="lost">Lost</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Search"
        margin="normal"
        value={filterCriteria.searchQuery}
        onChange={handleSearchQueryChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Filter
      </Button>
    </Box>
  );
}

export default LeadsFilter;