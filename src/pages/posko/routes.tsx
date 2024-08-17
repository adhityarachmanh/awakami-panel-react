import { Route } from "@/types/route";
import ListPosko from "./pages/list-posko";
import DetailPosko from "./pages/detail-posko";
import TambahPosko from "./pages/tambah-posko";
import EditPosko from "./pages/edit-posko";
const poskoRoutes: Route[] = [
  {
    path: "posko",
    element: <ListPosko />,
  },
  {
    path: "posko/detail/:id",
    element: <DetailPosko />,
  },
  {
    path: "posko/tambah",
    element: <TambahPosko />,
  },
  {
    path: "posko/edit/:id",
    element: <EditPosko />,
  },
];

export default poskoRoutes;