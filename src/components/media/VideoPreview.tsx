import { VideoSettingsOutlined } from "@mui/icons-material";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface VideoPreviewProps {
  src: string;
  videoStyle?: React.CSSProperties;
  sx?: SxProps<Theme>;
  handleSuccess?: () => void;
  handleError?: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  src,
  videoStyle,
  sx,
  handleSuccess,
  handleError,
}) => {
  const videoUrl = React.useMemo(() => {
    handleSuccess?.();
    if (src && /api\/v1\/files/.test(src)) {
      const supportedVideoExtensions = ["mp4", "webm", "ogg"];
      const isSupportedVideo = supportedVideoExtensions.some((ext) =>
        src.toLowerCase().endsWith(ext)
      );

      if (!isSupportedVideo) {
        handleError?.();
        console.error("Unsupported video format");
        return null;
      }
      return `${import.meta.env.VITE_BASE_URL}/${src}`;
    } else {
      return src;
    }
  }, [src]);
  return  videoUrl !== null ? (
  
    <MediaPlayer
      title={import.meta.env.VITE_BRAND_NAME}
      src={videoUrl}
      style={{
        ...videoStyle
      }}
    >
      <MediaProvider />
      <DefaultVideoLayout
        thumbnails={`${import.meta.env.VITE_BASE_URL}/${src}`}
        icons={defaultLayoutIcons}
        />
      </MediaPlayer>
 
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        cursor: "pointer",
        borderRadius: "4px",
        width: "100%",
        height: "100%",
        backgroundColor: "lightgray",
        ...videoStyle,
      }}
    >
      <VideoSettingsOutlined
        fontSize="large"
        style={{ fontSize: "100px", color: "white" }}
      />
    </Box>
  );
};

export default VideoPreview;
