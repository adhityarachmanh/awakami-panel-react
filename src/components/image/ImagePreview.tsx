import React, { useState } from "react";
import { Modal, Box, IconButton, Dialog, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DownloadIcon from "@mui/icons-material/Download";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setZoom(1.1);
  };

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));

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

  return (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ cursor: "pointer", borderRadius: "4px", ...imageStyle }}
        onClick={handleOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: { backgroundColor: "transparent", boxShadow: "none" },
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
                sx={{
                  transform: `scale(${zoom})`, // Apply zoom using transform
                  objectFit: "cover",
                  transition: "transform 0.3s",
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
