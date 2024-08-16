import { TimeClock } from "@mui/x-date-pickers/TimeClock";
import { useFormikContext, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface FormikTimeFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  displayFormat?: string;
  dataFormat?: string;
}

const FormikTimeField = <T,>({
  name,
  label,
  placeholder = "Masukkan jam",
  displayFormat = "HH:mm",
  dataFormat = "HH:mm",
}: FormikTimeFieldProps) => {
  const { values, initialValues, setFieldValue } = useFormikContext<T>();
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<moment.Moment | null>(null);

  const memoizedValue = React.useMemo(() => {
    const value = (values as any)[name];
    return value ? moment(value, dataFormat) : null;
  }, [(values as any)[name]]);
  const initialMemoizedValue = React.useMemo(() => {
    const initialValue = (initialValues as any)[name];
    return initialValue
      ? moment(initialValue, dataFormat)
      : null;
  }, [(initialValues as any)[name]]);

  const handleOpen = () => {
    setOpen(true);
    setSelectedTime(memoizedValue);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedTime(null);
  };



  const handleTimeConfirm = () => {
    if (selectedTime) {
      setFieldValue(name, selectedTime.format(dataFormat));
    }
    handleClose();
  };

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
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleOpen}
                    style={{ position: "absolute", right: 0 }}
                  >
                    <AccessTimeIcon />
                  </IconButton>
                ),
              }}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Pilih Jam</DialogTitle>
              <DialogContent style={{ padding: 0, margin: 0 }}>
                <TimeClock
                  defaultValue={initialMemoizedValue}
                  value={selectedTime}
                  onChange={(value) => setSelectedTime(value)}
                />
              
              </DialogContent>
              <DialogActions>
                <Button onClick={handleTimeConfirm}>Confirm</Button>
              </DialogActions>
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

export default FormikTimeField;
