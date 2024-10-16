import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <Router>
 <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          display: "flex",
          gap: 1,
          zIndex: 1000, // Ensures buttons are above other content
        }}
      >
        <IconButton
          component={Link}
          to="/"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="/add"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<ItemForm />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
