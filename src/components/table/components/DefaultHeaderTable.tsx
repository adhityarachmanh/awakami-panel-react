import React from "react";
import { Button, TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
interface DefaultHeaderTableProps {
  mode: "server" | "client";
  showAddButton: boolean;
  handleAddButtonClick?: () => void;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mergeHeaderContent?: React.ReactNode;
}

const DefaultHeaderTable: React.FC<DefaultHeaderTableProps> = ({
  showAddButton,
  handleAddButtonClick,
  handleSearchChange,
  mergeHeaderContent,
}) => {
  const { t: tGeneral } = useTranslation("general");
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      {showAddButton || mergeHeaderContent ? (
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          gap={{ xs: 2, md: 1 }}
          width="100%"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddButtonClick}
            sx={{ width: { xs: "100%", sm: "auto" } }}
            startIcon={<AddIcon />}
          >
            {tGeneral("create")}
          </Button>

          {mergeHeaderContent}
        </Box>
      ) : (
        <Box></Box>
      )}

      <TextField
        id="search-bar"
        className="text"
        onInput={handleSearchChange}
        sx={{
          width: {
            xs: "100%",
            sm: "300px",
            md: "400px",
            lg: "500px",
            xl: "700px",
          },
        }}
        label={tGeneral("search-label")}
        variant="outlined"
        placeholder={tGeneral("search")}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default DefaultHeaderTable;
