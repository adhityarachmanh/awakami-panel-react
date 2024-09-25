import React, { useEffect, useState } from "react";
import { ErrorMessage, Field } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { FormikAutocompleteFieldProps } from "../interface/AutocompleteInterface";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";

const _AutocompleteDropdown = <T,>({
  label,
  name,
  placeholder,
  debounce,
  loadingText,
  options,
  buildOption,
  service,
  mode,
  disabled = false,
}: FormikAutocompleteFieldProps<T>) => {
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
    enabled: !!service,
    queryFn: () =>
      service?.(debouncedQuery) ??
      Promise.resolve({ data: [] } as unknown as APIResponse<T[]>),
    placeholderData: keepPreviousData,
  });

  const autocompleteOptions = React.useMemo(() => {
    if (options) {
      return options.map(buildOption ?? (() => ({ label: "", value: "" })));
    } else if (queryData) {
      return queryData.data.map(
        buildOption ?? (() => ({ label: "", value: "" }))
      );
    }
    return [];
  }, [options, queryData, buildOption]);

  return (
    <>
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <Autocomplete
            disabled={disabled}
            options={autocompleteOptions}
            getOptionLabel={(option) => option.label ?? ""}
            value={
              autocompleteOptions.find(
                (option) => option.value === field.value
              ) || null
            }
            onChange={(_event, value) =>
              form.setFieldValue(field.name, value ? value.value : "")
            }
            loading={isLoadingQuery}
            loadingText={loadingText ?? "Loading..."}
            onInputChange={(_, newInputValue) => {
              if (mode === "dropdown") {
                setPostQuery((prevQuery) => ({
                  ...prevQuery,
                  keywords: newInputValue,
                }));
              }
            }}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder ?? `Cari ${label.toLowerCase()}...`}
                variant="outlined"
                fullWidth
                disabled={disabled}
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
      <ErrorMessage
        name={name}
        component="span"
        className="wd-text-red-600 wd-text-xs  wd-text-left wd-font-normal wd-ml-4"
      />
    </>
  );
};

export default _AutocompleteDropdown;
