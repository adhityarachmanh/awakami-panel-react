import { ColumnType } from "@/components/table/types/ColumnModel";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { Breakpoint } from "@mui/material";

export interface FormikAutocompleteFieldProps<T> {
    label: string;
    name: string;
    disabled?: boolean;
    visible?: boolean;
    placeholder?: string;
    mode?: "table"| "dropdown";
    options?: T[];
    columns?: ColumnType<T>[];
    filterKey?: string;
    filterValue?: any;
    queryKey?: keyof T | string;
    labelKey?: keyof T;
    buildLabel?: (item: T) => string;
    maxDialogWidth?: Breakpoint;
    debounce?: number;
    loadingText?: string;
    service?: (postQuery: PostQuery) => Promise<APIResponse<T[]>>;
    
    buildOption?: (item: T) => { label: string; value: any };
    buildValue?: (item: T) => {};
    filterOnChange?: (value: any) => void;
  }
  