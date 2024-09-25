import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useFormikContext, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { TextField, IconButton, Dialog, DialogContent } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface FormikDateFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  displayFormat?: string;
  dataFormat?: string;
  placeholder?: string;
}

const FormikDateField = <T,>({
  name,
  label,
  displayFormat = "DD/MM/YYYY",
  dataFormat = "YYYY-MM-DD",
  placeholder = "Pilih tanggal",
  disabled = false,
}: FormikDateFieldProps) => {
  const { values, initialValues, setFieldValue } = useFormikContext<T>();
  const [open, setOpen] = useState(false);

  const memoizedValue = React.useMemo(() => {
    const value = (values as any)[name];
    return value ? moment(value, dataFormat) : null;
  }, [(values as any)[name]]);
  const initialMemoizedValue = React.useMemo(() => {
    const initialValue = (initialValues as any)[name];
    return initialValue ? moment(initialValue, dataFormat) : null;
  }, [(initialValues as any)[name]]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Field name={name}>
        {({ field }: { field: any; form: any }) => (
          <div>
            <TextField
              {...field}
              label={label}
              placeholder={placeholder}
              defaultValue={initialMemoizedValue?.format(displayFormat) || ""}
              value={memoizedValue?.format(displayFormat) || ""}
              variant="outlined"
              fullWidth
              margin="none"
              disabled={disabled}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    disabled={disabled}
                    onClick={handleOpen}
                    style={{ position: "absolute", right: 0 }}
                  >
                    <CalendarTodayIcon />
                  </IconButton>
                ),
              }}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogContent style={{ padding: 0, margin: 0 }}>
                <StaticDatePicker
                  displayStaticWrapperAs="mobile"
                  defaultValue={initialMemoizedValue}
                  value={memoizedValue}
                  onAccept={(value) => {
                    if (value === null) return;
                    setFieldValue(name, value.format(dataFormat));
                    handleClose();
                  }}
                  slotProps={{
                    actionBar: {
                      onCancel() {
                        handleClose();
                      },
                    },
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="span"
        className="wd-text-red-600 wd-text-xs wd-mt-1 wd-text-left wd-font-normal wd-ml-4"
      />
    </div>
  );
};

export default FormikDateField;
