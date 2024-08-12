import { TextFieldProps, TextField, Button } from "@mui/material";
import { GridFilterInputValueProps, useGridRootProps } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";

import SyncIcon from "@mui/icons-material/Sync";

type InputType = "date" | "number" | "string";

export function InputBetweenInterval(
  props: GridFilterInputValueProps & { type: InputType }
) {
  const rootProps = useGridRootProps();
  const { item, applyValue, focusElementRef = null, type } = props;

  const filterTimeout = React.useRef<any>();
  const [filterValueState, setFilterValueState] = React.useState<
    [string, string]
  >(item.value ?? ["", ""]);
  const [applying, setIsApplying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const itemValue = item.value ?? ["", ""];
    setFilterValueState(itemValue);
  }, [item.value]);

  const updateFilterValue = (lowerBound: string, upperBound: string) => {
    clearTimeout(filterTimeout.current);
    setFilterValueState([lowerBound, upperBound]);

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);
      const formattedLowerBound =
        type === "date" ? moment(lowerBound).format("YYYY-MM-DD") : lowerBound;
      const formattedUpperBound =
        type === "date" ? moment(upperBound).format("YYYY-MM-DD") : upperBound;
      applyValue({
        ...item,
        value: [formattedLowerBound, formattedUpperBound],
      });
    }, rootProps.filterDebounceMs);
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
    <div className="wd-flex wd-flex-row">
      <TextField
        fullWidth
        name="lower-bound-input"
        placeholder="From"
        label="From"
        variant="outlined"
        size="small"
        value={filterValueState[0]}
        onChange={handleLowerFilterChange}
        type={type === "string" ? "text" : type}
        inputRef={focusElementRef}
        sx={{ mr: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        name="upper-bound-input"
        placeholder="To"
        label="To"
        variant="outlined"
        size="small"
        value={filterValueState[1]}
        onChange={handleUpperFilterChange}
        type={type === "string" ? "text" : type}
        InputProps={
          applying
            ? { endAdornment: <SyncIcon className="wd-animate-spin" /> }
            : {}
        }
        InputLabelProps={{ shrink: true }}
      />
    </div>
  );
}

export function InputInterval(
  props: GridFilterInputValueProps & { type: InputType }
) {
  const rootProps = useGridRootProps();
  const { item, applyValue, focusElementRef = null, type } = props;

  const filterTimeout = React.useRef<any>();
  const [filterValueState, setFilterValueState] = React.useState<string>(
    item.value ?? ""
  );
  const [applying, setIsApplying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const itemValue = item.value ?? "";
    setFilterValueState(itemValue);
  }, [item.value]);

  const updateFilterValue = (newValue: string) => {
    clearTimeout(filterTimeout.current);
    setFilterValueState(newValue);

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);
      applyValue({ ...item, value: newValue });
    }, rootProps.filterDebounceMs);
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
      size="small"
      value={filterValueState}
      onChange={handleFilterChange}
      type={type === "string" ? "text" : type}
      inputRef={focusElementRef}
      InputProps={
        applying
          ? { endAdornment: <SyncIcon className="wd-animate-spin" /> }
          : {}
      }
      InputLabelProps={{ shrink: true }}
    />
  );
}

export function DynamicInputFields(
  props: GridFilterInputValueProps & { type: InputType }
) {
  const rootProps = useGridRootProps();

  const { item, applyValue, focusElementRef = null, type } = props;

  const filterTimeout = React.useRef<any>();

  const [filterValues, setFilterValues] = React.useState<string[]>(
    item.value ?? [""]
  );
  const [applying, setIsApplying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const itemValue = item.value ?? [""];

    setFilterValues(itemValue);
  }, [item.value]);

  const updateFilterValues = (newValues: string[]) => {
    clearTimeout(filterTimeout.current);

    setFilterValues(newValues);

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);

      applyValue({ ...item, value: newValues });
    }, rootProps.filterDebounceMs);
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

  return (
    <div className="wd-flex wd-flex-col wd-w-full">
      {filterValues.map((value, index) => (
        <TextField
          key={index}
          name={`${type}-input-${index}`}
          placeholder={`Enter ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          fullWidth
          label={`${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}`}
          variant="outlined"
          size="small"
          value={value}
          onChange={handleFilterChange(index)}
          type={type === "string" ? "text" : type}
          inputRef={index === 0 ? focusElementRef : undefined}
          InputProps={
            applying
              ? { endAdornment: <SyncIcon className="wd-animate-spin" /> }
              : {}
          }
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
      ))}

      <Button variant="contained" onClick={addField}>
        Add Field
      </Button>
    </div>
  );
}
