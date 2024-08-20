import React, { useMemo, useState } from "react";
import { Menu, IconButton, Button } from "@mui/material";
import {
  FilterAlt,
  FilterAltOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import { PostFilter, QueryOperator } from "@/types/PostQuery";
import { InputType } from "../constants/filterConfig";
import { FilterType } from "../types/FilterModel";
import { Form, Formik } from "formik";
import * as yup from "yup";
import OperatorField from "./OperatorField";
import { allowedOperator } from "../constants/filterConfig";

interface FilterDropdownProps {
  initialFilter?: PostFilter;
  field: string;
  headerName: string;
  type?: InputType;
  filterConfigs: FilterType[];
  onApply: (filters: PostFilter) => void;
  resetFilter: (field: string) => void;
  isActiveFilter: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  initialFilter = {
    key: "",
    operator: "EQUAL",
    values: [],
  },
  type = "string",
  headerName,
  filterConfigs,
  onApply,
  resetFilter,
  isActiveFilter,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [resetFormCallback, setResetFormCallback] = useState<() => void>(
    () => {}
  );

  const handleClose = () => {
    if (resetFormCallback) resetFormCallback();
    setAnchorEl(null);
  };

  const getTemplateFromOperator = (operator: QueryOperator) => {
    const template = filterConfigs.find((config) => config.value === operator);
    if (!template) return <></>;
    const Component = template.component;

    return <Component type={type} />;
  };

  const validationSchema = yup.object().shape({
    key: yup.string().required("Key is required"),
    operator: yup.string().required("Operator is required"),
    values: yup
      .array()
      .of(yup.mixed().required("tidak boleh kosong"))
      .min(1, "tidak boleh kosong")
      .required("tidak boleh kosong"),
  });

  const operatorsMapping = useMemo(() => {
    return filterConfigs.filter((config) =>
      allowedOperator[type as keyof typeof allowedOperator].includes(
        config.value as QueryOperator
      )
    );
  }, [filterConfigs, type]);

  return (
    <div>
      <IconButton
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {isActiveFilter ? (
          <FilterAlt fontSize="small" color="primary" />
        ) : (
          <FilterAltOutlined fontSize="small" />
        )}
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        style={{ width: "auto" }}
        onClose={handleClose}
      >
        {Boolean(anchorEl) && (
          <Formik<PostFilter>
            initialValues={initialFilter}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onApply(JSON.parse(JSON.stringify(values)));
              handleClose();
            }}
          >
            {({ handleSubmit, resetForm, values, isValid }) => {
              setResetFormCallback(() => resetForm);
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="wd-flex wd-flex-col wd-gap-4 wd-w-[300px] wd-px-4 wd-py-2">
                    <div className="wd-flex wd-flex-row wd-items-center wd-justify-between">
                      <p className="wd-font-bold wd-mb-2">
                        Filter {headerName}
                      </p>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          resetFilter(values.key);
                          handleClose();
                        }}
                      >
                        <RefreshOutlined fontSize="small" />
                      </IconButton>
                    </div>

                    <OperatorField filterConfigs={operatorsMapping} />

                    {getTemplateFromOperator(values.operator)}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={
                        !isValid || !values.values || values.values.length === 0
                      }
                    >
                      Apply Filter
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </Menu>
    </div>
  );
};

export default FilterDropdown;
