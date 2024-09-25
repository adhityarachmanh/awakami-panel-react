import { AudioFileOutlined } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import AudioPreview from "../media/AudioPreview";

interface FormikAudioFieldProps<T> {
  name: keyof T;
  defaultSource?: string | null;
  disabled?: boolean;
  label?: string;

  variant?: "outlined" | "filled" | "standard";

  fullWidth?: boolean;

  margin?: "none" | "dense" | "normal";

  audioStyle?: CSSProperties;
}

const FormikAudioField = <T,>({
  name,
  label = "Audio",
  defaultSource,
  variant = "outlined",
  disabled = false,
  fullWidth = true,
  margin = "none",
  audioStyle = { width: "100%" },
}: FormikAudioFieldProps<T>) => {
  const { touched, errors, values, setFieldValue } = useFormikContext<T>();
  const [errorAudio, setErrorAudio] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (values[name] === null) {
      setPreview(defaultSource || null);
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
    setErrorAudio(false);

    if (file) {
      const audioURL = URL.createObjectURL(file);
      setPreview(audioURL);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    const audioFormats = ["mp3", "wav", "ogg", "flac", "aac"];
    const isValidAudioFormat = audioFormats.some((format) =>
      defaultSource?.toLowerCase().endsWith(format)
    );

    if (
      defaultSource?.includes("null") ||
      defaultSource?.includes("undefined") ||
      !isValidAudioFormat
    ) {
      setErrorAudio(true);
    } else {
      setErrorAudio(false);
    }
  }, [defaultSource]);
  const error = touched[name] && Boolean(errors[name]);
  const helperText = touched[name] && (errors[name] as unknown as string);

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      {preview !== null ? (
        <AudioPreview src={preview} audioStyle={audioStyle} />
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
          <AudioFileOutlined
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
          accept: "audio/*",
        }}
      />
    </Box>
  );
};

export default FormikAudioField;
