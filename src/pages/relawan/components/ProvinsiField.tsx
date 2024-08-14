import React, { useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import WilayahService from "@/services/WilayahService";
import { RelawanFormModel } from "@/pages/relawan/types/RelawanModel";

const ProvinsiField = () => {
  const { values, setFieldValue, initialValues } =
    useFormikContext<RelawanFormModel>();
  const wilayahService = new WilayahService();
  const { data: provinsiData } = useQuery({
    queryKey: ["provinsi"],
    queryFn: () => wilayahService.provinsiList(),
  });
  const provinsi = React.useMemo(
    () =>
      provinsiData?.data.map((provinsi) => ({
        label: provinsi.name,
        value: provinsi.id,
      })) ?? [],
    [provinsiData]
  );

  useEffect(() => {
    if (initialValues?.provinsiId !== values?.provinsiId) {
      setFieldValue("kotaId", null);
      setFieldValue("kecamatanId", null);
      setFieldValue("kelurahanId", null);
    }
  }, [values?.provinsiId, initialValues?.provinsiId]);

  return (
    <Field name="provinsiId">
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={provinsi}
          getOptionLabel={(option) => option.label ?? ""}
          value={
            provinsi.find((option) => option.value === field.value) || null
          }
          onChange={(event, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Provinsi"
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

export default ProvinsiField;
