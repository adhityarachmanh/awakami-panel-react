import { InputType } from "../components/InputFilter";

export type ColumnType<T> = {
  field: string;
  headerName: string;
  cellClassName?: string;
  type?: InputType;
  width?: number;
  fullWidth?: boolean;
  valueFormatter?: (params: T) => string;
  renderCell?: (params: T) => React.ReactNode;
};
