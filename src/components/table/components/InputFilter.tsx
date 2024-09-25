import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import React from "react";

import { PostFilter } from "@/types/PostQuery";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useFormikContext } from "formik";
import FormikTextField from "@/components/formik/FormikTextField";
import { InputType } from "../constants/filterConfig";
import FormikSwitchField from "@/components/formik/FormikSwitchField";

export function InputBetweenFilterField(props: { type: InputType }) {
  const { type } = props;
  const { setFieldValue } = useFormikContext<PostFilter>();

  return (
    <div className="wd-flex wd-flex-col wd-gap-4">
      <FormikTextField
        name="values[0]"
        margin="none"
        label={`From ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        placeholder={`Enter From`}
        type={type === "string" ? "text" : type}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value;
          const value =
            type === "date" ? moment(newValue).format("YYYY-MM-DD") : newValue;
          setFieldValue("values[0]", value);
        }}
      />
      <FormikTextField
        name="values[1]"
        margin="none"
        placeholder={`Enter To`}
        label={`To ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        type={type === "string" ? "text" : type}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value;
          const value =
            type === "date" ? moment(newValue).format("YYYY-MM-DD") : newValue;
          setFieldValue("values[1]", value);
        }}
      />
    </div>
  );
}

export function InputFilterField(props: { type: InputType }) {
  const { type } = props;
  const { setFieldValue } = useFormikContext<PostFilter>();
  return type === "boolean" ? (
    <FormikSwitchField
      name="values[0]"
      label={type.charAt(0).toUpperCase() + type.slice(1)}
      valueToString={true}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setFieldValue("values[0]", newValue.toString());
      }}
    />
  ) : (
    <FormikTextField
      name="values"
      margin="none"
      label={type.charAt(0).toUpperCase() + type.slice(1)}
      placeholder={`Enter ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      type={type === "string" ? "text" : type}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const formattedValue =
          type === "date" ? moment(newValue).format("YYYY-MM-DD") : newValue;
        setFieldValue("values[0]", formattedValue);
      }}
    />
  );
}

export function DynamicInputFilterFields(props: { type: InputType }) {
  const { type } = props;

  const { values, setFieldValue } = useFormikContext<PostFilter>();

  const addField = () => {
    const newValues = [...(values.values || []), ""];
    setFieldValue("values", newValues);
  };

  const deleteField = (index: number) => {
    const newValues = values.values?.filter((_, i) => i !== index) || [];
    setFieldValue("values", newValues);
  };

  return (
    <div className="wd-flex wd-flex-col wd-items-center wd-w-full wd-gap-4">
      {values.values?.map((_value, index) => (
        <div
          key={index}
          className="wd-flex wd-flex-row wd-items-center wd-w-full wd-gap-2"
        >
          <FormikTextField
            name={`values[${index}]`}
            margin="none"
            label={`${type.charAt(0).toUpperCase() + type.slice(1)} ${
              index + 1
            }`}
            placeholder={`Enter ${
              type.charAt(0).toUpperCase() + type.slice(1)
            }`}
            type={type === "string" ? "text" : type}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = event.target.value;
              const formattedValue =
                type === "date"
                  ? moment(newValue).format("YYYY-MM-DD")
                  : newValue;
              setFieldValue(`values[${index}]`, formattedValue);
            }}
          />
          <IconButton
            color="error"
            onClick={() => {
              deleteField(index);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ))}

      <IconButton
        color="primary"
        onClick={() => {
          addField();
        }}
      >
        <AddCircleOutlineOutlined />
      </IconButton>
    </div>
  );
}
