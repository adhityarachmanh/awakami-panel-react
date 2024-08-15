import { TextField } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { TPSFormModel } from "../types/TPSModel";

const NomorField = () => {
  const { touched, errors } = useFormikContext<TPSFormModel>();
  return (
    <Field
      name="nomor"
      as={TextField}
      label="Nomor"
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      error={touched.nomor && Boolean(errors.nomor)}
      helperText={touched.nomor && errors.nomor}
    />
  );
};

export default NomorField;
