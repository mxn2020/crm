import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const AddLeadForm = ({ open, onClose }) => {
    const [lead, setLead] = useState({ name: '', email: '', source: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLead(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post request to backend
        fetch('http://localhost:5000/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        })
        .then(response => response.json())
        .then(data => {
            onClose(); // Close modal on success
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={lead.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={lead.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="source"
                    label="Source"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={lead.source}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Lead</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddLeadForm;
