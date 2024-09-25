import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ErrorMessage, Field, useFormikContext } from "formik";

interface FormikRadioFieldProps<T> {
  name: string;
  label: string;
  options: T[];
  buildLabel: (option: T) => string;
  buildValue: (option: T) => string;
}

const FormikRadioField = <T,>({
  name,
  label,
  options,
  buildLabel,
  buildValue,
  ...props
}: FormikRadioFieldProps<T>) => {
  const { touched, errors, setFieldValue } = useFormikContext<T>();

  return (
    <>
      <Field name={name}>
        {({ field }: { field: any }) => (
          <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              row
              name={field.name}
              value={field.value}
              onChange={(event) => setFieldValue(name, event.target.value)}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={buildValue(option)}
                  value={buildValue(option)}
                  control={<Radio />}
                  label={buildLabel(option)}
                />
              ))}
            </RadioGroup>
          </FormControl>
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

export default FormikRadioField;
