import { TextFieldProps, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import React from "react";

import { QueryOperator } from "@/types/PostQuery";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

export type InputType = "date" | "number" | "string" | "actions";

export function InputBetweenFilterField(props: {
  onApply: (value: [string, string]) => void;
  type: InputType;
  defaultValue: [string, string];
  operator: QueryOperator;
}) {
  const { type, defaultValue, onApply, operator } = props;

  const [filterValueState, setFilterValueState] = React.useState<
    [string, string]
  >(defaultValue ?? ["", ""]);

  React.useEffect(() => {
    const itemValue = defaultValue ?? ["", ""];
    setFilterValueState(itemValue);
  }, [defaultValue, operator]);

  const updateFilterValue = (lowerBound: string, upperBound: string) => {
    setFilterValueState([lowerBound, upperBound]);

    const formattedLowerBound =
      type === "date" ? moment(lowerBound).format("YYYY-MM-DD") : lowerBound;
    const formattedUpperBound =
      type === "date" ? moment(upperBound).format("YYYY-MM-DD") : upperBound;
    onApply([formattedLowerBound, formattedUpperBound]);
  };

  const handleUpperFilterChange: TextFieldProps["onChange"] = (event) => {
    const newUpperBound = event.target.value;
    updateFilterValue(filterValueState[0], newUpperBound);
  };
  const handleLowerFilterChange: TextFieldProps["onChange"] = (event) => {
    const newLowerBound = event.target.value;
    updateFilterValue(newLowerBound, filterValueState[1]);
  };

  return (
    <div className="wd-flex wd-flex-col wd-gap-4">
      <TextField
        fullWidth
        name="lower-bound-input"
        placeholder="From"
        label="From"
        variant="outlined"
        value={filterValueState[0] || ""}
        onChange={handleLowerFilterChange}
        type={type === "string" ? "text" : type}
        sx={{ mr: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        name="upper-bound-input"
        placeholder="To"
        label="To"
        variant="outlined"
        value={filterValueState[1] || ""}
        onChange={handleUpperFilterChange}
        type={type === "string" ? "text" : type}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  );
}

export function InputFilterField(props: {
  onApply: (value: any[]) => void;
  type: InputType;
  defaultValue: any[];
  operator: QueryOperator;
}) {
  const { type, defaultValue, onApply, operator } = props;

  const [filterValueState, setFilterValueState] = React.useState<any>(
    defaultValue ?? ""
  );

  React.useEffect(() => {
    setFilterValueState(defaultValue.length > 0 ? defaultValue : [""]);
  }, [defaultValue, operator]);

  const updateFilterValue = (newValue: any) => {
    setFilterValueState(newValue);

    const formattedValue =
      type === "date"
        ? moment(newValue).format("YYYY-MM-DD")
        : newValue;
    onApply([formattedValue]);
  };

  const handleFilterChange: TextFieldProps["onChange"] = (event) => {
    const newValue = event.target.value;
    updateFilterValue(newValue);
  };

  return (
    <TextField
      name={`${type}-input`}
      placeholder={`Enter ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      fullWidth
      label={type.charAt(0).toUpperCase() + type.slice(1)}
      variant="outlined"
      value={filterValueState}
      onChange={handleFilterChange}
      type={type === "string" ? "text" : type}
      InputLabelProps={{ shrink: true }}
    />
  );
}

export function DynamicInputFilterFields(props: {
  onApply: (value: string[]) => void;
  type: InputType;
  defaultValue: string[];
  operator: QueryOperator;
}) {
  const { type, defaultValue, onApply, operator } = props;

  const [filterValues, setFilterValues] = React.useState<string[]>(
    defaultValue ?? [""]
  );

  React.useEffect(() => {
    const itemValue = defaultValue ?? [""];

    setFilterValues(itemValue);
  }, [defaultValue, operator]);

  const updateFilterValues = (newValues: string[]) => {
    setFilterValues(newValues);

    const formattedValues = newValues.map((value) =>
      type === "date" ? moment(value).format("YYYY-MM-DD") : value
    );

    onApply(formattedValues);
  };

  const handleFilterChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = [...filterValues];

      newValues[index] = event.target.value;

      updateFilterValues(newValues);
    };

  const addField = () => {
    setFilterValues([...filterValues, ""]);
  };

  const deleteField = (index: number) => {
    const newValues = filterValues.filter((_, i) => i !== index);
    updateFilterValues(newValues);
  };

  return (
    <div className="wd-flex wd-flex-col wd-items-center wd-w-full wd-gap-4 ">
      {filterValues.map((value, index) => (
        <div
          key={index}
          className="wd-flex wd-flex-row wd-items-center wd-w-full  wd-gap-2 "
        >
          <TextField
            name={`${type}-input-${index}`}
            placeholder={`Enter ${
              type.charAt(0).toUpperCase() + type.slice(1)
            }`}
            fullWidth
            label={`${type.charAt(0).toUpperCase() + type.slice(1)} ${
              index + 1
            }`}
            variant="outlined"
            value={value}
            style={{ marginBottom: 0 }}
            onChange={handleFilterChange(index)}
            type={type === "string" ? "text" : type}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <IconButton color="error" onClick={() => deleteField(index)}>
            <CloseIcon />
          </IconButton>
        </div>
      ))}

      <IconButton color="primary" onClick={addField}>
        <AddCircleOutlineOutlined />
      </IconButton>
    </div>
  );
}
