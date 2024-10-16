import React, { useState } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";
import { TextField, Button, Container, Typography, Grid2 , Stack } from "@mui/material";

const ItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ x: null, y: null, tag: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);
    if (location.x !== null) {
      formData.append("location_x", location.x);
      formData.append("location_y", location.y);
    }
    formData.append("location_tag", location.tag);
    axios
      .post("/items", formData)
      .then((response) => {
        alert("Item added successfully!");
        // Reset form or redirect as needed
      })
      .catch((error) => {
        console.error("There was an error adding the item!", error);
      });
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" gutterBottom className="mb-6">
        Add New Item
      </Typography>
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid2 container spacing={4}>
          {/* Map Section */}
          <Grid2 item xs={12} md={6} lg={7}>
            <div className="sticky top-4">
              <Typography variant="h6" gutterBottom>
                Select Location on Map
              </Typography>
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <MapComponent onLocationSelect={setLocation} />
              </div>
              {location.tag && (
                <Typography className="mt-2 text-sm text-gray-600">
                  Selected area: {location.tag}
                </Typography>
              )}
            </div>
          </Grid2>

          {/* Form Fields Section */}
          <Grid2 item xs={12} md={6} lg={5}>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Stack spacing={3} xs={12}>
                <TextField
                  label="Item Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Category"
                  variant="outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                />

                <div>
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth
                    className="mb-2"
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
                      Selected file: {image.name}
                    </Typography>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Add Item
                </Button>
              </Stack>
            </div>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};

export default ItemForm;
