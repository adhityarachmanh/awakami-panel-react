import {
  InputFilterField,
  InputBetweenFilterField,
  DynamicInputFilterFields,
} from "../components/InputFilter";
import { FilterType } from "../types/FilterModel";

const defaultFilterConfigs: FilterType[] = [
  { label: "Equal", value: "EQUAL", component: InputFilterField },
  { label: "Not Equal", value: "NOT_EQUAL", component: InputFilterField },
  { label: "Between", value: "BETWEEN", component: InputBetweenFilterField },
  { label: "Like", value: "ILIKE", component: InputFilterField },
  { label: "Less Than", value: "LESS_THAN", component: InputFilterField },
  {
    label: "Less Than Or Equal",
    value: "LESS_THAN_OR_EQUAL",
    component: InputFilterField,
  },
  { label: "Greater Than", value: "GREATER_THAN", component: InputFilterField },
  {
    label: "Greater Than Or Equal",
    value: "GREATER_THAN_OR_EQUAL",
    component: InputFilterField,
  },
  { label: "In", value: "IN", component: DynamicInputFilterFields },
  { label: "Not In", value: "NOT_IN", component: DynamicInputFilterFields },
];

export default defaultFilterConfigs;
