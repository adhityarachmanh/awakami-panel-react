import React, { useEffect, useState } from "react";
import {
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormikContext } from "formik";
import { PostQuery } from "@/types/PostQuery";
import { RefreshOutlined, SearchOutlined } from "@mui/icons-material";
import DataTable from "../../../table";
import { useQuery } from "@tanstack/react-query";
import { FormikAutocompleteFieldProps } from "../interface/AutocompleteInterface";
import { APIResponse } from "@/types/APIResponse";

const _AutocompleteTable = <T,>({
  label,
  filterKey,
  filterValue,
  queryKey = "id",
  labelKey,
  name,
  placeholder,
  service,
  columns = [],
  buildValue,
  filterOnChange,
  maxDialogWidth = "sm",
  buildLabel,
}: FormikAutocompleteFieldProps<T>) => {
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
    enabled: !!service,
    queryFn: () =>
      service?.(labelQuery) ??
      Promise.resolve({ data: [] } as unknown as APIResponse<T[]>),
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
      return searchQuery.data.data.length === 0
        ? "No Label"
        : buildLabel
        ? buildLabel(searchQuery.data.data[0])
        : searchQuery.data.data[0][labelKey as keyof T]?.toString() ?? "";
    }
    return "";
  }, [searchQuery, buildLabel, labelQuery, memoizedValue]);

  useEffect(() => {
    if (initialValues?.[name as keyof typeof initialValues]) {
      const initialValue = initialValues[name as keyof typeof initialValues];
      setLabelQuery((prev) => ({
        ...prev,
        filters: [
          {
            key: queryKey as string,
            operator: "EQUAL",
            values: [initialValue ? String(initialValue) : ""],
          },
        ],
      }));
    }
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
  return (
    <>
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
            service={
              service ??
              (() =>
                Promise.resolve({ data: [] } as unknown as APIResponse<T[]>))
            }
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
                      setFieldValue(name, buildValue?.(row) ?? "");
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

export default _AutocompleteTable;
