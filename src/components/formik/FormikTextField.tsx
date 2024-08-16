import { InputProps, TextField } from "@mui/material";
import { useFormikContext, Field } from "formik";

interface FormikTextFieldProps {
  name: string;
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  margin?: "none" | "dense" | "normal";
  multiline?: boolean;
  rows?: number;
  type?: React.HTMLInputTypeAttribute;
  InputProps?: InputProps;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormikTextField = <T,>({
  name,
  label = "Label",
  variant = "outlined",
  fullWidth = true,
  margin = "normal",
  multiline = false,
  rows = 1,
  type,
  InputProps,
  placeholder,
  onChange,
}: FormikTextFieldProps) => {
  const { touched, errors } = useFormikContext<T>();
  const error = touched[name as keyof T] && Boolean(errors[name as keyof T]);
  const helperText = touched[name as keyof T] && errors[name as keyof T];

  return (
    <Field name={name}>
      {({ field }: { field: any; form: any }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          variant={variant}
          fullWidth={fullWidth}
          margin={margin}
          multiline={multiline}
          rows={rows}
          InputProps={InputProps}
          InputLabelProps={{
            shrink: true,
          }}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </Field>
  );
};

export default FormikTextField;
