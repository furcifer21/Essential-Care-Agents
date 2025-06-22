'use client'
import React from 'react';
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useRouter} from "next/navigation";


export default function AgreementsModal({ isOpen, onClose, tableData}) {
    const router = useRouter();
    if (!isOpen) return null;


    const columns = [
        { field: 'agreementType', headerName: 'Agreement type', width: 300, cellClassName: 'fw-bolder', editable: false },
        { field: 'agreementNo', headerName: 'Agreement No', width: 170, cellClassName: 'text-end' },
        { field: 'agreementDate', headerName: 'Agreement Date', width: 180, cellClassName: 'text-end' },
    ];

    const handleRowClick = (params, event, details) => {
      if(params.id === 'user-producer-agreement') {
        router.push('/cabinet/my-producer-agreement');
      }
      else if(params.id === 'user-fee-agreement') {
        router.push('/cabinet/my-fee-agreement');
      }
    }


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="agreements-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>My Agreements with Essential81</h2>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                    <Box>
                        <DataGrid
                          rows={tableData}
                          columns={columns}
                          pageSize={3}
                          onRowClick={handleRowClick}
                          disableRowSelectionOnClick={true}
                          sx={{
                              '& .MuiDataGrid-columnHeaderTitle': {
                                  paddingBottom: '2px',
                              },
                              '& .MuiDataGrid-row': {
                                  cursor: 'pointer',
                              },
                              '& .MuiDataGrid-cell:focus': {
                                outline: 'none',
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
            </div>
        </div>
    );
}
