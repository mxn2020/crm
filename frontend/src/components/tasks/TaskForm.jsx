// frontend/src/components/tasks/TaskForm.jsx

import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../services/api';

function TaskForm({ task, onSave }) {
  const [taskDetails, setTaskDetails] = useState({
    name: '',
    description: '',
    assignedTo: '',
    status: 'Pending',
    deadline: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // If task is provided, we're editing an existing task
    if (task) {
      setTaskDetails(task);
    }

    // Fetch users for the 'assigned to' dropdown
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Couldn't fetch users:", error);
      }
    };

    fetchUsers();
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Determine if this is a new task or editing an existing task
    const method = taskDetails.id ? 'put' : 'post';
    const endpoint = `/tasks${taskDetails.id ? `/${taskDetails.id}` : ''}`;

    try {
      await api[method](endpoint, taskDetails);
      if(onSave) onSave(); // Execute onSave callback if provided
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">{task ? 'Edit Task' : 'New Task'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Task Name"
          variant="outlined"
          margin="normal"
          name="name"
          value={taskDetails.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          name="description"
          multiline
          rows={4}
          value={taskDetails.description}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Assigned To</InputLabel>
          <Select
            name="assignedTo"
            value={taskDetails.assignedTo}
            onChange={handleChange}
            label="Assigned To"
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="date"
          label="Deadline"
          variant="outlined"
          margin="normal"
          name="deadline"
          value={taskDetails.deadline}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Save Task
        </Button>
      </form>
    </Container>
  );
}

export default TaskForm;