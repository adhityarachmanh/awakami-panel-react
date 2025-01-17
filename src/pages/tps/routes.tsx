import { Route } from "@/types/RouteModel";
import ListTPS from "./pages/list-tps";
import DetailTPS from "./pages/detail-tps";
import TambahTPS from "./pages/tambah-tps";
import EditTPS from "./pages/edit-tps";
const tpsRoutes: Route[] = [
  {
    path: "tps",
    element: <ListTPS />,
  },
  {
    path: "tps/detail/:id",
    element: <DetailTPS />,
  },
  {
    path: "tps/tambah",
    element: <TambahTPS />,
  },
  {
    path: "tps/edit/:id",
    element: <EditTPS />,
  },
];

export default tpsRoutes;
