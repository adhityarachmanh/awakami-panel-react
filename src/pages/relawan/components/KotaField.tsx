import React, { useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import WilayahService from "@/services/WilayahService";
import { RelawanFormModel } from "@/pages/relawan/types/RelawanModel";

const KotaField = () => {
  const { values, setFieldValue, initialValues } =
    useFormikContext<RelawanFormModel>();
  const wilayahService = new WilayahService();
  const { data: kotaData } = useQuery({
    queryKey: ["kota", values.provinsiId],
    queryFn: () => wilayahService.kotaList(values.provinsiId ?? 0),
    enabled: !!values.provinsiId,
  });
  const kota = React.useMemo(
    () =>
      kotaData?.data.map((kota) => ({
        label: kota.name,
        value: kota.id,
      })) ?? [],
    [kotaData]
  );
  useEffect(() => {
    if (initialValues?.kotaId !== values?.kotaId) {
      setFieldValue("kecamatanId", null);
      setFieldValue("kelurahanId", null);
    }
  }, [values?.kotaId, initialValues?.kotaId]);
  if (!values.provinsiId) {
    return null;
  }
  return (
    <Field name="kotaId">
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={kota}
          getOptionLabel={(option) => option.label ?? ""}
          value={kota.find((option) => option.value === field.value) || null}
          onChange={(_event, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Kota"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={form.touched.kotaId && Boolean(form.errors.kotaId)}
              helperText={form.touched.kotaId && form.errors.kotaId}
            />
          )}
        />
      )}
    </Field>
  );
};

export default KotaField;
