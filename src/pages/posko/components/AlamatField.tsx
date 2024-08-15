import { TextField } from "@mui/material";
import { useFormikContext, Field } from "formik";
import { PoskoFormModel } from "../types/PoskoModel";

const AlamatField = () => {
  const { touched, errors } = useFormikContext<PoskoFormModel>();
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
