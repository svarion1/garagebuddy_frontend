import React, { useState } from "react";
import {
  Container,
  Box,
  Table,
  TableBody,
  
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import { backendURL } from "./ItemCard";
import MobileInventoryCard from "./MobileInventoryCard"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from '@emotion/styled'


const FilteredInventoryList = ({ items = [], fetchItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleNavigate = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  // Extract unique categories and locations for filters
  const categories = [
    "all",
    ...new Set(items.map((item) => item.category).filter(Boolean)),
  ];
  const locations = [
    "all",
    ...new Set(items.map((item) => item.location_tag).filter(Boolean)),
  ];
  const colorTags = {
    "#ff6161": "wall closet", // Red
    "#ffffff": "surfaces", // White
    "#003906": "square table", // Dark green
    "#0c5b01": "green closet", // Dark green
    "#a8fff3": "bathroom", // Light blue
    "#e3be72": "beige closet", // Beige
    "#0e0eac": "old kitchen", // Dark blue
    "#edfc8b": "floor", // Light yellow
  };
  // Reverse mapping for easier color lookup
  const locationColors = Object.entries(colorTags).reduce(
    (acc, [color, location]) => {
      acc[location.toLowerCase().trim()] = color;
      return acc;
    },
    {}
  );
  // Get contrasting text color for background
  const getContrastText = (bgColor) => {
    // Convert hex to RGB
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#ffffff";
  };


  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

  const getLocationColor = (location) => {
    if (!location) return { bg: "#e0e0e0", text: "#000000" };
    const normalizedLocation = location.toLowerCase();
    console.log("Searching color for:", normalizedLocation);
    const bgColor = locationColors[normalizedLocation] || "#e0e0e0";
    console.log("Found color:", bgColor);
    console.log("Location colors mapping:", locationColors);
    return {
      bg: bgColor,
      text: getContrastText(bgColor),
    };
  };

  // Filter items based on search term and selected filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesLocation =
      locationFilter === "all" || item.location_tag === locationFilter;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleDeleteItem = (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    axios
      .delete(`/items/${itemId}`)
      .then(() => {
        fetchItems();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <Container sx={{ maxWidth: "lg", mx: "auto", p: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
          Inventory
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: 12,
                top: 18,
                width: 20,
                height: 20,
                color: "#666",
              }}
            />
            <TextField
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              InputProps={{
                sx: { pl: 5 },
              }}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              label="Location"
            >
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor: getLocationColor(loc.toLowerCase()).bg,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    />
                    {loc.charAt(0).toUpperCase() + loc.slice(1)}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box>
        {isMobile ? (
          filteredItems.map((item) => (
            <MobileInventoryCard
              key={item.id}
              item={item}
              handleDeleteItem={handleDeleteItem}
              handleNavigate={handleNavigate}
              getLocationColor={getLocationColor}
            />
          ))
        ) : (
          // If not on mobile, keep the table layout (not included here for brevity)
          <TableContainer
          component={Paper}
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            overflowX: "auto", // Enable horizontal scrolling for the table
            overflow: isMobile ? "auto" : "hidden", // Adjust overflow for mobile
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                {!isMobile && <StyledTableCell>Image</StyledTableCell>}{" "}
                {/* Hide column on mobile */}
                <StyledTableCell>Name</StyledTableCell>
                {!isMobile && <StyledTableCell>Category</StyledTableCell>}{" "}
                {/* Hide on mobile */}
                <StyledTableCell>Location</StyledTableCell>
                {!isMobile && <StyledTableCell>Description</StyledTableCell>}{" "}
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": { bgcolor: "grey.50" },
                    display:  "table-row", // Display as block on mobile
                  
                  }}
                >
                    <>
                      <TableCell>
                        <Avatar
                          src={
                            item.image_path
                              ? `${backendURL}/uploads/${item.image_path
                                  .split(/[\\/]/)
                                  .pop()}`
                              : "/api/placeholder/48/48"
                          }
                          sx={{ width: 48, height: 48 }}
                          variant="square"
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "medium" }}>
                        {item.name}
                      </TableCell>
                      <TableCell>
                        {item.category && (
                          <Chip
                            label={item.category}
                            sx={{
                              bgcolor: "primary.light",
                              color: "primary.dark",
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {item.location_tag && (
                          <Chip
                            label={item.location_tag}
                            sx={{
                              bgcolor: getLocationColor(item.location_tag).bg,
                              color: getLocationColor(item.location_tag).text,
                              "& .MuiChip-label": {
                                fontWeight: 500,
                              },
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.description}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteItem(item.id)}
                          sx={{
                            color: "error.main",
                            "&:hover": {
                              color: "error.dark",
                            },
                          }}
                        >
                          <DeleteIcon style={{ width: 20, height: 20 }} />
                        </IconButton>
                        <Box component={Link} to={`/items/${item.id}`}>
                          <IconButton
                            sx={{
                              color: "primary.light",
                              "&:hover": {
                                color: "primary.dark",
                              },
                            }}
                          >
                            <ArrowForwardIosIcon
                              style={{ width: 20, height: 20 }}
                            />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </>
                  
                </TableRow>
              ))}
         
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </Box>

    </Container>

    // <Container sx={{ maxWidth: "lg", mx: "auto", p: 4 }}>
    //   <Box sx={{ mb: 6 }}>
    //     <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
    //       Inventory Items
    //     </Typography>

    //     <Box
    //       sx={{
    //         display: "grid",
    //         gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
    //         gap: 2,
    //       }}
    //     >
    //       <Box sx={{ position: "relative" }}>
    //         <Search
    //           style={{
    //             position: "absolute",
    //             left: 12,
    //             top: 12,
    //             width: 20,
    //             height: 20,
    //             color: "#666",
    //           }}
    //         />
    //         <TextField
    //           placeholder="Search items..."
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           fullWidth
    //           InputProps={{
    //             sx: { pl: 5 },
    //           }}
    //         />
    //       </Box>

    //       <FormControl fullWidth>
    //         <InputLabel>Category</InputLabel>
    //         <Select
    //           value={categoryFilter}
    //           onChange={(e) => setCategoryFilter(e.target.value)}
    //           label="Category"
    //         >
    //           {categories.map((cat) => (
    //             <MenuItem key={cat} value={cat}>
    //               {cat.charAt(0).toUpperCase() + cat.slice(1)}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>

    //       <FormControl fullWidth>
    //         <InputLabel>Location</InputLabel>
    //         <Select
    //           value={locationFilter}
    //           onChange={(e) => setLocationFilter(e.target.value)}
    //           label="Location"
    //         >
    //           {locations.map((loc) => (
    //             <MenuItem key={loc} value={loc}>
    //               <Box
    //                 sx={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   gap: 1,
    //                 }}
    //               >
    //                 <Box
    //                   sx={{
    //                     width: 16,
    //                     height: 16,
    //                     borderRadius: "50%",
    //                     backgroundColor: getLocationColor(loc.toLowerCase()).bg,
    //                     border: "1px solid rgba(0,0,0,0.1)",
    //                   }}
    //                 />
    //                 {loc.charAt(0).toUpperCase() + loc.slice(1)}
    //               </Box>
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    //     </Box>
    //   </Box>

    //   <TableContainer
    //     component={Paper}
    //     sx={{
    //       boxShadow: 1,
    //       borderRadius: 2,
    //       overflow: "hidden",
    //     }}
    //   >
    //     <Table>
    //       <TableHead>
    //         <TableRow sx={{ bgcolor: "grey.50" }}>
    //           <TableCell>Image</TableCell>
    //           <TableCell>Name</TableCell>
    //           <TableCell>Category</TableCell>
    //           <TableCell>Location</TableCell>
    //           <TableCell>Description</TableCell>
    //           <TableCell>Actions</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {filteredItems.map((item) => (
    //           <TableRow
    //             key={item.id}
    //             sx={{ "&:hover": { bgcolor: "grey.50" } }}
    //           >
    //             <TableCell>
    //               <Avatar
    //                 src={
    //                   item.image_path
    //                     ? `${backendURL}/uploads/${item.image_path
    //                         .split(/[\\/]/)
    //                         .pop()}`
    //                     : "/api/placeholder/48/48"
    //                 }
    //                 sx={{ width: 48, height: 48 }}
    //                 variant="square"
    //               />
    //             </TableCell>
    //             <TableCell sx={{ fontWeight: "medium" }}>{item.name}</TableCell>
    //             <TableCell>
    //               {item.category && (
    //                 <Chip
    //                   label={item.category}
    //                   sx={{
    //                     bgcolor: "primary.light",
    //                     color: "primary.dark",
    //                   }}
    //                 />
    //               )}
    //             </TableCell>
    //             <TableCell>
    //               {item.location_tag && (
    //                 <Chip
    //                   label={item.location_tag}
    //                   sx={{
    //                     bgcolor: getLocationColor(item.location_tag).bg,
    //                     color: getLocationColor(item.location_tag).text,
    //                     "& .MuiChip-label": {
    //                       fontWeight: 500,
    //                     },
    //                   }}
    //                 />
    //               )}
    //             </TableCell>
    //             <TableCell
    //               sx={{
    //                 maxWidth: "300px",
    //                 overflow: "hidden",
    //                 textOverflow: "ellipsis",
    //                 whiteSpace: "nowrap",
    //               }}
    //             >
    //               {item.description}
    //             </TableCell>
    //             <TableCell>
    //               <IconButton
    //                 onClick={() => handleDeleteItem(item.id)}
    //                 sx={{
    //                   color: "error.main",
    //                   "&:hover": {
    //                     color: "error.dark",
    //                   },
    //                 }}
    //               >
    //                 <DeleteIcon style={{ width: 20, height: 20 }} />
    //               </IconButton>
    //               <Box component={Link} to={`/items/${item.id}`}>
    //                 <IconButton
    //                   sx={{
    //                     color: "primary.light",
    //                     "&:hover": {
    //                       color: "primary.dark",
    //                     },
    //                   }}
    //                 >
    //                   <ArrowForwardIosIcon style={{ width: 20, height: 20 }} />
    //                 </IconButton>
    //               </Box>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Container>
  );
};

export default FilteredInventoryList;
