import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { DashboardOutlined } from "@mui/icons-material";

const menu = [
  {
    text: "Home",
    icon: <DashboardOutlined />,
    route: "/portal/home",
  },
  {
    text: "Inbox",
    icon: <InboxIcon />,
    nestedItems: [
      {
        text: "Starred",
        icon: <MailIcon />,
        nestedItems: [
          { text: "Important", icon: <MailIcon /> },
          { text: "Work", icon: <MailIcon /> },
        ],
      },
      { text: "Send email", icon: <MailIcon /> },
      { text: "Drafts", icon: <MailIcon /> },
    ],
  },
  { text: "All mail", icon: <InboxIcon /> },
  { text: "Trash", icon: <MailIcon /> },
  { text: "Spam", icon: <MailIcon /> },
];

export default menu;