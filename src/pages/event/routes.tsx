import { Route } from "@/types/route";
import ListEvent from "./pages/list-event";
import DetailEvent from "./pages/detail-event";
import TambahEvent from "./pages/tambah-event";
import EditEvent from "./pages/edit-event";
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
