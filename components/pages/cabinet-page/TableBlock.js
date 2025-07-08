'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import RequestModal from "./RequestModal";
import {useMemo, useState} from "react";
import {useCacheStore} from "../../storage";

export default function TableBlock({tableData, fetchData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const { usStates } = useCacheStore();
    const [formData, setFormData] = useState({
        name: '',
        markets: '',
        appointedStates: [],
    });
    const [selectedState, setSelectedState] = useState('');

    // Фильтрация строк
    const filteredRows = useMemo(() => {
        if (!selectedState) return tableData;
        return tableData.filter(row =>
          row.appointedStates.split(',').includes(selectedState)
        );
    }, [selectedState, tableData])

    const stateFilterOperator = {
        label: 'contains state',
        value: 'containsState',
        getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) {
                return null;
            }
            return (value) => {
                if (!value) return false;
                return value.split(',').includes(filterItem.value);
            };
        },
        InputComponent: ({applyValue, item}) => {
            return (
              <Select
                value={item.value || ''}
                onChange={(e) => applyValue({...item, value: e.target.value})}
                size="small"
                sx={{minWidth: 150}}
              >
                  <MenuItem value="">All States</MenuItem>
                  {usStates && Object.keys(usStates).map((code) => (
                    <MenuItem key={code} value={code}>
                        {usStates[code]}
                    </MenuItem>
                  ))}
              </Select>
            );
        }
    }
    const columns = [
        { field: 'carrier', headerName: 'Carrier', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
              <span className={params.row.className} >{params.row.status}</span>
            ),
        },
        { field: 'statusDate', headerName: 'Status Date', flex: 1 },
        { field: 'writingNo', headerName: 'Writing No', flex: 1 },
        { field: 'appointedStates', headerName: 'Appointed States', flex: 1,
            filterOperators: [stateFilterOperator], // Привязываем кастомный фильтр
        },
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
                <Box sx={{ minWidth: 1000, paddingTop: 1 }}> {/* или больше, если нужно */}
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
                              <MenuItem key={code} value={code}>
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
                                    pageSize: 10
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