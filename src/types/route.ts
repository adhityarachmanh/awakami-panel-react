export interface Route {
  index?: boolean;
  path?: string;
  element: JSX.Element;
  isAuthenticated?: boolean;
  children?: Route[];
}
