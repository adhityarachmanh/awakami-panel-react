import React, { useMemo, useState } from "react";

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
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import useTable from "./useTable";
import { APIResponse } from "@/types/APIResponse";
import { PostFilter, PostQuery } from "@/types/PostQuery";
import { ColumnType } from "./types/ColumnModel";
import FilterDropdown from "./components/FilterDropdown";
import SortingComponent from "./components/Sorting";
import { FilterType } from "./types/FilterModel";
import DefaultHeaderTable from "./components/DefaultHeaderTable";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewIcon from "@mui/icons-material/GridView";
import { FilterAltOutlined } from "@mui/icons-material";
import FilterKanban from "./components/FilterKanban";
interface DataTableInterface<T> {
  className?: string;
  uniqKey: string;
  mode?: "server" | "client";
  defaultDisplay?: "table" | "grid";
  kanbanRender?: (options: {
    index: number;
    row: T;
    columns: ColumnType<T>[];
  }) => React.ReactNode;
  clientSearchField?: string;
  selectable?: boolean;
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
  mergeHeaderContent?: (options: {
    isLoading: boolean;
    selectedRows: T[];
    rows: T[];
    postQuery: PostQuery;
    setPostQuery: (postQuery: PostQuery) => void;
    handleFilterChange: (postFilter: PostFilter) => void;
    resetFilter: (field: string) => void;
  }) => React.ReactNode;
  renderHeader?: (options: {
    isLoading: boolean;
    selectedRows: T[];
    rows: T[];
    postQuery: PostQuery;
    setPostQuery: (postQuery: PostQuery) => void;
    handleFilterChange: (postFilter: PostFilter) => void;
    resetFilter: (field: string) => void;
  }) => React.ReactNode;
}

const DataTable = <T,>({
  className,
  selectable = false,
  columns,
  rowsPerPageOptions = [5, 10, 20, 30, 40, 50],
  height,
  mode = "server",
  showAddButton = true,
  mergeHeaderContent,
  uniqKey,
  service,
  handleAddButtonClick,
  renderHeader,
  postQueryValue,
  filterConfigsCustom,
  onSelectionChange,
  clientSearchField,
  defaultDisplay = "table",
  kanbanRender,
}: DataTableInterface<T>) => {
  const {
    clientData,
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
    handleSearchChange,
    handleToggleView,
    isGridView,
  } = useTable(
    uniqKey,
    mode,
    defaultDisplay,
    columns,
    service,
    clientSearchField,
    postQueryValue,
    onSelectionChange,
    filterConfigsCustom
  );
  const rows = useMemo(
    () => (mode === "client" ? clientData : query?.data) ?? [],
    [clientData, query, mode]
  );
  const totalRows = useMemo(() => query?.page?.total ?? 0, [query]);
  const currentPage = useMemo(() => query?.page?.current ?? 1, [query]);
  const pageSize = useMemo(() => query?.page?.size ?? 5, [query]);
  const mergeHeaderContentComponent = useMemo(() => {
    if (mergeHeaderContent) {
      return mergeHeaderContent({
        isLoading,
        selectedRows: selectedRows as T[],
        rows: rows as T[],
        postQuery,
        setPostQuery,
        handleFilterChange,
        resetFilter,
      });
    }
  }, [
    mergeHeaderContent,
    isLoading,
    selectedRows,
    rows,
    postQuery,
    setPostQuery,
  ]);

  return (
    <Box display="flex" flexDirection="column" className={className}>
      {renderHeader ? (
        renderHeader({
          isLoading,
          selectedRows: selectedRows as T[],
          rows: rows as T[],
          postQuery,
          setPostQuery,
          handleFilterChange,
          resetFilter,
        })
      ) : (
        <DefaultHeaderTable
          mode={mode}
          showAddButton={showAddButton}
          mergeHeaderContent={mergeHeaderContentComponent}
          handleAddButtonClick={handleAddButtonClick}
          handleSearchChange={handleSearchChange}
        />
      )}

      <TableContainer
        elevation={0}
        component={Paper}
        sx={{ mt: 4, height: height ? height : "auto" }}
      >
        {kanbanRender ? (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
          >
            {/* <FilterKanban
              initialFilter={postQuery.filters ?? []}
              filterConfigs={filterConfigs}
              columns={columns}
              onApply={handleFilterChange}
              resetFilter={resetFilter}
            /> */}
            <IconButton onClick={handleToggleView}>
              {isGridView ? <TableRowsIcon /> : <GridViewIcon />}
            </IconButton>
          </Box>
        ) : (
          <></>
        )}
        {isGridView && kanbanRender ? (
          <Grid container spacing={2} sx={{ p: 2, height: "100%" }}>
            {rows.map(
              (row, index) =>
                kanbanRender && kanbanRender({ index, row, columns })
            )}
          </Grid>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell
                    padding="checkbox"
                    sx={{
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
                    sx={{
                      position: "sticky",
                      top: 0,
                      background: "#fff",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography variant="body1" fontWeight="bold">
                          {column.headerName}
                        </Typography>
                      </Box>
                      {column.type !== "actions" && (
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          {!column.hideSort && (
                            <SortingComponent
                              isActiveSort={isActiveSort(column.field)}
                              currentOrder={currentOrder(column.field)}
                              handleSortChange={() =>
                                handleSortChange(column.field)
                              }
                            />
                          )}
                          {!column.hideFilter && (
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
                          )}
                        </Box>
                      )}
                    </Box>
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
                        sx={{ fontSize: "clamp(0.75rem, 1vw, 1rem)" }}
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
        )}
      </TableContainer>
      {mode === "server" ? (
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
    </Box>
  );
};

export default DataTable;
