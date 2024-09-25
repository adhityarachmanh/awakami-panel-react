import { VideoSettingsOutlined } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import VideoPreview from "../media/VideoPreview";

interface FormikVideoFieldProps<T> {
  name: keyof T;
  defaultSource?: string | null;
  disabled?: boolean;
  label?: string;

  variant?: "outlined" | "filled" | "standard";

  fullWidth?: boolean;

  margin?: "none" | "dense" | "normal";

  videoStyle?: CSSProperties;
}

const FormikVideoField = <T,>({
  name,
  label = "Video",
  defaultSource,
  variant = "outlined",
  disabled = false,
  fullWidth = true,
  margin = "none",
  videoStyle = { width: "100%", height: "300px" },
}: FormikVideoFieldProps<T>) => {
  const { touched, errors, values, setFieldValue } = useFormikContext<T>();
  const [errorVideo, setErrorVideo] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalVideo, setOriginalVideo] = useState<string | null>(null);

  useEffect(() => {
    if (values[name] === null) {
      setPreview(defaultSource || null);
      setOriginalVideo(defaultSource || null);
      if (values[name] === null && document.getElementById(name as string)) {
        (document.getElementById(name as string) as HTMLInputElement).value =
          "";
      }
    }
  }, [values, name, defaultSource]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    setFieldValue(name as string, file);
    setErrorVideo(false);

    if (file) {
      const videoURL = URL.createObjectURL(file);
      setPreview(videoURL);
    } else {
      setPreview(null);
    }
  };

  const error = touched[name] && Boolean(errors[name]);
  const helperText = touched[name] && (errors[name] as unknown as string);

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      {preview !== null ? (
        <VideoPreview src={preview} videoStyle={videoStyle} />
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
      )}

      <TextField
        id={name as string}
        type="file"
        disabled={disabled}
        label={label}
        variant={variant}
        fullWidth={fullWidth}
        margin={margin}
        InputLabelProps={{
          shrink: true,
        }}
        error={error}
        helperText={helperText}
        onChange={handleChange}
        inputProps={{
          accept: "video/mp4",
        }}
      />
    </Box>
  );
};

export default FormikVideoField;
