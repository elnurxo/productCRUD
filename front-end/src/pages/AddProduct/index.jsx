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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/categories")
      .then((res) => setCategories(res.data));
  }, []);
  const formik = useFormik({
    initialValues: {
      categoryId: "",
      name: "",
      unitPrice: 0,
      unitsInStock: 0,
      discounted: false,
      quantityPerUnit: "",
    },
    validationSchema: Yup.object().shape({
      categoryId: Yup.string().required("Required"),
      name: Yup.string()
        .required("Required")
        .min(4, "must be at least 4 characters"),
      unitPrice: Yup.number().required("Required"),
      unitsInStock: Yup.number().required("Required"),
      discounted: Yup.bool().required("Required"),
      quantityPerUnit: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      axios
        .post("https://northwind.vercel.app/api/products", values)
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
            <Box sx={{ width: "60%", margin: "0 auto", marginBottom: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="categoryId"
                  id="categoryId"
                  label="Category"
                  {...formik.getFieldProps("categoryId")}
                  onChange={formik.handleChange}
                >
                  {categories?.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
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
                    label="Unit Price"
                    type="number"
                    name="unitPrice"
                    variant="outlined"
                    {...formik.getFieldProps("unitPrice")}
                  />
                  {formik.errors.unitPrice && (
                    <div>
                      <p
                        style={{
                          color: "tomato",
                          fontSize: "10px",
                          display: "block",
                        }}
                      >
                        {formik.errors.unitPrice}
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
              <Box>
                <TextField
                  style={{ width: "85%" }}
                  id="outlined-basic"
                  label="Units in Stock"
                  type="number"
                  name="unitsInStock"
                  variant="outlined"
                  {...formik.getFieldProps("unitsInStock")}
                />
                {formik.touched.unitsInStock && formik.errors.unitsInStock ? (
                  <div>
                    <p
                      style={{
                        color: "tomato",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      {formik.errors.unitsInStock}
                    </p>
                  </div>
                ) : null}
              </Box>
              <Box>
                <FormControlLabel
                  style={{
                    alignSelf: "left",
                    position: "absolute",
                    right: "18%",
                  }}
                  control={
                    <Checkbox
                      color="success"
                      name="discounted"
                      defaultChecked
                      {...formik.getFieldProps("discounted")}
                    />
                  }
                  label="Is Discounted"
                />
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
                  label="Quantity per Unit"
                  type="string"
                  name="quantityPerUnit"
                  variant="outlined"
                  {...formik.getFieldProps("quantityPerUnit")}
                />
                {formik.touched.quantityPerUnit &&
                formik.errors.quantityPerUnit ? (
                  <div>
                    <p
                      style={{
                        color: "tomato",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      {formik.errors.quantityPerUnit}
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
