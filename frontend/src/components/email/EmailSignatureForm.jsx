// frontend/src/components/email/EmailSignatureForm.jsx

import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import api from '../services/api';

function EmailSignatureForm({ signatureData, onSave }) {
  const [signatureDetails, setSignatureDetails] = useState({
    name: signatureData?.name || '',
    signature: signatureData?.signature || ''
  });

  const handleChange = (field) => (value) => {
    setSignatureDetails({ ...signatureDetails, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if it's a new signature or editing an existing one
      const method = signatureData?.id ? 'put' : 'post';
      const endpoint = signatureData?.id ? `/emailSignatures/${signatureData.id}` : '/emailSignatures';

      await api[method](endpoint, signatureDetails);

      if(onSave) onSave();
      
    } catch (error) {
      console.error('Failed to save the signature:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">{signatureData ? 'Edit Signature' : 'Create Signature'}</Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={signatureDetails.name}
          onChange={(e) => handleChange('name')(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={signatureDetails.signature}
          onChange={handleChange('signature')}
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

export default EmailSignatureForm;