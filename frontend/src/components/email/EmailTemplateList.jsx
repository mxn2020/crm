import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';
import axios from 'axios';

const EmailTemplateList = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/emailTemplates')
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => console.log('Error fetching email templates:', error));
  }, []);

  return (
    <Container component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.description}</TableCell>
              <TableCell>
                {/* Implement Edit, Delete, Preview buttons here */}
                <Button>Edit</Button>
                <Button>Delete</Button>
                <Button>Preview</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default EmailTemplateList;
