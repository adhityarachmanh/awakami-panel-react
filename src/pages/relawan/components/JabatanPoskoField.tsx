import React from "react";
import { Field } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { JABATAN_POSKO_OPTIONS } from "@/constants/app_constant";

const JabatanPoskoField = () => {
  const jabatanPosko = React.useMemo(
    () =>
      Object.entries(JABATAN_POSKO_OPTIONS).map(([key, value]) => ({
        label: value,
        value: key,
      })),
    []
  );
  return (
    <Field name="jabatanPosko" >
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={jabatanPosko}
          getOptionLabel={(option) => option.label ?? ""}
          value={
            jabatanPosko.find((option) => option.value === field.value) || null
          }
          onChange={(event, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jabatan Posko"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
             
            />
          )}
        />
      )}
    </Field>
  );
};

export default JabatanPoskoField;
