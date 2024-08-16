import React from "react";
import { Field } from "formik";
import { Autocomplete, TextField } from "@mui/material";

interface FormikAutocompleteFieldProps<T> {
  label: string;
  name: string;
  placeholder?: string;
  options: T[];
  buildOption: (item: T) => { label: string; value: any };
}

const FormikAutocompleteField = <T,>({
  label,
  name,
  placeholder,
  options,
  buildOption,
}: FormikAutocompleteFieldProps<T>) => {
  const autocompleteOptions = React.useMemo(
    () => options.map(buildOption) ?? [],
    [options, buildOption]
  );

  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={autocompleteOptions}
          getOptionLabel={(option) => option.label ?? ""}
          value={
            autocompleteOptions.find(
              (option) => option.value === field.value
            ) || null
          }
          onChange={(_event, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder ?? `Cari ${label.toLowerCase()}...`}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={form.touched[name] && Boolean(form.errors[name])}
              helperText={form.touched[name] && form.errors[name]}
            />
          )}
        />
      )}
    </Field>
  );
};

export default FormikAutocompleteField;
