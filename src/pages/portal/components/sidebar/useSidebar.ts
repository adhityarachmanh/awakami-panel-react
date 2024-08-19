import { useRootDispatch, useRootSelector } from "@/stores";
import {
  closeDrawer,
  transitionEnd,
  toggleNestedOpen,
} from "@/stores/reducers/sidebarReducer";
import { useNavigate, useLocation } from "react-router-dom";

const useSidebar = () => {
  const dispatch = useRootDispatch();
  
  const brandName = import.meta.env.VITE_BRAND_NAME;
  const { desktopOpen, mobileOpen, nestedOpen } = useRootSelector(
    (state) => state.sidebar
  );
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const handleDrawerTransitionEnd = () => {
    dispatch(transitionEnd());
  };

  const handleClick = (item: any) => {
    if (item.route) {
      navigate(item.route);
    } else {
      dispatch(toggleNestedOpen(item.text));
    }
  };

  const handleNestedClick = (key: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      dispatch(toggleNestedOpen(key));
    }
  };
  return {
    brandName,
    desktopOpen,
    mobileOpen,
    nestedOpen,
    navigate,
    location,
    handleDrawerClose,
    handleDrawerTransitionEnd,
    handleClick,
    handleNestedClick,
  };
};

export default useSidebar;
