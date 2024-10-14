import React from "react";
// Import MUI components
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
 
  CardActionArea,
} from "@mui/material";
import Grid from '@mui/material/Grid2';

import DeleteIcon from "@mui/icons-material/Delete"; // Import Trash Icon
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import axios from "axios";
import { Link } from "react-router-dom";
 const getBackendURL = () => {
    const host = window.location.hostname;

    // If localhost, use local backend
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:5000";
    }

    // Otherwise, use the current host's IP
    return `http://${host}:5000`;
  };
  
export const backendURL = getBackendURL();
const ItemCard = ({ item, fetchItems }) => {
  // Function to get the backend URL dynamically
  
  const handleDeleteItem = (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    axios
      .delete(`/items/${itemId}`)
      .then((response) => {
        alert("Item has been deleted.");
        fetchItems();
      })
      .catch((error) => {
        console.error("There was an error deleting the item!", error);
        alert("Failed to delete the item. Please try again.");
      });
  };
  const placeholderImage =
  "https://th.bing.com/th/id/OIP.sWCvltMZF_s3mjA5sL-RdgHaE8?rs=1&pid=ImgDetMain";
  return (

    

    <Grid
      item
      size={{ xs: 12, md: 8 }}
      sx={{
        maxWidth: { xs: "100%", sm: "100%", md: "33%" }, // Ensure 1 card per row on mobile, 3 on desktop
        margin: "0 auto", // Center align card on mobile
      }}
      key={item.id}
    >
 <Box
      display="flex"
      p={1.5}
      gap={2}
      bgcolor={"#f5f5f5"}
      borderRadius={4}
      sx={{ alignItems: "center" }}
    >
      <Box component={Link} to={`/items/${item.id}`}>
        <Avatar
          src={
            item.image_path
              ? `${backendURL}/uploads/${item.image_path.split(/[\\/]/).pop()}`
              : placeholderImage
          }
          sx={{ borderRadius: 0, width: 48, height: 48 }}
        />
      </Box>
      <Box>
      <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
      </Box>
      <Box ml={1}>
        <StyledIconButton size="small" onClick={() => handleDeleteItem(item.id)}
          aria-label="delete"
          sx={{ alignSelf: { xs: "center", md: "flex-end" } }}
        >
          <DeleteIcon />
        </StyledIconButton>
      </Box>
    </Box>
      {/* <Card sx={{ display: "flex", flexDirection: { xs: "row", md: "column" },   }}>
        <CardActionArea sx={{display:"flex", flexDirection: "row", flexGrow: 1}} component={Link} to={`/items/${item.id}`}>
          <CardMedia
            component="img"
            height="140"
            image={
              item.image_path
                ? `${backendURL}/uploads/${item.image_path.split(/[\\/]/).pop()}`
                : placeholderImage
            }
            alt={item.name}
            sx={{
              width: { xs: 50, md: "100%" }, // Make it smaller on mobile, full width on desktop
              height: { xs: 50, md: 200 }, // Square image on mobile, rectangular on desktop
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          color="error"
          onClick={() => handleDeleteItem(item.id)}
          aria-label="delete"
          sx={{ alignSelf: { xs: "center", md: "flex-end" } }}
        >
          <DeleteIcon />
        </IconButton>
      </Card> */}
    </Grid>
  );
};



const titleFontSize = "1rem";
const subtitleFontSize = "0.75rem";
const family = "'Open Sans', sans-serif";

const tutorInfoStyles = () => ({
  title: {
    fontFamily: family,
    color: "#4d4b5f",
    fontSize: titleFontSize,
    lineHeight: 1.2,
    fontWeight: 700,
    marginBottom: "0.125rem",
  },
  subtitle: {
    fontFamily: family,
    color: "#696c6f",
    fontWeight: 500,
    fontSize: subtitleFontSize,
    lineHeight: 1.4,
  },
});

const StyledIconButton = styled(IconButton)(() => ({
  backgroundColor: "#fff",
  boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
  color: "rgba(0, 0, 0, 0.54)",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
  },
}));


export default ItemCard;
