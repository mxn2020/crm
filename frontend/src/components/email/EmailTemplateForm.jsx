// frontend/src/components/email/EmailTemplateForm.jsx

import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include the Quill CSS
import api from '../services/api';

function EmailTemplateForm({ template, onSave }) {
  const [templateDetails, setTemplateDetails] = useState({
    name: template?.name || '',
    content: template?.content || ''
  });

  const handleChange = (field) => (value) => {
    setTemplateDetails({ ...templateDetails, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Determine if it's a new template or editing an existing one
      const method = template?.id ? 'put' : 'post';
      const endpoint = template?.id ? `/emailTemplates/${template.id}` : '/emailTemplates';

      await api[method](endpoint, templateDetails);

      if(onSave) onSave();

    } catch (error) {
      console.error('Failed to save the template:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">{template ? 'Edit Template' : 'Create Template'}</Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={templateDetails.name}
          onChange={(e) => handleChange('name')(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={templateDetails.content}
          onChange={handleChange('content')}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '20px' }}
        >
          Save
        </Button>
      </form>
    </Container>
  );
}

export default EmailTemplateForm;