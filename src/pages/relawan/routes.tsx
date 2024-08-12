import { Route } from "@/types/route";
import ListRelawan from "./pages/list-relawan";
import TambahRelawan from "./pages/tambah-relawan";

const relawanRoutes : Route[] = [
  {
    path: "relawan",
    element: <ListRelawan/>,
  },
  {
    path: "relawan/tambah",
    element: <TambahRelawan/>,
  },
];

export default relawanRoutes;