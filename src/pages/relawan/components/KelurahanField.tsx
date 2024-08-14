import React, { useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import WilayahService from "@/services/WilayahService";
import { RelawanFormModel } from "@/pages/relawan/types/RelawanModel";

const KelurahanField = () => {
  const { values, setFieldValue } = useFormikContext<RelawanFormModel>();
  const wilayahService = new WilayahService();
  const { data: kelurahanData } = useQuery({
    queryKey: ["kelurahan", values.kecamatanId],
    queryFn: () => wilayahService.kelurahanList(values.kecamatanId ?? 0),
    enabled: !!values.kecamatanId,
  });
  const kelurahan = React.useMemo(
    () =>
      kelurahanData?.data.map((kelurahan) => ({
        label: kelurahan.name,
        value: kelurahan.id,
      })) ?? [],
    [kelurahanData]
  );

  if (!values.kecamatanId) {
    return null;
  }
  return (
    <Field name="kelurahanId">
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={kelurahan}
          getOptionLabel={(option) => option.label ?? ""}
          value={kelurahan.find((option) => option.value === field.value) || null}
          onChange={(event, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Kelurahan"
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

export default KelurahanField;
