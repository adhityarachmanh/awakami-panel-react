export interface Route {
  index?: boolean;
  path?: string;
  element: JSX.Element;
  GuardComponent?: React.ComponentType<any>;
  children?: Route[];
}
