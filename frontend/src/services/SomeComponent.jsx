import React, { useEffect, useState } from 'react';
import api from './api'; // Adjust the import path based on where you save api.js

const SomeComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/some-endpoint');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Render your component using the fetched data
};
