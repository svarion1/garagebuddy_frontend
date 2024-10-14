import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MapComponent from './MapComponent';
import { backendURL } from './ItemCard';
import { Card, CardContent, CardMedia, Typography, Container, Grid2 } from '@mui/material';

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    axios.get(`/items/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the item!', error);
      });
  }, [id]);

  if (!item) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={6}>
          <Card>
            {item.image_path && (
              <CardMedia
                component="img"
                height="300"
                image={`${backendURL}/uploads/${item.image_path.split(/[\\/]/).pop()}`}
                alt={item.name}
              />
            )}
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <Typography variant="h6" component="div" gutterBottom>
            Location on Map:
          </Typography>
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
            <MapComponent location={{ x: item.location_x, y: item.location_y }} readOnly={true} />
          </div>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ItemDetail;