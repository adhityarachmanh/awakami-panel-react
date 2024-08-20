import { ColumnType } from "../types/ColumnModel";

const applyLocalSorting = <T>(
  clientData: T[],
  field: string,
  columns: ColumnType<T>[],
  order: "ASC" | "DESC"
): T[] => {
  const sortedRows = [...(clientData || [])].sort((a, b) => {
    const aValue =
      columns.find((col) => col.field === field)?.buildClientValue?.(a) || "";
    const bValue =
      columns.find((col) => col.field === field)?.buildClientValue?.(b) || "";
    return order === "DESC"
      ? bValue.localeCompare(aValue)
      : aValue.localeCompare(bValue);
  });
  return sortedRows;
};
export { applyLocalSorting };
