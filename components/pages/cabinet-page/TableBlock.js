'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {  Box } from '@mui/material';

export default function TableBlock({tableData}) {
    const handleRequestClick = (tableData) => {
        alert(`Request contract for ${tableData}`);
    };

    const columns = [
        { field: 'carrier', headerName: 'Carrier', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'statusDate', headerName: 'Status Date', flex: 1 },
        { field: 'writingNo', headerName: 'Writing No', flex: 1 },
        { field: 'appointedStates', headerName: 'Appointed States', flex: 1 },
        { field: 'markets', headerName: 'Markets', flex: 1 },
        {
            field: 'requestContract',
            headerName: 'Request Contract',
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <button className="btn-secondary py-1" style={{fontSize: '14px'}} onClick={() => handleRequestClick(params.row)}>
                    Request
                </button>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: 1000 }}> {/* или больше, если нужно */}
                <DataGrid
                    autoHeight
                    rows={tableData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-footerContainer': {
                            justifyContent: 'space-between',
                            alignItems: 'center', // Выравнивает по центру
                            paddingLeft: 2,
                            paddingRight: 2,
                        },
                        '& .MuiTablePagination-root': {
                            alignItems: 'center',
                            display: 'flex',
                        },
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            marginTop: 0,
                            marginBottom: 0,
                            lineHeight: 'normal',
                        },
                        '& .MuiInputBase-root': {
                            marginTop: 0,
                            marginBottom: 0,
                        },
                    }}
                />
            </Box>
        </Box>
    );
}