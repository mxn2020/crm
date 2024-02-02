// frontend/src/components/tasks/TasksCalendar.jsx

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../services/api';

const localizer = momentLocalizer(moment);

function TasksCalendar() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        const mappedTasks = response.data.map(task => ({
          ...task,
          start: new Date(task.start),
          end: new Date(task.end),
        }));
        setTasks(mappedTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Calendar
      localizer={localizer}
      events={tasks}
      startAccessor="start"
      endAccessor="end"
      titleAccessor="name"
      style={{ height: 500 }}
    />
  );
}

export default TasksCalendar;