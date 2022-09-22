import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Box sx={{ pt: "58px" }}>
    <Routes>
    </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;
