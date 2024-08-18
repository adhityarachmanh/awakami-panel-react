import { Route } from "@/types/RouteModel";
import DetailProfile from "./pages/detail_profile";
import EditProfile from "./pages/edit_profile";

const profileRoutes: Route[] = [
  {
    path: "profile",
    element: <DetailProfile />,
  },
  {
    path: "profile/edit",
    element: <EditProfile />,
  },
];

export default profileRoutes;
