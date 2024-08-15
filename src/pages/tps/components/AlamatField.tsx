import { TextField } from "@mui/material";
import { useFormikContext, Field } from "formik";
import { TPSFormModel } from "../types/TPSModel";

const AlamatField = () => {
  const { touched, errors } = useFormikContext<TPSFormModel>();
  return (
    <Field
      name="alamat"
      as={TextField}
      label="Alamat"
      variant="outlined"
      fullWidth
      margin="normal"
      multiline
      rows={4}
      InputLabelProps={{
        shrink: true,
      }}
      error={touched.alamat && Boolean(errors.alamat)}
      helperText={touched.alamat && errors.alamat}
    />
  );
};

export default AlamatField;
