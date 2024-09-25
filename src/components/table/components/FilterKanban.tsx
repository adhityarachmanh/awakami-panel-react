import { PostFilter, QueryOperator } from "@/types/PostQuery";
import {
  FilterAltOutlined,
  RefreshOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, Menu, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { FilterType } from "../types/FilterModel";
import defaultFilterConfigs, {
  allowedOperator,
  InputType,
} from "../constants/filterConfig";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import OperatorField from "./OperatorField";
import { ColumnType } from "../types/ColumnModel";
import * as yup from "yup";
interface FilterDropdownProps<T> {
  initialFilter: PostFilter[];
  filterConfigs: FilterType[];
  columns: ColumnType<T>[];
  onApply: (filters: PostFilter) => void;
  resetFilter: (field: string) => void;
}

const FilterKanban = <T,>({
  initialFilter,
  filterConfigs,
  columns,
  onApply,
  resetFilter,
}: FilterDropdownProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tempFilter, setTempFilter] = useState<PostFilter[]>([]);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (initialFilter.length > 0) {
      setTempFilter(JSON.parse(JSON.stringify(initialFilter)));
    }
  }, [initialFilter]);

  const memoizedColumns = useMemo(() => {
    return columns.filter(
      (column) => !column.hideFilter && column.type !== "actions"
    );
  }, [columns]);
  const handleSubmit = () => {
    tempFilter.forEach((filter) => {
      onApply(JSON.parse(JSON.stringify(filter)));
    });
    handleClose();
  };
  const handleApply = (values: PostFilter) => {
    setTempFilter((prev) => [...prev, values]);
  };
  const memoizedFilterKanbanItems = useMemo(() => {
    return memoizedColumns.map((column) => {
      const filter = tempFilter.find((filter) => filter.key === column.field);
      return (
        <FilterKanbanItem
          key={column.field}
          initialFilter={
            filter ?? {
              key: column.field,
              operator: "EQUAL",
              values: [],
            }
          }
          headerName={column.headerName}
          field={column.field}
          type={column.type}
          filterConfigs={filterConfigs}
          onApply={handleApply}
        />
      );
    });
  }, [memoizedColumns, tempFilter, filterConfigs, handleApply]);
  return (
    <>
      <IconButton
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterAltOutlined fontSize="small" />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Boolean(anchorEl) && (
          <Box display="flex" flexDirection="column" gap={2} p={2}>
            <div className="wd-flex wd-flex-row wd-items-center wd-justify-between">
              <p className="wd-font-bold wd-mb-2">Filter </p>
              <IconButton
                color="primary"
                onClick={() => {
                  memoizedColumns.forEach((column) => {
                    // resetFilter(column.field);
                    console.log(column.field);
                  });
                  handleClose();
                }}
              >
                <RefreshOutlined fontSize="small" />
              </IconButton>
            </div>

            {memoizedFilterKanbanItems}
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Apply Filter
              </Button>
            </Box>
          </Box>
        )}
      </Menu>
    </>
  );
};

interface FilterKanbanItemProps {
  initialFilter: PostFilter;
  headerName: string;
  field: string;
  type?: InputType;
  filterConfigs: FilterType[];
  onApply: (values: PostFilter) => void;
}

const FilterKanbanItem = ({
  initialFilter,
  headerName,
  field,
  type = "string",
  filterConfigs,
  onApply,
}: FilterKanbanItemProps) => {
  const getTemplateFromOperator = (operator: QueryOperator) => {
    const template = filterConfigs.find((config) => config.value === operator);
    if (!template) return <></>;
    const Component = template.component;

    return <Component type={type} />;
  };
  const [isSaved, setIsSaved] = useState(false);
  const operatorsMapping = useMemo(() => {
    return filterConfigs.filter((config) =>
      allowedOperator[type as keyof typeof allowedOperator].includes(
        config.value as QueryOperator
      )
    );
  }, [filterConfigs, type]);
  const validationSchema = yup.object().shape({
    key: yup.string().required("Key is required"),
    operator: yup.string().required("Operator is required"),
    values: yup
      .array()
      .of(yup.mixed().required("tidak boleh kosong"))
      .min(1, "tidak boleh kosong")
      .required("tidak boleh kosong"),
  });
  return (
    <Formik<PostFilter>
      initialValues={initialFilter}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onApply(JSON.parse(JSON.stringify(values)));
        setIsSaved(true);
      }}
    >
      {({ handleSubmit, resetForm, values, isValid }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
              width="100%"
            >
              <Typography flex={1}>{headerName}</Typography>
              <Box flex={1} width="300px">
                <OperatorField filterConfigs={operatorsMapping} />
              </Box>
              <Box flex={1} width="300px">
                {getTemplateFromOperator(values.operator)}
              </Box>
              <IconButton
                color="primary"
                type="submit"
                disabled={
                  isSaved ||
                  JSON.stringify(values) === JSON.stringify(initialFilter)
                }
              >
                <SaveOutlined />
              </IconButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FilterKanban;
