import { TextField } from "@mui/material";
import { useFormikContext, Field } from "formik";
import { RelawanFormModel } from "../types/RelawanModel";

const EmailField = () => {
  const { touched, errors } = useFormikContext<RelawanFormModel>();
  return (
    <Field
      name="email"
      as={TextField}
      label="Email"
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      error={touched.email && Boolean(errors.email)}
      helperText={touched.email && errors.email}
    />
  );
};

export default EmailField;
