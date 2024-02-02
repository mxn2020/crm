import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Container } from '@mui/material';
import axios from 'axios';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Replace 'http://localhost:5000/api/leads' with your actual API endpoint
    axios.get('http://localhost:5000/api/leads')
      .then(response => {
        setLeads(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <Container component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default LeadsList;
