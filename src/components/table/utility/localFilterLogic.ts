import { PostFilter } from "@/types/PostQuery";
import { ColumnType } from "../types/ColumnModel";

const applyLocalFilters = <T>(
  data: T[],
  filters: PostFilter[],
  columns: ColumnType<T>[]
) => {
  let filteredData = data || [];
  filters.forEach((filter) => {
    if (filter.operator === "EQUAL") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value === filter.values?.[0];
      });
    } else if (filter.operator === "NOT_EQUAL") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value !== filter.values?.[0];
      });
    } else if (filter.operator === "GREATER_THAN") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value > filter.values?.[0];
      });
    } else if (filter.operator === "LESS_THAN") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value < filter.values?.[0];
      });
    } else if (filter.operator === "GREATER_THAN_OR_EQUAL") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value >= filter.values?.[0];
      });
    } else if (filter.operator === "LESS_THAN_OR_EQUAL") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value <= filter.values?.[0];
      });
    } else if (filter.operator === "ILIKE") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value.toLowerCase().includes(filter.values?.[0].toLowerCase());
      });
    } else if (filter.operator === "BETWEEN") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return value >= filter.values?.[0] && value <= filter.values?.[1];
      });
    } else if (filter.operator === "IN") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return filter.values?.includes(value);
      });
    } else if (filter.operator === "NOT_IN") {
      filteredData = filteredData.filter((item) => {
        const column = columns.find((col) => col.field === filter.key);
        const value = column?.buildClientValue
          ? column.buildClientValue(item)
          : (item as any)[filter.key];
        return !filter.values?.includes(value);
      });
    }
  });
  return filteredData;
};

export { applyLocalFilters };
