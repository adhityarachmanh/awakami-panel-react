import React, { useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import WilayahService from "@/services/WilayahService";
import { RelawanFormModel } from "@/pages/relawan/types/RelawanModel";

const KecamatanField = () => {
  const { values, setFieldValue, initialValues } =
    useFormikContext<RelawanFormModel>();
  const wilayahService = new WilayahService();
  const { data: kecamatanData } = useQuery({
    queryKey: ["kecamatan", values.kotaId],
    queryFn: () => wilayahService.kecamatanList(values.kotaId ?? 0),
    enabled: !!values.kotaId,
  });
  const kecamatan = React.useMemo(
    () =>
      kecamatanData?.data.map((kecamatan) => ({
        label: kecamatan.name,
        value: kecamatan.id,
      })) ?? [],
    [kecamatanData]
  );
  useEffect(() => {
    if (initialValues?.kecamatanId !== values?.kecamatanId) {
      setFieldValue("kelurahanId", null);
    }
  }, [values?.kecamatanId, initialValues?.kecamatanId]);
  if (!values.kotaId) {
    return null;
  }
  return (
    <Field name="kecamatanId">
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={kecamatan}
          getOptionLabel={(option) => option.label ?? ""}
          value={
            kecamatan.find((option) => option.value === field.value) || null
          }
          onChange={(event, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Kecamatan"
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

export default KecamatanField;
