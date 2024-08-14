import React from "react";
import { Field } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { JENIS_KELAMIN_OPTIONS } from "@/constants/app_constant";

const JenisKelaminField = () => {
  const jenisKelamin = React.useMemo(
    () =>
      Object.entries(JENIS_KELAMIN_OPTIONS).map(([key, value]) => ({
        label: value,
        value: key,
      })),
    []
  );
  return (
    <Field name="jenisKelamin">
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={jenisKelamin}
          getOptionLabel={(option) => option.label ?? ""}
          value={
            jenisKelamin.find((option) => option.value === field.value) || null
          }
          onChange={(_event, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jenis Kelamin"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={
                form.touched.jenisKelamin && Boolean(form.errors.jenisKelamin)
              }
              helperText={form.touched.jenisKelamin && form.errors.jenisKelamin}
            />
          )}
        />
      )}
    </Field>
  );
};

export default JenisKelaminField;
