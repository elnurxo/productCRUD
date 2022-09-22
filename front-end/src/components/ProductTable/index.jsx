import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Loading } from "../Loading";
import { QUERY_KEYS } from "../../query_keys";

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

function ProductTable() {
  const notify = () => {
    toast.success("Supplier deleted from API successfully!", {
      duration: 1800,
      position: "top-center",
      icon: "👏",
      theme: {
        primary: "green",
        secondary: "black",
      },
    });
  };

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("products", () =>
    axios.get("http://localhost:8080").then((res) => res.data)
  );
  console.log(data);

  return (
    <>
      <Loading condition={isLoading}>Products loading...</Loading>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          sx={{ marginTop: "50px", marginBottom: "50px", maxWidth: "80%" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Cost Price</StyledTableCell>
                <StyledTableCell align="right">Delete Product</StyledTableCell>
                <StyledTableCell align="right">Edit Product</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data
                  .sort((a, b) => a.id - b.id)
                  .map((item, key) => {
                    return (
                      <StyledTableRow key={key}>
                        <StyledTableCell align="right">
                          {item.data.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <img src={item.data.img} alt="" />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.data.price}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.data.costPrice}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button variant="outlined" color="error">
                            Delete
                          </Button>
                          <Toaster />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button variant="outlined" color="success">
                            Edit
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ProductTable;
