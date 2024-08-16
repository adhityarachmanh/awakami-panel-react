import React, { useEffect, useState } from "react";
import {
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Breakpoint,
} from "@mui/material";
import { useFormikContext } from "formik";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { RefreshOutlined, SearchOutlined } from "@mui/icons-material";
import DataTable from "../table";
import { ColumnType } from "../table/types/ColumnModel";
import { useQuery } from "@tanstack/react-query";

interface FormikAutocompleteQueryFieldProps<T> {
  label: string;
  name: string;
  visible?: boolean;
  placeholder?: string;
  service: (labelQuery: PostQuery) => Promise<APIResponse<T[]>>;
  columns?: ColumnType<T>[];
  buildValue: (item: T) => {};
  filterKey?: keyof T;
  filterValue?: any;
  queryKey?: keyof T | string;
  labelKey: keyof T;
  maxDialogWidth?: Breakpoint;
  filterOnChange?: (value: any) => void;
}

const FormikAutocompleteQueryField = <T,>({
  label,
  filterKey,
  filterValue,
  visible = true,
  queryKey = "id",
  labelKey,
  name,
  placeholder,
  service,
  columns = [],
  buildValue,
  filterOnChange,
  maxDialogWidth = "xl",
}: FormikAutocompleteQueryFieldProps<T>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setFieldValue, initialValues, values } = useFormikContext();
  const [labelQuery, setLabelQuery] = useState<PostQuery>({
    filters: [],
    page: 1,
    size: 1,
  });
  const [dataQuery, setDataQuery] = useState<PostQuery>({
    filters: [],
    page: 1,
    size: 10,
  });

  const searchQuery = useQuery({
    queryKey: [name, labelQuery?.filters],
    queryFn: () => service(labelQuery),
  });

  const memoizedValue = React.useMemo(
    () => (values as any)[name as keyof typeof values],
    [values, name]
  );
  const queryLabel = React.useMemo(() => {
    if (
      searchQuery.isSuccess &&
      searchQuery.data?.data?.length > 0 &&
      labelQuery.filters?.length &&
      memoizedValue !== null
    ) {
      return searchQuery.data.data[0][labelKey]?.toString() ?? "";
    }
    return "";
  }, [searchQuery, labelQuery, memoizedValue]);

  useEffect(() => {
    setLabelQuery((prev) => ({
      ...prev,
      filters: [
        {
          key: queryKey as string,
          operator: "EQUAL",
          values: [
            initialValues?.[name as keyof typeof initialValues]
              ? (
                  initialValues[name as keyof typeof initialValues] as any
                ).toString()
              : "",
          ],
        },
      ],
    }));
  }, [initialValues]);

  useEffect(() => {
    if (filterKey && filterValue) {
      setDataQuery((prev) => ({
        ...prev,
        filters: [
          {
            key: filterKey as string,
            operator: "EQUAL",
            values: [filterValue],
          },
        ],
      }));
    }
  }, [filterKey, filterValue]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  if (!visible) return null;

  return (
    <>
      {console.log(queryLabel)}
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        placeholder={placeholder ?? `Cari ${label.toLowerCase()}...`}
        margin="normal"
        value={queryLabel}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { color: "black" },
          readOnly: true, // Make the TextField not clickable but not disabled
          endAdornment: (
            <IconButton
              onClick={handleDialogOpen}
              style={{ position: "absolute", right: 0 }}
            >
              <SearchOutlined />
            </IconButton>
          ),
        }}
      />

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth={maxDialogWidth}
      >
        <DialogTitle>
          {`Cari ${label}`}
          <IconButton
            onClick={() => {
              setFieldValue(name, null);
              filterOnChange?.(null);
              setLabelQuery((prev) => ({ ...prev, filters: [] }));
              handleDialogClose();
            }}
            style={{ position: "absolute", right: 16 }}
          >
            <RefreshOutlined color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DataTable
            className="wd-mt-4"
            height="500px"
            postQueryValue={dataQuery}
            selectable={false}
            showAddButton={false}
            uniqKey={name}
            service={service}
            columns={[
              ...columns,
              {
                field: "action",
                headerName: "Action",
                type: "actions",
                renderCell: (row) => (
                  <Button
                    disabled={row[queryKey as keyof T] === memoizedValue}
                    onClick={() => {
                      filterOnChange?.(row[queryKey as keyof T]);
                      setLabelQuery((prev) => ({
                        ...prev,
                        filters: [
                          {
                            key: "id",
                            operator: "EQUAL",
                            values: [row[queryKey as keyof T]?.toString()],
                          },
                        ],
                      }));
                      setFieldValue(name, buildValue(row));
                      handleDialogClose();
                    }}
                  >
                    {row[queryKey as keyof T] === memoizedValue
                      ? "Selected"
                      : "Select"}
                  </Button>
                ),
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormikAutocompleteQueryField;
