import { Route } from "@/types/RouteModel";
import ListRelawan from "./pages/list_relawan";
import TambahRelawan from "./pages/tambah_relawan";
import EditRelawan from "./pages/edit_relawan";
import DetailRelawan from "./pages/detail_relawan/indext";
import TambahTPSRelawan from "./pages/tambah_tps_relawan";
import EditTPSRelawan from "./pages/edit_tps_relawan";

const relawanRoutes: Route[] = [
  {
    path: "relawan",
    element: <ListRelawan />,
  },
  {
    path: "relawan/tambah",
    element: <TambahRelawan />,
  },
  {
    path: "relawan/edit/:id",
    element: <EditRelawan />,
  },
  {
    path: "relawan/detail/:id",
    element: <DetailRelawan />,
  },
  {
    path: "relawan/tambah-tps/:id",
    element: <TambahTPSRelawan />,
  },
  {
    path: "relawan/edit-tps/:id",
    element: <EditTPSRelawan />,
  },
];

export default relawanRoutes;
