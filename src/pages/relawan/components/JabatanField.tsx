import { TextField } from "@mui/material";
import { useFormikContext, Field } from "formik";
import { RelawanFormModel } from "../types/RelawanModel";

const JabatanField = () => {
  const { touched, errors } = useFormikContext<RelawanFormModel>();
  return (
    <Field
      name="jabatan"
      as={TextField}
      label="Jabatan"
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      error={touched.jabatan && Boolean(errors.jabatan)}
      helperText={touched.jabatan && errors.jabatan}
    />
  );
};

export default JabatanField;
