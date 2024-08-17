import { Route } from "@/types/route";
import ListPosko from "./pages/list_posko";
import DetailPosko from "./pages/detail_posko";
import TambahPosko from "./pages/tambah_posko";
import EditPosko from "./pages/edit_posko";
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
