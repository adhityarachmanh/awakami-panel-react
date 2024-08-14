import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { Field } from "formik";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { useQuery } from "@tanstack/react-query";

interface AutocompleteQueryProps<T> {
  label: string;
  name: string;
  placeholder?: string;
  debounce?: number;
  loadingText?: string;
  buildValue: (item: T) => { label: string; value: any };
  service: (postQuery: PostQuery) => Promise<APIResponse<T[]>>;
}

const AutocompleteQuery = <T,>({
  label,
  name,
  placeholder,
  debounce,
  loadingText,
  service,
  buildValue,
}: AutocompleteQueryProps<T>) => {
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
  });

  const options = React.useMemo(
    () => queryData?.data.map(buildValue) ?? [],
    [queryData, buildValue]
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

export default AutocompleteQuery;
