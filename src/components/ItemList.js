import React, { useEffect, useState } from "react";
import axios from "axios";
import FilteredInventoryList from './FilteredInventoryList';

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
    <FilteredInventoryList items={items} fetchItems={fetchItems} />
  );
};

export default ItemList;
