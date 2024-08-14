import { PostQuery, PostFilter, PostSort } from "@/types/PostQuery";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { APIResponse } from "@/types/APIResponse";
import { FilterType } from "./types/FilterModel";
import defaultFilterConfigs from "./constants/filterConfig";

const useTable = <T,>(
  uniqKey: string,
  service: (postQuery: PostQuery) => Promise<APIResponse<T[]>>,
  postQueryValue?: PostQuery,
  onSelectionChange?: (selectedRows: T[]) => void,
  filterConfigsCustom?: FilterType[]
) => {
  const [filterConfigs, _] = useState<FilterType[]>(
    filterConfigsCustom || defaultFilterConfigs
  );
  const [postQuery, setPostQuery] = useState<PostQuery>({
    keywords: "",
    filters: [],
    sorts: [],
    page: 1,
    size: 5,
  });

  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  useEffect(() => {
    if (postQueryValue) {
      setPostQuery((prevQuery) => {
        const mergedFilters = [
          ...(prevQuery.filters || []),
          ...(postQueryValue.filters?.filter(
            (newFilter) =>
              !prevQuery.filters?.some(
                (existingFilter) => existingFilter.key === newFilter.key
              )
          ) || []),
        ];

        const mergedSorts = [
          ...(prevQuery.sorts || []),
          ...(postQueryValue.sorts?.filter(
            (newSort) =>
              !prevQuery.sorts?.some(
                (existingSort) => existingSort.key === newSort.key
              )
          ) || []),
        ];

        return {
          ...prevQuery,
          ...postQueryValue,
          filters: mergedFilters,
          sorts: mergedSorts,
        };
      });
    }
  }, [postQueryValue]);
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows]);
  const {
    data:query,
    isFetching: isLoading,
  } = useQuery({
    queryKey: [
      uniqKey,
      postQuery?.page,
      postQuery?.size,
      postQuery?.filters,
      postQuery?.sorts,
      postQuery?.keywords,
    ],
    queryFn: () => service(postQuery),
    placeholderData: keepPreviousData,
  });
  // const rows = data ?? [];
  // const totalRows = total ?? 0;
  // const currentPage = current ?? 1;
  // const pageSize = size ?? 5;
  
  
  const getInitialFilter = (field: string) => {
    return (
      postQuery?.filters?.find((filter) => filter.key === field) || {
        key: field,
        operator: "EQUAL",
        values: [],
      }
    );
  };
  const isActiveFilter = (field: string) => {
    return postQuery.filters?.some((filter) => filter.key === field) ?? false;
  };
  const resetFilter = (field: string) => {
    const filters = [...(postQuery.filters || [])];
    const existingFilterIndex = filters.findIndex(
      (filter) => filter.key === field
    );
    if (existingFilterIndex >= 0) {
      filters.splice(existingFilterIndex, 1);
    }
    setPostQuery({ ...postQuery, filters });
  };
  const handleFilterChange = (postFilter: PostFilter) => {
    console.log(postFilter);
    const filters = [...(postQuery.filters || [])];
    const existingFilterIndex = filters.findIndex(
      (filter) => filter.key === postFilter.key
    );

    if (existingFilterIndex >= 0) {
      filters[existingFilterIndex] = postFilter;
    } else {
      filters.push(postFilter);
    }

    setPostQuery({ ...postQuery, filters });
  };

  function isActiveSort(field: string) {
    return postQuery.sorts?.some((e) => e.key === field) ?? false;
  }
  function currentOrder(field: string) {
    const sort = postQuery.sorts?.find((e) => e.key === field);
    return sort?.order === "ASC"
      ? "asc"
      : sort?.order === "DESC"
      ? "desc"
      : "asc";
  }

  const handleSortChange = (field: string) => {
    let sorts: PostSort[] = [...(postQuery.sorts || [])];
    const currentSort = sorts.find((sort) => sort.key === field);

    if (currentSort) {
      if (currentSort.order === "ASC") {
        currentSort.order = "DESC";
      } else if (currentSort.order === "DESC") {
        sorts = sorts.filter((sort) => sort.key !== field);
      }
    } else {
      sorts.push({ key: field, order: "ASC" } as PostSort);
    }

    setPostQuery({ ...postQuery, sorts: sorts });
  };

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPostQuery({ ...postQuery, page: model.page + 1, size: model.pageSize });
  };

  const resetSelection = () => {
    setSelectedRows([]);
  };
  const allRowsSelected = (rows: any[]) => {
    setSelectedRows(rows);
  };
  const oneRowSelected = (row: any) => {
    const isSelected = selectedRows.includes(row);
    if (isSelected) {
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow !== row)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  return {
    filterConfigs,
    postQuery,
    query,
    isLoading,
    selectedRows,
    isActiveSort,
    currentOrder,
    handleFilterChange,
    handleSortChange,
    handlePaginationChange,
    allRowsSelected,
    oneRowSelected,
    setPostQuery,
    setSelectedRows,
    resetSelection,
    getInitialFilter,
    resetFilter,
    isActiveFilter,
  };
};

export default useTable;
