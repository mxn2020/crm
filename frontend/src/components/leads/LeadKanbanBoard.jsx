// frontend/src/components/leads/LeadKanbanBoard.jsx

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Paper, Typography } from '@mui/material';
import api from '../services/api';

function LeadKanbanBoard() {
  const [leads, setLeads] = useState({
    new: [],
    contacted: [],
    qualified: [],
    lost: [],
  });

  useEffect(() => {
    // Fetch leads grouped by status
    const fetchLeads = async () => {
      const response = await api.get('/leads');
      const leadsByStatus = {
        new: [],
        contacted: [],
        qualified: [],
        lost: [],
      };
      response.data.forEach(lead => {
        leadsByStatus[lead.status].push(lead);
      });
      setLeads(leadsByStatus);
    };
    
    fetchLeads();
  }, []);

  // Handle drag & drop
  const onDragEnd = (result) => {
    // Logic to reorder leads when dragged and dropped to new position/status
    console.log(result);
    // Update the lead status in the backend upon successful drag and drop
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(leads).map((status, index) => (
        <Droppable droppableId={status} key={index}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              component={Paper}
              elevation={2}
              p={2}
              m={1}
              bgcolor={snapshot.isDraggingOver ? 'action.hover' : 'background.paper'}
            >
              <Typography variant="h6">{status.toUpperCase()}</Typography>
              {leads[status].map((lead, index) => (
                <Draggable key={lead.id} draggableId={String(lead.id)} index={index}>
                  {(provided, snapshot) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      elevation={snapshot.isDragging ? 6 : 1}
                      style={{
                        userSelect: 'none',
                        padding: 16,
                        margin: '0 0 8px 0',
                        backgroundColor: snapshot.isDragging ? '#fafafa' : '#ffffff',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <Typography>{lead.name}</Typography>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default LeadKanbanBoard;