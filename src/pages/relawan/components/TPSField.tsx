import React from "react";
import { Field } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import TPSService from "@/pages/tps/services/TPSService";

const TPSField = () => {
  const tpsService = new TPSService();
  const { data: tpsData } = useQuery({
    queryKey: ["tps"],
    queryFn: () => tpsService.list(),
  });
  const tps = React.useMemo(
    () =>
      tpsData?.data.map((tps) => ({
        label: tps.nomor,
        value: tps.id,
      })) ?? [],
    [tpsData]
  );
  return (
    <Field name="tpsId">
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={tps}
          getOptionLabel={(option) => option.label ?? ""}
          value={tps.find((option) => option.value === field.value) || null}
          onChange={(_, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="TPS"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={form.touched.tpsId && Boolean(form.errors.tpsId)}
              helperText={form.touched.tpsId && form.errors.tpsId}
            />
          )}
        />
      )}
    </Field>
  );
};

export default TPSField;
