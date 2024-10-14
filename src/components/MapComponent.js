import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Circle } from "react-konva";
import useImage from "use-image";

const colorTags = {
  "#ff6161": "wall closet", // Red
  "#ffffff": "surfaces", // Green
  "#003906": "square table", // dark green
  "#0c5b01": "green closet", // dark green
  "#a8fff3": "bathroom", // dark green
  "#e3be72": "beige closet", // dark green
  "#0e0eac": "old kitchen", // dark green
  "#edfc8b": "floor", // dark green
  // Add more colors as needed
};

const MapComponent = ({ onLocationSelect, location, readOnly = false }) => {
  const [mapImage] = useImage("/garage_map.png");
  const [pointer, setPointer] = useState(location || null);
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: 0,
  });
  const canvasRef = useRef(null);

  // Resize stage based on screen width (full-width on mobile, 60% on desktop)
  useEffect(() => {
    const updateStageSize = () => {
      if (mapImage) {
        const imageWidth = mapImage.width;
        const imageHeight = mapImage.height;

        const isMobile = window.innerWidth <= 768;
        const maxWidth = isMobile
          ? window.innerWidth * 0.85
          : window.innerWidth * 0.6;

        const scale = maxWidth / imageWidth;
        const newHeight = imageHeight * scale;

        setStageSize({
          width: maxWidth,
          height: newHeight,
        });
      }
    };

    updateStageSize();
    window.addEventListener("resize", updateStageSize);

    return () => window.removeEventListener("resize", updateStageSize);
  }, [mapImage]);

  // Draw the image on the hidden canvas for color detection
  useEffect(() => {
    if (mapImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(mapImage, 0, 0);
    }
  }, [mapImage]);

  // Get color at the clicked point for tagging
  const getColorAtPoint = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = imageData;
    const hex = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    return hex;
  };

  // Function to handle click or touch events
  const handlePointerDown = (e) => {
    if (readOnly) return;

    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      const { x, y } = pointerPosition;

      // Normalize the coordinates based on the image size
      const normalizedX = x / stageSize.width; // Relative X coordinate (0 to 1)
      const normalizedY = y / stageSize.height; // Relative Y coordinate (0 to 1)

      setPointer({ x: normalizedX, y: normalizedY });

      const color = getColorAtPoint(x, y);
      const tag = colorTags[color.toLowerCase()] || "Unknown";

      if (onLocationSelect) {
        // Send normalized coordinates to the parent component
        onLocationSelect({ x: normalizedX, y: normalizedY, tag });
      }
    }
  };

  if (!mapImage) {
    return <div>Loading map...</div>;
  }

  // Convert normalized coordinates to pixel values for display
  const displayX = pointer ? pointer.x * stageSize.width : null;
  const displayY = pointer ? pointer.y * stageSize.height : null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width={mapImage.width}
        height={mapImage.height}
      />
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handlePointerDown} // Handle mouse clicks
        onTouchStart={handlePointerDown} // Handle touch events on mobile
        ref={stageRef}
      >
        <Layer>
          <KonvaImage
            image={mapImage}
            width={stageSize.width}
            height={stageSize.height}
          />
          {pointer && (
            <Circle
            x={displayX}
            y={displayY}
              radius={5}
              border="2px solid black"
              fill="red"
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default MapComponent;
