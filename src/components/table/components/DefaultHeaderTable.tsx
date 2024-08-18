import React from "react";
import { Button, TextField } from "@mui/material";

interface DefaultHeaderTableProps {
  mode: "server" | "client";
  showAddButton: boolean;
  handleAddButtonClick?: () => void;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DefaultHeaderTable: React.FC<DefaultHeaderTableProps> = ({
  showAddButton,
  handleAddButtonClick,
  handleSearchChange,
}) => {
  return (
    <div className="wd-flex wd-justify-between wd-items-center">
      <div className="wd-flex wd-items-center wd-gap-2">
        {showAddButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddButtonClick}
          >
            Tambah
          </Button>
        )}
      </div>

      <TextField
        id="search-bar"
        className="text"
        onInput={handleSearchChange}
        label="Pencarian"
        variant="outlined"
        placeholder="Cari..."
        size="small"
      />
    </div>
  );
};

export default DefaultHeaderTable;
