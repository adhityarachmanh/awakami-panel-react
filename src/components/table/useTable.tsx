import { PostQuery, PostFilter } from "@/types/PostQuery";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { APIResponse } from "@/types/APIResponse";
import { FilterType } from "./types/FilterModel";
import defaultFilterConfigs from "./constants/filterConfig";
import { ColumnType } from "./types/ColumnModel";
import { debounce } from "lodash";
import { applyLocalFilters } from "./utility/localFilterLogic";
import { applyLocalSorting } from "./utility/localSortingLogic";
const useTable = <T,>(
  uniqKey: string,
  mode: "server" | "client",
  columns: ColumnType<T>[],
  service: (postQuery: PostQuery) => Promise<APIResponse<T[]>>,
  clientSearchField?: string,
  postQueryValue?: PostQuery,
  onSelectionChange?: (selectedRows: T[]) => void,
  filterConfigsCustom?: FilterType[]
) => {
  const [filterConfigs, _] = useState<FilterType[]>(
    filterConfigsCustom || defaultFilterConfigs
  );
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [clientData, setClientData] = useState<T[]>([]);
  const [postQuery, setPostQuery] = useState<PostQuery>({
    keywords: "",
    filters: [],
    sorts: [],
    page: 1,
    size: 5,
  });

  const { data: query, isFetching: isLoading } = useQuery({
    queryKey: [
      uniqKey,
      mode === "server" ? postQuery?.page : undefined,
      mode === "server" ? postQuery?.size : undefined,
      mode === "server" ? postQuery?.filters : undefined,
      mode === "server" ? postQuery?.sorts : undefined,
      mode === "server" ? postQuery?.keywords : undefined,
    ],
    queryFn: () => service(postQuery),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setClientData(query?.data || []);
  }, [query?.data]);

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
    if (mode === "server") {
      resetFilterServer(field);
    } else {
      resetFilterClient(field);
    }
  };

  const resetFilterClient = (field: string) => {
    const filters = [...(postQuery.filters || [])];
    const existingFilterIndex = filters.findIndex(
      (filter) => filter.key === field
    );
    if (existingFilterIndex >= 0) {
      filters.splice(existingFilterIndex, 1);
    }
    setPostQuery({ ...postQuery, filters });

    const filteredData = applyLocalFilters<T>(
      query?.data || [],
      filters,
      columns
    );
    setClientData(filteredData);
  };

  const resetFilterServer = (field: string) => {
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
    if (mode === "server") {
      handleFilterServer(postFilter);
    } else {
      handleFilterClient(postFilter);
    }
  };

  const handleFilterClient = (postFilter: PostFilter) => {
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

    const filteredData = applyLocalFilters<T>(
      query?.data || [],
      filters,
      columns
    );
    setClientData(filteredData);
  };

  const handleFilterServer = (postFilter: PostFilter) => {
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
    if (mode === "server") {
      handleSortServer(field);
    } else {
      handleSortClient(field);
    }
  };

  const handleSortClient = (field: string) => {
    const sorts = [...(postQuery.sorts || [])];
    const existingSortIndex = sorts.findIndex((sort) => sort.key === field);
    if (existingSortIndex >= 0) {
      const currentOrder = sorts[existingSortIndex].order;
      if (currentOrder === "ASC") {
        sorts[existingSortIndex].order = "DESC";
      } else {
        sorts.splice(existingSortIndex, 1);
      }
    } else {
      sorts.push({ key: field, order: "ASC" });
    }
    const sortedRows = applyLocalSorting<T>(
      query?.data || [],
      field,
      columns,
      sorts[existingSortIndex]?.order
    );
    setClientData(sortedRows);

    setPostQuery({ ...postQuery, sorts });
  };

  const handleSortServer = (field: string) => {
    const sorts = [...(postQuery.sorts || [])];
    const existingSortIndex = sorts.findIndex((sort) => sort.key === field);
    if (existingSortIndex >= 0) {
      const currentOrder = sorts[existingSortIndex].order;
      if (currentOrder === "ASC") {
        sorts[existingSortIndex].order = "DESC";
      } else {
        sorts.splice(existingSortIndex, 1);
      }
    } else {
      sorts.push({ key: field, order: "ASC" });
    }
    setPostQuery({ ...postQuery, sorts });
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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mode === "server") {
      handleSearchServer(e);
    } else {
      const searchTerm = e.target.value.toLowerCase();
      if (!searchTerm) {
        setClientData(query?.data || []);
      } else {
        const filteredData =
          query?.data?.filter((item) => {
            if (clientSearchField) {
              const column = columns.find(
                (col) => col.field === clientSearchField
              );
              const value = column?.buildClientValue
                ? column.buildClientValue(item)
                : (item as any)[clientSearchField];
              return value.toString().toLowerCase().includes(searchTerm);
            }
            return false;
          }) || [];
        setClientData(filteredData);
      }
    }
  };

  const handleSearchServer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const debouncedSetPostQuery = debounce((value) => {
      setPostQuery({
        ...postQuery,
        keywords: value,
      });
    }, 300);

    debouncedSetPostQuery((e.target as HTMLInputElement).value);
  };

  return {
    clientData,
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
    handleSearchChange,
  };
};

export default useTable;
