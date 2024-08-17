import { Route } from "@/types/route";
import ListEvent from "./pages/list_event";
import DetailEvent from "./pages/detail_event";
import TambahEvent from "./pages/tambah_event";
import EditEvent from "./pages/edit_event";
const eventRoutes: Route[] = [
  {
    path: "event",
    element: <ListEvent />,
  },
  {
    path: "event/detail/:id",
    element: <DetailEvent />,
  },
  {
    path: "event/tambah",
    element: <TambahEvent />,
  },
  {
    path: "event/edit/:id",
    element: <EditEvent />,
  },
];

export default eventRoutes;
