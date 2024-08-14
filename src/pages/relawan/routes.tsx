import { Route } from "@/types/route";
import ListRelawan from "./pages/list-relawan";
import TambahRelawan from "./pages/tambah-relawan";
import EditRelawan from "./pages/edit-relawan";

const relawanRoutes : Route[] = [
  {
    path: "relawan",
    element: <ListRelawan/>,
  },
  {
    path: "relawan/tambah",
    element: <TambahRelawan/>,
  },
  {
    path: "relawan/edit/:id",
    element: <EditRelawan/>,
  },
];

export default relawanRoutes;