import { Select, MenuItem } from "@mui/material";
import { Field } from "formik";

const OperatorField = ({ filterConfigs }: { filterConfigs: any }) => {
  return (
    <Field name="operator">
      {({ field, form }: { field: any; form: any }) => (
        <Select
          label="Operator"
          value={field.value}
          onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        >
          {filterConfigs.map((config: any, index: any) => (
            <MenuItem key={index} value={config.value}>
              {config.label}
            </MenuItem>
          ))}
        </Select>
      )}
    </Field>
  );
};

export default OperatorField;
