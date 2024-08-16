import { useState } from "react";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import ImagePreview from "@/components/image/ImagePreview";

interface FormikImageFieldProps<T> {
  name: keyof T;
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  margin?: "none" | "dense" | "normal";
}

const FormikImageField = <T,>({
  name,
  label = "Image",
  variant = "outlined",
  fullWidth = true,
  margin = "none",
}: FormikImageFieldProps<T>) => {
  const { touched, errors, setFieldValue } = useFormikContext<T>();
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    setFieldValue(name as string, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          setPreview(reader.result as string);
        }
      };
      reader.onerror = () => {
        console.error("File reading has failed");
        setPreview(null);
      };
      reader.onabort = () => {
        console.warn("File reading was aborted");
        setPreview(null);
      };
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("An error occurred while reading the file", error);
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  };

  const error = touched[name] && Boolean(errors[name]);
  const helperText = touched[name] && (errors[name] as unknown as string);

  return (
    <>
      {preview && (
        <ImagePreview src={preview} alt="Preview" width="100%" height="100%" />
      )}
      <TextField
        type="file"
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
      />
    </>
  );
};

export default FormikImageField;
