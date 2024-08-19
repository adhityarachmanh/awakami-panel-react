import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DownloadIcon from "@mui/icons-material/Download";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import PhotoIcon from "@mui/icons-material/Photo";

interface ImagePreviewProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  imageStyle?: React.CSSProperties;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  width = "100px",
  height = "100px",
  imageStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const handle = useFullScreenHandle();
  const [error, setError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setZoom(1.1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));

  useEffect(() => {
    setError(false);
  }, [src]);

  const handleDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = alt;
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(console.error);
  };

  const handleError = () => {
    setError(true);
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - startPosition.x,
        y: event.clientY - startPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      {!error ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onError={handleError}
          style={{ cursor: "pointer", borderRadius: "4px", ...imageStyle }}
          onClick={handleOpen}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            cursor: "pointer",
            borderRadius: "4px",
            width: "100%",
            height: "300px",
            backgroundColor: "lightgray",
          }}
        >
          <PhotoIcon
            fontSize="large"
            style={{ fontSize: "100px", color: "white" }}
          />
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            width: "auto",
          },
        }}
      >
        <FullScreen handle={handle}>
          <Box
            sx={{
              position: "relative",
              bgcolor: "background.paper",
              boxShadow: 24,
              width: "100%",
              height: "100%",
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10,
                color: "white",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                boxShadow: 0,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "hidden",
                height: "100%",
                backgroundColor: "#000", // Dark background color
              }}
            >
              <Box
                component="img"
                src={src}
                alt={alt}
                ref={imgRef}
                sx={{
                  transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`, // Apply zoom and position using transform
                  objectFit: "cover",
                  transition: isDragging ? "none" : "transform 0.3s",
                  cursor: isDragging ? "grabbing" : "grab", // Change cursor style
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  bgcolor: "white",
                  borderRadius: "8px",
                  px: 2,
                  boxShadow: 2,
                }}
              >
                <IconButton onClick={handleZoomIn}>
                  <ZoomInIcon />
                </IconButton>
                <IconButton onClick={handleZoomOut}>
                  <ZoomOutIcon />
                </IconButton>
                <IconButton onClick={handle.enter}>
                  <FullscreenIcon />
                </IconButton>
                <IconButton onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </FullScreen>
      </Dialog>
    </>
  );
};

export default ImagePreview;
