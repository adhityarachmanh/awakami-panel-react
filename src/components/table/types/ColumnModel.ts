import { InputType } from "../constants/filterConfig";

export type ColumnType<T> = {
  field: string;
  headerName: string;
  cellClassName?: string;
  type?: InputType;
  width?: number;
  fullWidth?: boolean;
  hideFilter?: boolean ;
  hideSort?: boolean ;
  valueFormatter?: (params: T) => string;
  renderCell?: (params: T) => React.ReactNode;
  buildClientValue?: (params: T) => string;
};
