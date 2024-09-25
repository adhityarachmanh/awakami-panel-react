import { AudiotrackOutlined } from "@mui/icons-material";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

interface AudioPreviewProps {
  src: string;
  audioStyle?: React.CSSProperties;
  sx?: SxProps<Theme>;
  handleSuccess?: () => void;
  handleError?: () => void;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({
  src,
  audioStyle,
  sx,
  handleSuccess,
  handleError,
}) => {
  const audioUrl = React.useMemo(() => {
    handleSuccess?.();
    if (src && /api\/v1\/files/.test(src)) {
      const supportedAudioExtensions = ["mp3", "wav", "ogg"];
      const isSupportedAudio = supportedAudioExtensions.some((ext) =>
        src.toLowerCase().endsWith(ext)
      );

      if (!isSupportedAudio) {
        handleError?.();
        console.error("Unsupported audio format");
        return null;
      }
      return `${import.meta.env.VITE_BASE_URL}/${src}`;
    } else {
      return src;
    }
  }, [src]);
  return audioUrl !== null ? (
    <Box component="audio" src={audioUrl} sx={sx} style={audioStyle} controls>
      Your browser does not support the audio element.
    </Box>
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
        ...audioStyle,
      }}
    >
      <AudiotrackOutlined
        fontSize="large"
        style={{ fontSize: "100px", color: "white" }}
      />
    </Box>
  );
};

export default AudioPreview;
