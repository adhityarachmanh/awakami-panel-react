import React from "react";
import {
  DataGrid,
  GridColDef,
  GridFeatureMode,
  GridLogicOperator,
  GridToolbar,
} from "@mui/x-data-grid";

import { Button, TextField, Theme } from "@mui/material";
import useTable from "./useTable";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
interface DataTableInterface<T> {
  uniqKey: string;
  service: (postQuery: PostQuery) => Promise<APIResponse<T>>;
  mode?: GridFeatureMode;
  columns: GridColDef[];
  disableColumnResize?: boolean;
  height?: string;
  showAddButton?: boolean;
  handleAddButtonClick?: () => void;
}

const DataTable = <T,>({
  mode = "server",
  columns,
  disableColumnResize = true,
  height,
  showAddButton = true,
  uniqKey,
  service,
  handleAddButtonClick,
}: DataTableInterface<T>) => {
  const {
    updatedColumns,
    postQuery,
    rows,
    totalRows,
    currentPage,
    pageSize,
    isLoading,
    handleRowSelectionChange,
    handlePaginationChange,
    handleSortChange,
    handleFilterChange,
    setPostQuery,
  } = useTable(columns, uniqKey, service);
  return (
    <div
      className="w-full wd-flex-col wd-flex  "
      style={{ height: height ? height : "auto" }}
    >
      <div className=" wd-flex wd-justify-between wd-items-center">
        {showAddButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddButtonClick}
          >
            Tambah
          </Button>
        )}
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => {
            setPostQuery({
              ...postQuery,
              keywords: (e.target as HTMLInputElement).value,
            });
          }}
          label="Pencarian"
          variant="outlined"
          placeholder="Cari..."
          size="small"
        />
      </div>
      <DataGrid
        className="wd-mt-4 "
        // slots={{
        //   toolbar: GridToolbar,
        //   // Use custom FilterPanel only for deep modification
        //   // FilterPanel: MyCustomFilterPanel,
        // }}
        slotProps={{
          filterPanel: {
            // Force usage of "And" operator

            logicOperators: [GridLogicOperator.And],
            // Display columns by ascending alphabetical order
            columnsSort: "asc",
            filterFormProps: {
              // Customize inputs by passing props
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small",
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                },
              },
              deleteIconProps: {
                sx: {
                  "& .MuiSvgIcon-root": { color: "#d32f2f" },
                },
              },
            },
            sx: {
              // Customize inputs using css selectors
              "& .MuiDataGrid-filterForm": {
                p: 2,
                height: "auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
              },
              "& .MuiDataGrid-filterForm:nth-of-type(even)": {
                backgroundColor: (theme: Theme) =>
                  theme.palette.mode === "dark" ? "#444" : "#f5f5f5",
              },
              "& .MuiDataGrid-filterFormLogicOperatorInput": { mr: 2 },
              "& .MuiDataGrid-filterFormColumnInput": {
                mr: 2,
                width: 200,
                marginTop: 0,
              },
              "& .MuiDataGrid-filterFormOperatorInput": {
                mr: 2,
                width: 200,
                marginTop: 0,
              },
              "& .MuiDataGrid-filterFormValueInput": { width: 200 },
            },
          },
        }}
        rows={rows as any}
        onRowSelectionModelChange={handleRowSelectionChange}
        columns={updatedColumns} // Use updatedColumns here
        loading={isLoading}
        filterDebounceMs={1000}
        filterMode={mode}
        sortingMode={mode}
        paginationMode={mode}
        rowCount={totalRows}
        pageSizeOptions={[5, 10]}
        paginationModel={{ page: currentPage - 1, pageSize: pageSize }}
        checkboxSelection
        onPaginationModelChange={handlePaginationChange}
        onSortModelChange={handleSortChange}
        onFilterModelChange={handleFilterChange}
        disableColumnResize={disableColumnResize}
        autoHeight={height ? false : true}
        // scrollbarSize={100}
      />
    </div>
  );
};

export default DataTable;
