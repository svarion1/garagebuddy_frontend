import React from "react";
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MobileInventoryCard = ({
  item,
  handleDeleteItem,
  handleNavigate,
  getLocationColor,
}) => {
  const { name, image_path, id } = item;

  return (
    <Card sx={{ display: "flex", width: "100%", mb: 2 }}>
      {/* Avatar Section */}
      <Box sx={{ display: "flex", alignItems: "center", p: 0 }}>
        <Avatar
          src={image_path}
          alt={name}
          sx={{
            width: 64,
            height: "100%",
            bgcolor: "#B4B4B4FF", // Background color if no image
          }}
          variant="square"
        />
      </Box>

      {/* Content Section */}
      <CardContent
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {name}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {item.category && (
            <Chip
              label={item.category}
              sx={{
                bgcolor: "primary.light",
                color: "primary.dark",
              }}
            />
          )}
          {item.location_tag && (
            <Chip
              label={item.location_tag}
              key={item.id}
              sx={{
                bgcolor: getLocationColor(item.location_tag).bg,
                color: getLocationColor(item.location_tag).text,
              }}
            />
          )}
        </Box>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          gap: 1,
        }}
      >
        <IconButton
          onClick={() => handleDeleteItem(id)}
          sx={{
            bgcolor: "#F83131FF",
            color: "#fff",
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleNavigate(id)}
          sx={{
            color: "primary.light",
            "&:hover": {
              color: "primary.dark",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default MobileInventoryCard;
