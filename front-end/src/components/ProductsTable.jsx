import React, { useEffect, useState } from "react";
import { supplierNetwork } from "../network/requests/supplierNetwork";  
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import * as ReactBootStrap from "react-bootstrap";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function SupplierTable() {
  const notify = () => {
    toast.success('Supplier deleted from API successfully!',{
      duration: 1800,
      position: "top-center",
      icon: '👏',
      theme: {
        primary: 'green',
        secondary: 'black',
      }
    });
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{marginTop:'50px',marginBottom:'50px',maxWidth:'80%'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Supplier ID</StyledTableCell>
              <StyledTableCell align="right">Company Name</StyledTableCell>
              <StyledTableCell align="right">Contact Name</StyledTableCell>
              <StyledTableCell align="right">Contact Title</StyledTableCell>
              <StyledTableCell align="right">
                  Delete Supplier
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
          {suppliers &&
            suppliers
              .sort((a, b) => a.id - b.id)
              .map((item, key) => {
                return (
                  <StyledTableRow key={key}>
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.contactName}</StyledTableCell>
                  <StyledTableCell align="right">{item.contactTitle}</StyledTableCell>
                  <StyledTableCell align="right">
                      <Button variant="outlined" color="error"
                        onClick={() => {
                          deleteSupplier(item.id);
                          notify();
                        }}
                      >
                          Delete
                      </Button>
                      <Toaster/>
                  </StyledTableCell>
                </StyledTableRow>
                );
              })}
          </TableBody> */}
        </Table>
      </TableContainer>
      </div>
    </>
  );
}

export default SupplierTable;
