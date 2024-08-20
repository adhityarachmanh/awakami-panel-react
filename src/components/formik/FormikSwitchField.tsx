import { Switch, FormControlLabel, SwitchProps } from "@mui/material";
import { useFormikContext, Field, ErrorMessage } from "formik";

interface FormikSwitchFieldProps {
  name: string;
  label?: string;
  switchProps?: SwitchProps;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormikSwitchField = <T,>({
  name,
  label,
  switchProps,
  onChange,
}: FormikSwitchFieldProps) => {
  const { setFieldValue } = useFormikContext<T>();

  return (
    <>
      <Field name={name}>
        {({ field }: { field: any }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value === "true" || field.value === true}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = event.target.checked;
                  setFieldValue(name, newValue.toString());
                  if (onChange) {
                    onChange(event);
                  }
                }}
                {...switchProps}
              />
            }
            label={label}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="span"
        className="wd-text-red-600 wd-text-xs wd-mt-1 wd-text-left wd-font-normal wd-ml-4"
      />
    </>
  );
};

export default FormikSwitchField;
