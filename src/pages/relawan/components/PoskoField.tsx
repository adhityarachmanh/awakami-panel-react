import React from "react";
import { Field } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PoskoService from "@/pages/posko/services/PoskoService";

const PoskoField = () => {
  const poskoService = new PoskoService();
  const { data: poskoData } = useQuery({
    queryKey: ["posko"],
    queryFn: () => poskoService.list(),
  });
  const posko = React.useMemo(
    () =>
      poskoData?.data.map((posko) => ({
        label: posko.nama,
        value: posko.id,
      })) ?? [],
    [poskoData]
  );
  return (
    <Field name="poskoId">
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={posko}
          getOptionLabel={(option) => option.label ?? ""}
          value={
            posko.find((option) => option.value === field.value) || null
          }
          onChange={(_, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Posko"
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

export default PoskoField;
