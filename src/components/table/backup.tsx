// import React from "react";
// import {
//   DataGrid,
//   GridColDef,
//   GridFeatureMode,
//   GridLogicOperator,
//   GridToolbar,
// } from "@mui/x-data-grid";

// import { Button, Menu, MenuItem, TextField, Theme } from "@mui/material";
// import useTable from "./useTable";
// import { APIResponse } from "@/types/APIResponse";
// import { PostQuery } from "@/types/PostQuery";
// import SelectionModal from "./components/SelectionModal";
// interface DataTableInterface<T> {
//   uniqKey: string;
//   service: (postQuery: PostQuery) => Promise<APIResponse<T>>;
//   mode?: GridFeatureMode;
//   columns: GridColDef[];
//   disableColumnResize?: boolean;
//   height?: string;
//   showAddButton?: boolean;
//   handleAddButtonClick?: () => void;
// }

// const DataTable = <T,>({
//   mode = "server",
//   columns,
//   disableColumnResize = true,
//   height,
//   showAddButton = true,
//   uniqKey,
//   service,
//   handleAddButtonClick,
// }: DataTableInterface<T>) => {
//   const {
//     updatedColumns,
//     postQuery,
//     rows,
//     totalRows,
//     currentPage,
//     pageSize,
//     isLoading,
//     selectedRows,
//     handleRowSelectionChange,
//     handlePaginationChange,
//     handleSortChange,
//     handleFilterChange,
//     setPostQuery,
//   } = useTable(columns, uniqKey, service);
//   return (
//     <div
//       className="w-full wd-flex-col wd-flex  "
//       style={{ height: height ? height : "auto" }}
//     >
//       <div className=" wd-flex wd-justify-between wd-items-center">
//         <div className="wd-flex wd-items-center wd-gap-2">
//           {showAddButton && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddButtonClick}
//             >
//               Tambah
//             </Button>
//           )}
//           {selectedRows.length > 0 && (
//             <SelectionModal<T>
//               selected={selectedRows}
//               columns={columns}
//               uniqKey={uniqKey}
//               service={service}
//             />
//           )}
//         </div>
//         <TextField
//           id="search-bar"
//           className="text"
//           onInput={(e) => {
//             setPostQuery({
//               ...postQuery,
//               keywords: (e.target as HTMLInputElement).value,
//             });
//           }}
//           label="Pencarian"
//           variant="outlined"
//           placeholder="Cari..."
//           size="small"
//         />
//       </div>
//       <DataGrid
//         className="wd-mt-4 "
//         // slots={{
//         //   toolbar: GridToolbar,
//         //   // Use custom FilterPanel only for deep modification
//         //   // FilterPanel: MyCustomFilterPanel,
//         // }}
//         slotProps={{
//           filterPanel: {
//             // Force usage of "And" operator

//             logicOperators: [GridLogicOperator.And],
//             // Display columns by ascending alphabetical order
//             columnsSort: "asc",
//             filterFormProps: {
//               // Customize inputs by passing props
//               logicOperatorInputProps: {
//                 variant: "outlined",
//                 size: "small",
//               },
//               columnInputProps: {
//                 variant: "outlined",
//                 size: "small",
//                 sx: { mt: "auto" },
//               },
//               operatorInputProps: {
//                 variant: "outlined",
//                 size: "small",
//                 sx: { mt: "auto" },
//               },
//               valueInputProps: {
//                 InputComponentProps: {
//                   variant: "outlined",
//                   size: "small",
//                 },
//               },
//               deleteIconProps: {
//                 sx: {
//                   "& .MuiSvgIcon-root": { color: "#d32f2f" },
//                 },
//               },
//             },
//             sx: {
//               // Customize inputs using css selectors
//               "& .MuiDataGrid-filterFormDeleteIcon": {
//                 marginTop: "0.3rem",
//                 marginRight: "1rem",
//               },
//               "& .MuiDataGrid-filterForm": {
//                 p: 2,
//                 height: "auto",
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "start",
//               },
//               "& .MuiDataGrid-filterForm:nth-of-type(even)": {
//                 backgroundColor: (theme: Theme) =>
//                   theme.palette.mode === "dark" ? "#444" : "#f5f5f5",
//               },
              
//               "& .MuiDataGrid-filterFormLogicOperatorInput": { mr: 2 },
//               "& .MuiDataGrid-filterFormColumnInput": {
//                 mr: 2,
//                 width: 200,
//                 marginTop: 0,
//               },
//               "& .MuiDataGrid-filterFormOperatorInput": {
//                 mr: 2,
//                 width: 200,
//                 marginTop: 0,
//               },
//               "& .MuiDataGrid-filterFormValueInput": { width: 240 },
//             },
//           },
//         }}
//         // isRowSelectable={() => {
//         //   return selectedRows.length === 0;
//         // }}
        
//         rows={rows as any}
//         onRowSelectionModelChange={handleRowSelectionChange}
//         columns={updatedColumns} // Use updatedColumns here
//         loading={isLoading}
//         filterDebounceMs={1000}
//         filterMode={mode}
//         sortingMode={mode}
//         paginationMode={mode}
//         rowCount={totalRows}
//         pageSizeOptions={[5, 10]}
//         paginationModel={{ page: currentPage - 1, pageSize: pageSize }}
//         checkboxSelection
//         onPaginationModelChange={handlePaginationChange}
//         onSortModelChange={handleSortChange}
//         onFilterModelChange={handleFilterChange}
//         disableColumnResize={disableColumnResize}
//         autoHeight={height ? false : true}
//         hideFooterSelectedRowCount

//         // scrollbarSize={100}
//       />
//     </div>
//   );
// };

// export default DataTable;
