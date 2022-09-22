import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ pt: "58px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<Products />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
