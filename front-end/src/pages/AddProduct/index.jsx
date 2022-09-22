import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const AddProducts = () => {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://northwind.vercel.app/api/categories")
  //     .then((res) => setProducts(res.data));
  // }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      costPrice: 0,
      image: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Required")
        .min(4, "must be at least 4 characters"),
      price: Yup.number().required("Required").min(0, "price cannot be less than zero"),
      costPrice: Yup.number().required("Required"),
      image: Yup.object().required("Required"),
    }),
    onSubmit: async (values) => {
      axios
        .post("http://localhost:8080/post", values)
        .then((res) => console.log(res.data));
        notify();
        formik.resetForm();
    },
  });
  const notify = () => {
    toast.success('Product added to API Successfully!',{
      duration: 2666,
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
    <Box sx={{marginTop:'50px',display:'flex',justifyContent:'center'}}>
    <Box
        sx={{
          padding: "34px 0",
          width: "31%",
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Product Add Form</h2>
        <a
          style={{
            textAlign: "center",
            color: "black",
            display: "block",
            marginBottom: "10px",
          }}
          target="_blank"
          rel="noreferrer"
          href="https://northwind.vercel.app/api/products"
        >
          API link to check
        </a>
        <Formik>
          <Form
            onSubmit={formik.handleSubmit}
            style={{ padding: "10px 30px", position: "relative" }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <TextField
                  style={{ width: "90%" }}
                  id="outlined-basic"
                  label="Name"
                  type="text"
                  name="name"
                  variant="outlined"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>
                    <p
                      style={{
                        color: "tomato",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      {formik.errors.name}
                    </p>
                  </div>
                ) : null}
              </Box>

              <Box>
                <Box>
                  <TextField
                    style={{ width: "90%" }}
                    id="outlined-basic"
                    label="Price"
                    type="number"
                    name="price"
                    variant="outlined"
                    {...formik.getFieldProps("price")}
                  />
                  {formik.errors.price && (
                    <div>
                      <p
                        style={{
                          color: "tomato",
                          fontSize: "10px",
                          display: "block",
                        }}
                      >
                        {formik.errors.price}
                      </p>
                    </div>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Box sx={{display:'flex',justifyContent:'center',margin:'0 auto'}}>
                <TextField
                  style={{ width: "85%" }}
                  id="outlined-basic"
                  label="Cost Price"
                  type="number"
                  name="costPrice"
                  variant="outlined"
                  {...formik.getFieldProps("costPrice")}
                />
                {formik.touched.costPrice && formik.errors.costPrice ? (
                  <div>
                    <p
                      style={{
                        color: "tomato",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      {formik.errors.costPrice}
                    </p>
                  </div>
                ) : null}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Box>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  type="file"
                  name="image"
                  variant="outlined"
                  {...formik.getFieldProps("image")}
                />
                {formik.touched.image &&
                formik.errors.image ? (
                  <div>
                    <p
                      style={{
                        color: "tomato",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      {formik.errors.image}
                    </p>
                  </div>
                ) : null}
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "32px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="success"
                style={{ padding: "15px 20px" }}
              >
                Add Product to API
              </Button>
              <Toaster />
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
    </>
  );
};

export default AddProducts;
