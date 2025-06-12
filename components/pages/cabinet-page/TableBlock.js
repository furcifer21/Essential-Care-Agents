'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {  Box } from '@mui/material';
import RequestModal from "./RequestModal";
import {useState} from "react";

export default function TableBlock({tableData, fetchData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        markets: '',
        appointedStates: [],
    });
    const columns = [
        { field: 'carrier', headerName: 'Carrier', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
              <span style={{color: params.row.status === 'Available' ? 'green' : 'inherit'}}>{params.row.status}</span>
            ),
        },
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
                <button
                  className={`btn-secondary py-1 ${params.row.status !== 'Available'?'disabled':''}`}
                  style={{
                      fontSize: '14px',
                  }}
                  onClick={() => handleRequestClick(params.row)}>
                    Request
                </button>
            ),
        },
    ];

    const handleRequestClick = (rowData) => {
        console.log(rowData);
        setSelectedRow(rowData);
        setFormData({
            carrierId: rowData.id?.replace('0-',''),
            name: '',
            markets: rowData.markets.split(',')[0]?.trim() || '',
            appointedStates: rowData.appointedStates?.split(',').map((s) => s.trim()) || [],
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
        fetchData();
    };

    return (
        <>
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

            <RequestModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={selectedRow}
                formData={formData}
                setFormData={setFormData}
            />
        </>
    );
}