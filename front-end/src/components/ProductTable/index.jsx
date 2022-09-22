import React, {useState} from "react";
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
  const { error, data } = useQuery("products", () =>
    axios.get("http://localhost:8080").then((res) => res.data)
  );

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/delete/${id}`);
  };

  // const handleEdit = () => {
  //   const product = {
  //     name: "",
  //     price: 0,
  //     costPrice: 0,
  //     image: "",
  //   };

  //   axios
  //     .put(
  //       "http://dummy.restapiexample.com/api/v1/update/{this.state.id}",
  //       product
  //     )
  //     .then((res) => console.log(res.data));
  // };

  return (
    <>
    {loading ? (
        <Box
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "75vh",
        }}
      >
        <ReactBootStrap.Spinner animation="grow" />
      </Box>
    ):(
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          sx={{ marginTop: "50px", marginBottom: "50px", maxWidth: "80%" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Cost Price</StyledTableCell>
                <StyledTableCell align="center">Delete Product</StyledTableCell>
                <StyledTableCell align="center">Edit Product</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data
                  .sort((a, b) => a.id - b.id)
                  .map((item, key) => {
                    return (
                      <StyledTableRow key={key}>
                        <StyledTableCell align="center">
                          {item.data.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <img src={item.data.img} alt="" />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.data.price}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.data.costPrice}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                          <Toaster />
                        </StyledTableCell>
                        <StyledTableCell align="center">
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
      </div>)}
    </>
  )
}

export default ProductTable;
