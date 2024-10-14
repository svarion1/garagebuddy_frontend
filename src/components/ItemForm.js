import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid2,
  } from '@mui/material';
  
  const ItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState({ x: null, y: null, tag: null });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      if (image) formData.append('image', image);
      if (location.x !== null) {
        formData.append('location_x', location.x);
        formData.append('location_y', location.y);
        formData.append('location_tag', location.tag);
      }
  
      axios.post('/items', formData)
        .then(response => {
          alert('Item added successfully!');
          // Reset form or redirect as needed
        })
        .catch(error => {
          console.error('There was an error adding the item!', error);
        });
    };
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Add New Item
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Location on Map
              </Typography>
              <MapComponent onLocationSelect={setLocation} />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                label="Item Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                
                rows={1}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  capture="camera"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
              {image && (
                <Typography variant="body2" color="textSecondary">
                  {image.name}
                </Typography>
              )}
            </Grid2>
            
            <Grid2 item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Add Item
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Container>
    );
  };
  
  export default ItemForm;