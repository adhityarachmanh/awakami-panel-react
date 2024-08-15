import { TextField } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { PoskoFormModel } from "../types/PoskoModel";

const NamaField = () => {
  const { touched, errors } = useFormikContext<PoskoFormModel>();
  return (
    <Field
      name="nama"
      as={TextField}
      label="Nama"
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      error={touched.nama && Boolean(errors.nama)}
      helperText={touched.nama && errors.nama}
    />
  );
};

export default NamaField;
