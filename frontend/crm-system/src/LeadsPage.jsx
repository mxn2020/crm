import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        // Fetch leads from your API
        fetch('http://localhost:5000/api/leads')
            .then(response => response.json())
            .then(data => setLeads(data))
            .catch(error => console.error("Fetching leads failed", error));
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        // Add other fields as needed
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={leads}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default LeadsPage;
