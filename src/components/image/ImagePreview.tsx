import React from "react";
import { useDialog } from "@/hooks/useDialog";

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
  width,
  height,
  imageStyle = {},
}) => {
  const { showDialog } = useDialog();
  const handleClickOpen = () => {
    showDialog(
      "Preview Image",
      () => {
        return (
          <img src={src} alt={alt} style={{ width: "100%", height: "100%" }} />
        );
      },
      {
        width: "lg",
      }
    );
  };

  return (
    <img
      onClick={handleClickOpen}
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      style={{ cursor: "pointer", objectFit: "cover", ...imageStyle }}
    />
  );
};

export default ImagePreview;
