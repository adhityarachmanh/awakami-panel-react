import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import { FilterAlt, FilterAltOutlined, RefreshOutlined } from "@mui/icons-material";
import { PostFilter, QueryOperator } from "@/types/PostQuery";
import { InputType } from "./InputFilter";
import { FilterType } from "../types/FilterModel";

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {isActiveFilter ? <FilterAlt fontSize="small" color="primary" /> : <FilterAltOutlined fontSize="small" />}
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        style={{ width: "auto" }}
        onClose={handleClose}
      >
        <FilterContent
          initialFilter={initialFilter}
          anchorEl={anchorEl}
          headerName={headerName}
          filterConfigs={filterConfigs}
          type={type}
          onApply={onApply}
          handleClose={handleClose}
          resetFilter={resetFilter}
        />
      </Menu>
    </div>
  );
};

interface FilterContentProps {
  initialFilter: PostFilter;
  anchorEl: HTMLElement | null;
  headerName: string;
  filterConfigs: FilterType[];
  type: InputType;
  handleClose: () => void;
  onApply: (value: PostFilter) => void;
  resetFilter: (field: string) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  initialFilter,
  anchorEl,
  headerName,
  filterConfigs,
  type,
  handleClose,
  onApply,
  resetFilter,
}) => {
  const [filter, setFilter] = useState<PostFilter>(initialFilter);

  const handleChange = (event: any) => {
    setFilter({
      ...filter,
      operator: event.target.value,
    });
  };
  useEffect(() => {
    if (anchorEl) {
      setFilter(initialFilter);
    }
  }, [anchorEl]);

  const getTemplateFromOperator = (
    operator: QueryOperator,
    initialFilter: PostFilter
  ) => {
    const template = filterConfigs.find((config) => config.value === operator);
    if (!template) return <></>;
    const Component = template.component;

    return (
      <Component
        operator={operator}
        type={type}
        defaultValue={initialFilter.values}
        onApply={(v: any[]) => {
          console.log(v);

          setFilter({
            ...filter,
            values: v,
          });
        }}
      />
    );
  };

  const handleApply = () => {
    if (filter.values && filter.values.length > 0) {
      onApply(JSON.parse(JSON.stringify(filter)));
    }
    handleClose();
  };

  const handleReset = () => {
    resetFilter(filter.key);
    handleClose();
  };

  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-w-[300px] wd-px-4 wd-py-2">
      <div className="wd-flex wd-flex-row wd-items-center wd-justify-between">
        <p className="wd-font-bold wd-mb-2">Filter {headerName}</p>
        <IconButton
          color="primary"
          onClick={() => {
            handleReset();
            handleClose();
          }}
        >
          <RefreshOutlined fontSize="small" />
        </IconButton>
      </div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Operator</InputLabel>
        <Select
          label="Operator"
          value={filter.operator}
          onChange={handleChange}
        >
          {filterConfigs.map((config, index) => (
            <MenuItem key={index} value={config.value}>
              {config.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {getTemplateFromOperator(filter.operator, initialFilter)}
      <Button
        disabled={!filter.values || filter.values.length === 0}
        variant="contained"
        color="primary"
        onClick={handleApply}
      >
        Apply
      </Button>
    </div>
  );
};

export default FilterDropdown;
