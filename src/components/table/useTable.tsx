import {
  PostQuery,
  PostFilter,
  QueryOperator,
  PostSort,
} from "@/types/PostQuery";
import {
  GridFilterModel,
  GridSortModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridColDef,
  GridFilterOperator,
} from "@mui/x-data-grid";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import TestService from "./TestService";
import { InputInterval, InputBetweenInterval, DynamicInputFields } from "./components/InputFilter";

const useTable = (columns: GridColDef[]) => {
  const filterConfigs = [
    { label: "Equal", value: "EQUAL", component: InputInterval },
    { label: "Not Equal", value: "NOT_EQUAL", component: InputInterval },
    { label: "Between", value: "BETWEEN", component: InputBetweenInterval },
    { label: "Like", value: "ILIKE", component: InputInterval },
    { label: "Less Than", value: "LESS_THAN", component: InputInterval },
    { label: "Less Than Or Equal", value: "LESS_THAN_OR_EQUAL", component: InputInterval },
    { label: "Greater Than", value: "GREATER_THAN", component: InputInterval },
    { label: "Greater Than Or Equal", value: "GREATER_THAN_OR_EQUAL", component: InputInterval },
    { label: "In", value: "IN", component: DynamicInputFields },
    { label: "Not In", value: "NOT_IN", component: DynamicInputFields },
  ];
  const testService = new TestService();
  const [postQuery, setPostQuery] = useState<PostQuery>({
    keywords: "",
    filters: [],
    sorts: [],
    page: 1, // Adjust as needed
    size: 5, // Adjust as needed
  });

  const {
    data: {
      data: rows = [],
      page: {
        total: totalRows = 0,
        current: currentPage = 1,
        size: pageSize = 5,
      } = {},
    } = {},
    isFetching: isLoading,
  } = useQuery({
    queryKey: [
      "data",
      postQuery?.page,
      postQuery?.size,
      postQuery?.filters,
      postQuery?.sorts,
      postQuery?.keywords,
    ],
    queryFn: () => testService.getPagination(postQuery),
    placeholderData: keepPreviousData,
  });

  const createFilterOperators = (
    type: string
  ): GridFilterOperator<any, number>[] =>
    filterConfigs.map((config) => ({
      label: config.label,
      value: config.value,
      getApplyFilterFn: () => null,
      InputComponent: (props) => <config.component {...props} type={type} />,
      InputComponentProps: { type },
    }));

  const handleFilterChange = (model: GridFilterModel) => {
    const filters: PostFilter[] = model.items
      .map((item) => {
        if (
          item.value === undefined ||
          item.value === null ||
          item.value === ""
        ) {
          return null;
        }
        console.log(item.operator);

        const postFilter: PostFilter = {
          key: item.field,
          operator: item.operator as QueryOperator,
          values: Array.isArray(item.value) ? item.value : [item.value],
        };

        return postFilter;
      })
      .filter((filter) => filter !== null);

    setPostQuery({ ...postQuery, filters });
  };

  const handleSortChange = (model: GridSortModel) => {
    const sorts: PostSort[] = model.map((item) => ({
      key: item.field,
      order: item.sort === "asc" ? "ASC" : "DESC",
    }));

    setPostQuery({ ...postQuery, sorts });
  };

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPostQuery({ ...postQuery, page: model.page + 1, size: model.pageSize });
  };

  const handleRowSelectionChange = (rowIds: GridRowSelectionModel) => {
    console.log(rowIds);
  };

  const rebuildColumnsWithFilterOperator = (columns: GridColDef[]) => {
    return columns.map((column) => {
      if (column.type === "date") {
        return {
          ...column,
          filterOperators: createFilterOperators("date"),
        };
      } else if (column.type === "number") {
        return {
          ...column,
          filterOperators: createFilterOperators("number"),
        };
      } 
      return {
        ...column,
        filterOperators: createFilterOperators("string"),
      };
    });
  };

  const updatedColumns = rebuildColumnsWithFilterOperator(columns);

  return {
    postQuery,
    rows,
    totalRows,
    currentPage,
    pageSize,
    isLoading,
    handleFilterChange,
    handleSortChange,
    handlePaginationChange,
    handleRowSelectionChange,
    setPostQuery,
    updatedColumns,
  };
};

export default useTable;
