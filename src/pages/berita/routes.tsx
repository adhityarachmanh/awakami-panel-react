import { Route } from "@/types/route";
import ListBerita from "./pages/list_berita";
import DetailBerita from "./pages/detail_berita";
import TambahBerita from "./pages/tambah_berita";
import EditBerita from "./pages/edit_berita";
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
