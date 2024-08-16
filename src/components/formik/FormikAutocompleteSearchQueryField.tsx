import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { Field } from "formik";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface FormikAutocompleteSearchQueryFieldProps<T> {
  label: string;
  name: string;
  placeholder?: string;
  debounce?: number;
  loadingText?: string;
  buildOption: (item: T) => { label: string; value: any };
  service: (postQuery: PostQuery) => Promise<APIResponse<T[]>>;
}

const FormikAutocompleteSearchQueryField = <T,>({
  label,
  name,
  placeholder,
  debounce,
  loadingText,
  service,
  buildOption,
}: FormikAutocompleteSearchQueryFieldProps<T>) => {
  const [postQuery, setPostQuery] = useState<PostQuery>({
    keywords: "",
    filters: [],
    sorts: [],
    page: 1,
    size: 10,
  });

  const [debouncedQuery, setDebouncedQuery] = useState(postQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(postQuery);
    }, debounce ?? 500);
    return () => {
      clearTimeout(handler);
    };
  }, [postQuery]);

  const { data: queryData, isFetching: isLoadingQuery } = useQuery({
    queryKey: [name, debouncedQuery],
    queryFn: () => service(debouncedQuery),
    placeholderData: keepPreviousData,
  });

  const options = React.useMemo(
    () => queryData?.data.map(buildOption) ?? [],
    [queryData, buildOption]
  );

  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label ?? ""}
          value={options.find((option) => option.value === field.value) || null}
          onChange={(_, value) =>
            form.setFieldValue(field.name, value ? value.value : "")
          }
          loading={isLoadingQuery}
          loadingText={loadingText ?? "Loading..."}
          onInputChange={(_, newInputValue) => {
            setPostQuery((prevQuery) => ({
              ...prevQuery,
              keywords: newInputValue,
            }));
          }}
          // onScroll={(event) => {
          //   const listboxNode = event.currentTarget;
          //   if (
          //     listboxNode.scrollTop + listboxNode.clientHeight ===
          //     listboxNode.scrollHeight
          //   ) {
          //     setPostQuery((prevQuery) => ({
          //       ...prevQuery,
          //       page: prevQuery.page + 1,
          //     }));
          //   }
          // }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              placeholder={placeholder ?? `Cari ${label.toLowerCase()}...`}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={form.touched[name] && Boolean(form.errors[name])}
              helperText={form.touched[name] && form.errors[name]}
            />
          )}
        />
      )}
    </Field>
  );
};

export default FormikAutocompleteSearchQueryField;
