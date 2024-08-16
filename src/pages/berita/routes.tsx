import { Route } from "@/types/route";
import ListBerita from "./pages/list-berita";
import DetailBerita from "./pages/detail-berita";
import TambahBerita from "./pages/tambah-berita";
import EditBerita from "./pages/edit-berita";
const beritaRoutes: Route[] = [
  {
    path: "berita",
    element: <ListBerita />,
  },
  {
    path: "berita/detail/:id",
    element: <DetailBerita />,
  },
  {
    path: "berita/tambah",
    element: <TambahBerita />,
  },
  {
    path: "berita/edit/:id",
    element: <EditBerita />,
  },
];

export default beritaRoutes;
