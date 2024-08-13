import {
  alpha,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import useTable from "../useTable";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface SelectionTableModalProps<T> {
  columns: GridColDef[];
  uniqKey: string;
  service: (postQuery: PostQuery) => Promise<APIResponse<T>>;
  selected: GridRowSelectionModel;
}

export default function SelectionTableModal<T>({
  selected,
  columns,
  uniqKey,
  service,
}: SelectionTableModalProps<T>) {
  const { selectedRows,resetSelection } = useTable<T>(columns, uniqKey, service);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        color="success"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon className="wd-text-white" />}
      >
        <span className="wd-text-white">Selected {selected.length}</span>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            resetSelection();
          }}
          disableRipple
        >
          <EditIcon />
          Unselected
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
