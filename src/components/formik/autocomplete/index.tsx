import _AutocompleteTable from "./components/_AutocompleteTable";
import _AutocompleteDropdown from "./components/_AutocompleteDropdown";
import { FormikAutocompleteFieldProps } from "./interface/AutocompleteInterface";

const FormikAutocompleteField = <T,>(
  props: FormikAutocompleteFieldProps<T>
) => {
  const { visible = true, mode = "table", ...rest } = props;
  if (!visible) return null;
  if (mode === "table") return <_AutocompleteTable<T> {...rest} />;
  return <_AutocompleteDropdown<T> {...rest} />;
};

export default FormikAutocompleteField;
