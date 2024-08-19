import { CSSProperties, useState } from "react";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useFormikContext } from "formik";
import ImagePreview from "@/components/image/ImagePreview";

import ReactCrop, { Crop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { primaryColor } from "@/constants/app_theme_constant";

interface FormikImageFieldProps<T> {
  name: keyof T;
  defaultSource?: string | null;

  label?: string;

  variant?: "outlined" | "filled" | "standard";

  fullWidth?: boolean;

  margin?: "none" | "dense" | "normal";

  imageStyle?: CSSProperties;
}

const FormikImageField = <T,>({
  name,
  label = "Image",
  defaultSource,
  variant = "outlined",
  fullWidth = true,
  margin = "none",
  imageStyle = { width: "100%", height: "300px" },
}: FormikImageFieldProps<T>) => {
  const { touched, errors, setFieldValue } = useFormikContext<T>();

  const [preview, setPreview] = useState<string | null>(defaultSource || null);
  const [originalImage, setOriginalImage] = useState<string | null>(
    defaultSource || null
  );
  const [crop, setCrop] = useState<Crop>();
  const [open, setOpen] = useState(false);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    setFieldValue(name as string, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          const result = reader.result as string;
          setPreview(result);
          setOriginalImage(result);
        }
      };

      reader.onerror = () => {
        console.error("File reading has failed");
        setPreview(null);
        setOriginalImage(null);
      };
      reader.onabort = () => {
        console.warn("File reading was aborted");
        setPreview(null);
        setOriginalImage(null);
      };

      try {
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("An error occurred while reading the file", error);
        setPreview(null);
        setOriginalImage(null);
      }
    } else {
      setPreview(null);
      setOriginalImage(null);
    }
  };

  const handleCropComplete = (crop: Crop) => {
    try {
      if (imageRef && crop.width && crop.height) {
        const canvas = document.createElement("canvas");
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(
            imageRef,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          );

          canvas.toBlob((blob) => {
            if (blob) {
              const croppedFile = new File([blob], "cropped_image.png", {
                type: "image/png",
              });
              setFieldValue(name as string, croppedFile);
              const reader = new FileReader();
              reader.onloadend = () => {
                if (reader.readyState === FileReader.DONE) {
                  setPreview(reader.result as string);
                }
              };

              reader.readAsDataURL(croppedFile);
            }
          }, "image/png");
        }
      }
    } catch (error) {
      console.error("An error occurred during the crop operation:", error);
    }
  };
  const handleReset = () => {
    setPreview(originalImage);
    setCrop(undefined);
    setImageRef(null);
    setOpen(false);
  };
  const error = touched[name] && Boolean(errors[name]);
  const helperText = touched[name] && (errors[name] as unknown as string);

  return (
    <div className="wd-flex wd-flex-col wd-w-full wd-gap-4">
      {preview && (
        <>
          <div style={{ position: "relative" }}>
            <ImagePreview src={preview} alt="Preview" imageStyle={imageStyle} />
            <IconButton
              size="small"
              onClick={() => setOpen(true)}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: primaryColor,
                color: "white",
                borderRadius: "50%",
                padding: "8px",
              }}
            >
              <ContentCutIcon style={{ fontSize: "16px",  }} />
            </IconButton>
          </div>
        </>
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          {originalImage && (
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCrop(c)}
            >
              <img
                src={originalImage}
                onLoad={(e) => setImageRef(e.currentTarget)}
                crossOrigin="anonymous"
              />
            </ReactCrop>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              if (crop) {
                handleCropComplete(crop);
              }
              setOpen(false);
            }}
            color="primary"
          >
            Apply
          </Button>
          <Button onClick={handleReset} color="error">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormikImageField;
