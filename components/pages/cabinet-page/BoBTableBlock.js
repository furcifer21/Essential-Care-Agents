'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import RequestModal from "./RequestModal";
import {useEffect, useMemo, useState} from "react";
import {useCacheStore} from "../../storage";
import {formatDate} from "../../helper";

export default function BoBTableBlock({tableData, fetchData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const { usStates, usCarriers } = useCacheStore();
    const [formData, setFormData] = useState({
        name: '',
        markets: '',
        appointedStates: [],
    });
    const [selectedState, setSelectedState] = useState('');
    const [selectedCarrier, setSelectedCarrier] = useState('');

    // Фильтрация строк
    const filteredRows = useMemo(() => {
        let filteredData = tableData;
        if (selectedState) {
            filteredData = filteredData?.filter(row =>
              row.stateId === selectedState
            );
        }
        if (selectedCarrier) {
            filteredData = filteredData?.filter(row =>
                  row.carrierId === usCarriers[selectedCarrier]?.id
            );
        }
        return filteredData;
    }, [selectedState, selectedCarrier, tableData, usCarriers])

    const columns = [
        { field: 'consumerName', headerName: 'Consumer', flex: 1 },
        { field: 'carrier', headerName: 'Carrier', flex: 1 },
        { field: 'state', headerName: 'State', flex: 1 },
        { field: 'planName', headerName: 'Plan Name', flex: 1 },
        { field: 'signedDate', headerName: 'Signed', flex: 1,
            renderCell: (params) => params.row.signedDate? formatDate(params.row.signedDate) : ''
        },
        { field: 'effectiveDate', headerName: 'Effective date', flex: 1,
            renderCell: (params) => params.row.effectiveDate? formatDate(params.row.effectiveDate) : ''
        },
        { field: 'policyType', headerName: 'Status', flex: 1 }
    ];

/*
    const handleRequestClick = (rowData) => {
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
*/
    return (
        <>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 1000, paddingTop: 1 }}> {/* или больше, если нужно */}
                    <FormControl sx={{ mb: 2, mr:2, minWidth: 200 }}>
                        <InputLabel id="carrier-filter-label">Filter by Carrier</InputLabel>
                        <Select
                          labelId="carrier-filter-label"
                          value={selectedCarrier}
                          label="Filter by Carrier"
                          onChange={(e) => setSelectedCarrier(e.target.value)}
                        >
                            <MenuItem value="">All Carriers</MenuItem>
                            {usCarriers && Object.keys(usCarriers).map((id) => (
                              <MenuItem key={'carrier-' + id} value={id}>
                                  {usCarriers[id]['carrier_name']}
                              </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mb: 2, minWidth: 200 }}>
                        <InputLabel id="state-filter-label">Filter by State</InputLabel>
                        <Select
                          labelId="state-filter-label"
                          value={selectedState}
                          label="Filter by State"
                          onChange={(e) => setSelectedState(e.target.value)}
                        >
                            <MenuItem value="">All States</MenuItem>
                            {usStates && Object.keys(usStates).map((code) => (
                              <MenuItem key={'state-' + code} value={code}>
                                  {usStates[code]}
                              </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DataGrid
                        autoHeight
                        rows={filteredRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 25
                                }
                            },
                        }}
                        rowsPerPageOptions={[5, 10, 25]}
                        disableRowSelectionOnClick
                        filterMode="client"
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

            {/*<RequestModal*/}
            {/*    isOpen={isModalOpen}*/}
            {/*    onClose={handleCloseModal}*/}
            {/*    data={selectedRow}*/}
            {/*    formData={formData}*/}
            {/*    setFormData={setFormData}*/}
            {/*/>*/}
        </>
    );
}