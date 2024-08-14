import React from "react";
import { Button, TextField } from "@mui/material";
import { PostQuery } from "@/types/PostQuery";

interface DefaultHeaderTableProps {
  showAddButton: boolean;
  handleAddButtonClick?: () => void;
  postQuery: PostQuery;
  setPostQuery: (postQuery: PostQuery) => void;
}

const DefaultHeaderTable: React.FC<DefaultHeaderTableProps> = ({
  showAddButton,
  handleAddButtonClick,
  postQuery,
  setPostQuery,
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
        onInput={(e) => {
          setPostQuery({
            ...postQuery,
            keywords: (e.target as HTMLInputElement).value,
          });
        }}
        label="Pencarian"
        variant="outlined"
        placeholder="Cari..."
        size="small"
      />
    </div>
  );
};

export default DefaultHeaderTable;