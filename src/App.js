import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inventory</Link>
        <Link to="/add">Add Item</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<ItemForm />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
