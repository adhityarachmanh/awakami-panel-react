import {
  AddBoxOutlined,
  AppRegistration,
  CabinOutlined,
  DashboardOutlined,
  EventOutlined,
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
  {
    text: "TPS",
    icon: <AppRegistration />,
    nestedItems: [
      {
        text: "List TPS",
        icon: <ListAltOutlined />,
        route: "/portal/tps",
      },
      {
        text: "Tambah TPS",
        icon: <AddBoxOutlined />,
        route: "/portal/tps/tambah",
      },
    ],
  },
  {
    text: "Posko",
    icon: <CabinOutlined />,
    nestedItems: [
      {
        text: "List Posko",
        icon: <ListAltOutlined />,
        route: "/portal/posko",
      },
      {
        text: "Tambah Posko",
        icon: <AddBoxOutlined />,
        route: "/portal/posko/tambah",
      },
    ],
  },
  {
    text: "Event",
    icon: <EventOutlined />,
    nestedItems: [
      {
        text: "List Event",
        icon: <ListAltOutlined />,
        route: "/portal/event",
      },
      {
        text: "Tambah Event",
        icon: <AddBoxOutlined />,
        route: "/portal/event/tambah",
      },
    ],
  },
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
