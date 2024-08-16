import React, { useMemo } from "react";

import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import useTable from "./useTable";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { ColumnType } from "./types/ColumnModel";
import FilterDropdown from "./components/FilterDropdown";
import SortingComponent from "./components/Sorting";
import { FilterType } from "./types/FilterModel";
import DefaultHeaderTable from "./components/DefaultHeaderTable";
interface DataTableInterface<T> {
  className?: string;
  uniqKey: string;
  selectable?: boolean;
  paginable?: boolean;
  filterConfigsCustom?: FilterType[];
  onSelectionChange?: (selectedRows: T[]) => void;
  service: (postQuery: PostQuery) => Promise<APIResponse<T[]>>;
  postQueryValue?: PostQuery;
  columns: ColumnType<T>[];
  disableColumnResize?: boolean;
  height?: string;
  showAddButton?: boolean;
  rowsPerPageOptions?: number[];
  handleAddButtonClick?: () => void;
  renderHeader?: (options: {
    isLoading: boolean;
    selectedRows: T[];
    rows: T[];
    postQuery: PostQuery;
    setPostQuery: (postQuery: PostQuery) => void;
  }) => React.ReactNode;
}

const DataTable = <T,>({
  className,
  selectable = true,
  columns,
  rowsPerPageOptions = [5, 10, 20, 30, 40, 50],
  height,
  showAddButton = true,
  paginable = true,
  uniqKey,
  service,
  handleAddButtonClick,
  renderHeader,
  postQueryValue,
  filterConfigsCustom,
  onSelectionChange,
}: DataTableInterface<T>) => {
  const {
    filterConfigs,
    postQuery,
    query,
    isLoading,
    selectedRows,
    allRowsSelected,
    oneRowSelected,
    handlePaginationChange,
    handleSortChange,
    handleFilterChange,
    setPostQuery,
    isActiveSort,
    currentOrder,
    getInitialFilter,
    resetFilter,
    isActiveFilter,
  } = useTable(
    uniqKey,
    service,
    postQueryValue,
    onSelectionChange,
    filterConfigsCustom
  );
  const rows = useMemo(() => query?.data ?? [], [query]);
  const totalRows = useMemo(() => query?.page?.total ?? 0, [query]);
  const currentPage = useMemo(() => query?.page?.current ?? 1, [query]);
  const pageSize = useMemo(() => query?.page?.size ?? 5, [query]);
  return (
    <div className={`w-full wd-flex-col wd-flex ${className}`}>
      {renderHeader ? (
        renderHeader({
          isLoading,
          selectedRows: selectedRows as T[],
          rows: rows as T[],
          postQuery,
          setPostQuery,
        })
      ) : (
        <DefaultHeaderTable
          paginable={paginable}
          showAddButton={showAddButton}
          handleAddButtonClick={handleAddButtonClick}
          postQuery={postQuery}
          setPostQuery={setPostQuery}
        />
      )}
      <TableContainer
        elevation={0}
        component={Paper}
        className="wd-mt-4"
        style={{ height: height ? height : "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell
                  padding="checkbox"
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                    zIndex: 1,
                  }}
                >
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < (rows as T[]).length
                    }
                    checked={
                      (rows as T[]).length > 0 &&
                      selectedRows.length === (rows as T[]).length
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        allRowsSelected(rows as T[]);
                      } else {
                        allRowsSelected([]);
                      }
                    }}
                  />
                </TableCell>
              )}
              {columns.map((column, i) => (
                <TableCell
                  width={column.width}
                  className={column.cellClassName}
                  key={i}
                  colSpan={column.fullWidth ? columns.length : undefined}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                    zIndex: 1,
                  }}
                >
                  <div className="wd-flex wd-flex-row wd-items-center wd-justify-between wd-w-full">
                    <span className="wd-flex wd-flex-row wd-items-center">
                      <Typography variant="body1" fontWeight="bold">
                        {" "}
                        {column.headerName}
                      </Typography>
                    </span>
                    {column.type !== "actions" && (
                      <div className="wd-flex wd-flex-row wd-items-center">
                        {paginable ? (
                          <SortingComponent
                            isActiveSort={isActiveSort(column.field)}
                            currentOrder={currentOrder(column.field)}
                            handleSortChange={() =>
                              handleSortChange(column.field)
                            }
                          />
                        ) : (
                          <></>
                        )}
                        {paginable ? (
                          <FilterDropdown
                            field={column.field}
                            type={column.type}
                            isActiveFilter={isActiveFilter(column.field)}
                            initialFilter={getInitialFilter(column.field)}
                            headerName={column.headerName}
                            filterConfigs={filterConfigs}
                            onApply={handleFilterChange}
                            resetFilter={resetFilter}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(rows) && rows.length > 0 ? (
              rows.map((row: any, i) => (
                <TableRow key={i}>
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row)}
                        onChange={() => oneRowSelected(row)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column, i) => (
                    <TableCell
                      key={i}
                      width={column.width}
                      className={column.cellClassName}
                      colSpan={column.fullWidth ? columns.length : undefined}
                    >
                      {column.renderCell
                        ? column.renderCell(row)
                        : column.valueFormatter
                        ? column.valueFormatter(row)
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={selectable ? columns.length + 1 : columns.length}
                  align="center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {paginable ? (
        <TablePagination
          component="div"
          count={totalRows}
          page={currentPage - 1}
          onPageChange={(_, newPage: number) =>
            handlePaginationChange({
              page: newPage,
              pageSize: pageSize,
            })
          }
          rowsPerPage={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={(event: any) =>
            handlePaginationChange({
              page: 0,
              pageSize: parseInt(event.target.value),
            })
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DataTable;
