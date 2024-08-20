import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import { getNestedItemStyles } from "../StyledDrawer";
import { useMediaQuery, useTheme } from "@mui/material";

const SidebarListItem = ({
  item,
  location,
  nestedOpen,
  handleClick,
  handleNestedClick,
}: {
  item: any;
  location: any;
  nestedOpen: any;
  handleClick: any;
  handleNestedClick: any;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const renderNestedItems = (items: any, level = 1) => (
    <List component="div" disablePadding>
      {items.map((nestedItem: any, nestedIndex: number) => (
        <div key={nestedIndex}>
          <ListItemButton
            sx={getNestedItemStyles(
              location.pathname === nestedItem.route,
              level
            )}
            onClick={() =>
              nestedItem.route
                ? handleNestedClick(nestedItem.text, nestedItem.route)
                : handleNestedClick(nestedItem.text)
            }
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === nestedItem.route ? "white" : "inherit",
              }}
            >
              {nestedItem.icon}
            </ListItemIcon>
            <ListItemText
              primary={nestedItem.text}
              primaryTypographyProps={{
                fontSize: isSmallScreen ? "0.875rem" : "1rem",
              }}
            />
            {nestedItem.nestedItems &&
              (nestedOpen[nestedItem.text] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {nestedItem.nestedItems && (
            <Collapse
              in={nestedOpen[nestedItem.text]}
              timeout="auto"
              unmountOnExit
            >
              {renderNestedItems(nestedItem.nestedItems, level + 1)}
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );

  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton
          sx={getNestedItemStyles(location.pathname === item.route)}
          onClick={() => handleClick(item)}
        >
          <ListItemIcon
            sx={{
              color: location.pathname === item.route ? "white" : "inherit",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontSize: isSmallScreen ? "0.875rem" : "1rem",
            }}
          />
          {item.nestedItems &&
            (nestedOpen[item.text] ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {item.nestedItems && (
        <Collapse in={nestedOpen[item.text]} timeout="auto" unmountOnExit>
          {renderNestedItems(item.nestedItems)}
        </Collapse>
      )}
    </div>
  );
};

export default SidebarListItem;
