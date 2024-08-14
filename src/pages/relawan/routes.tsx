import { Route } from "@/types/route";
import ListRelawan from "./pages/list-relawan";
import TambahRelawan from "./pages/tambah-relawan";
import EditRelawan from "./pages/edit-relawan";
import DetailRelawan from "./pages/detail-relawan/indext";
import TambahTPSRelawan from "./pages/tambah-tps-relawan";
import EditTPSRelawan from "./pages/edit-tps-relawan";

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
    path: "relawan/edit-tps/:id/relawan/:relawanId/tps/:tpsId",
    element: <EditTPSRelawan />,
  },
];

export default relawanRoutes;
