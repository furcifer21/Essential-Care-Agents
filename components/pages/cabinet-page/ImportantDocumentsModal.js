'use client'
import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useRouter} from "next/navigation";
import {
  AGREEMENTS_FEE_PDF_API_URL,
  AGREEMENTS_PRODUCER_PDF_API_URL,
  IMPORTANT_DOCUMENTS_API_URL
} from "../../constants";


export default function ImportantDocumentsModal({ isOpen, onClose, tableData}) {
    const router = useRouter();
    if (!isOpen) return null;

    const columns = [
        { field: 'documentName', headerName: 'Document name', width:640 ,cellClassName: 'fw-bolder', editable: false },
    ];

    const handleRowClick = (params, event, details) => {
      const link = document.createElement('a');
      link.href = IMPORTANT_DOCUMENTS_API_URL + params?.row?.documentName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="agreements-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>EssentialCare Important Documents</h2>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                    <Box>
                        <DataGrid
                          rows={tableData}
                          columns={columns}
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
