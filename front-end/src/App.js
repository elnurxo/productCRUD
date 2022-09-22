import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from 'axios';

function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ pt: "58px" }}>
        <Routes>
          
        </Routes>
      </Box>
    </>
  );
}

export default App;
