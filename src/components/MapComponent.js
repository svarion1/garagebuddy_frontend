import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Circle, Text, Rect } from "react-konva";
import useImage from "use-image";

export const colorTags = {
  "#ff6161": "wall closet", // Red
  "#ffffff": "surfaces", // White
  "#003906": "square table", // Dark green
  "#0c5b01": "green closet", // Dark green
  "#a8fff3": "bathroom", // Light blue
  "#e3be72": "beige closet", // Beige
  "#0e0eac": "old kitchen", // Dark blue
  "#edfc8b": "floor", // Light yellow
};

const MapComponent = ({ onLocationSelect, location, readOnly = false }) => {
  const [mapImage] = useImage("/garage_map.png");
  const [pointer, setPointer] = useState(location || null);
  const [debugInfo, setDebugInfo] = useState(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: 0,
  });

  // Resize stage based on screen width
  useEffect(() => {
    const updateStageSize = () => {
      if (mapImage) {
        const imageWidth = mapImage.width;
        const imageHeight = mapImage.height;
        const isMobile = window.innerWidth <= 768;
        const maxWidth = isMobile
          ? window.innerWidth * 0.85
          : window.innerWidth * 0.4;
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
      // Scale the canvas to match the original image dimensions
      canvas.width = mapImage.width;
      canvas.height = mapImage.height;
      ctx.drawImage(mapImage, 0, 0);
    }
  }, [mapImage]);

  // Get color at the clicked point
  const getColorAtPoint = (stageX, stageY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    // Convert stage coordinates to original image coordinates
    const scaleX = mapImage.width / stageSize.width;
    const scaleY = mapImage.height / stageSize.height;
    const imageX = Math.floor(stageX * scaleX);
    const imageY = Math.floor(stageY * scaleY);

    // Ensure coordinates are within bounds
    if (
      imageX < 0 ||
      imageX >= mapImage.width ||
      imageY < 0 ||
      imageY >= mapImage.height
    ) {
      console.log("Coordinates out of bounds:", { imageX, imageY });
      return null;
    }

    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(imageX, imageY, 1, 1).data;
    const [r, g, b] = pixel;
    const hex = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return {
      hex,
      rgb: { r, g, b },
      coordinates: { imageX, imageY, stageX, stageY },
    };
  };

  const handlePointerDown = (e) => {
    if (readOnly) return;

    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      const { x, y } = pointerPosition;
      const colorInfo = getColorAtPoint(x, y);

      if (colorInfo) {
        const { hex, rgb, coordinates } = colorInfo;
        const tag = colorTags[hex.toLowerCase()] || "Unknown";

        // Update debug info
        setDebugInfo({
          hex,
          rgb,
          tag,
          coordinates,
        });

        console.log("Color Detection Debug:", {
          hex,
          rgb,
          tag,
          coordinates,
          availableTags: colorTags,
        });

        // Normalize coordinates
        const normalizedX = x / stageSize.width;
        const normalizedY = y / stageSize.height;

        setPointer({ x: normalizedX, y: normalizedY });

        if (onLocationSelect) {
          onLocationSelect({ x: normalizedX, y: normalizedY, tag });
        }
      }
    }
  };

  if (!mapImage) {
    return <div>Loading map...</div>;
  }

  const displayX = pointer ? pointer.x * stageSize.width : null;
  const displayY = pointer ? pointer.y * stageSize.height : null;

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        ref={stageRef}
      >
        <Layer>
          <KonvaImage
            image={mapImage}
            width={stageSize.width}
            height={stageSize.height}
          />
          {pointer && (
            <>
              <Circle
                x={displayX}
                y={displayY}
                radius={5}
                stroke="black"
                strokeWidth={1}
                fill="red"
              />
              {debugInfo && (
                <><Rect
                x={displayX + 10}
                y={displayY + 10}
                fill="#0000008C"
               
                height={50}
                width={150}
                />
                  <Text
                    x={displayX + 10}
                    y={displayY + 10}
                    text={`Color: ${debugInfo.hex}
Tag: ${debugInfo.tag}
RGB: (${debugInfo.rgb.r}, ${debugInfo.rgb.g}, ${debugInfo.rgb.b})`}
                    fontSize={12}
                    fill="white"
                    backgroundColor="white"
                    padding={5}
                  />
               </>
              )}
            </>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default MapComponent;
