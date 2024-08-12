import {
  AddBoxOutlined,
  AppRegistration,
  CabinOutlined,
  DashboardOutlined,
  GroupOutlined,
  ListAltOutlined,
  NewReleasesOutlined,
} from "@mui/icons-material";

const menu = [
  {
    text: "Home",
    icon: <DashboardOutlined />,
    route: "/portal/home",
  },
  {
    text: "Relawan",
    icon: <GroupOutlined />,
    nestedItems: [
      {
        text: "List Relawan",
        icon: <ListAltOutlined />,
        route: "/portal/relawan",
      },
      {
        text: "Tambah Relawan",
        icon: <AddBoxOutlined />,
        route: "/portal/relawan/tambah",
      },
    ],
  },
  { text: "TPS", icon: <AppRegistration /> },
  { text: "POSKO", icon: <CabinOutlined /> },
  {
    text: "Berita",
    icon: <NewReleasesOutlined />,
    nestedItems: [
      {
        text: "List Berita",
        icon: <ListAltOutlined />,
        route: "/portal/berita",
      },
      {
        text: "Tambah Berita",
        icon: <AddBoxOutlined />,
        route: "/portal/berita/tambah",
      },
    ],
  },
];

export default menu;
