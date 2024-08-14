import { TextField } from "@mui/material";
import { useFormikContext, Field } from "formik";
import React from "react";
import { RelawanFormModel } from "../types/RelawanModel";

const NoKTPField = () => {
  const { touched, errors } = useFormikContext<RelawanFormModel>();
  return (
    <Field
      name="noKTP"
      as={TextField}
      label="No KTP"
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      error={touched.noKTP && Boolean(errors.noKTP)}
      helperText={touched.noKTP && errors.noKTP}
      inputProps={{
        maxLength: 16,
        onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        },
      }}
    />
  );
};

export default NoKTPField;
