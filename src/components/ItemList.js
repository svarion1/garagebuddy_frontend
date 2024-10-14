import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid2  } from '@mui/material';
import ItemCard from './ItemCard';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Inventory Items
      </Typography>
      <Grid2 sx={{
          display: "flex",
          justifyContent: "center", // Center cards on mobile
        }} container spacing={2}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} fetchItems={fetchItems} />
        ))}
      </Grid2>
    </Container>
  );
};

export default ItemList;
