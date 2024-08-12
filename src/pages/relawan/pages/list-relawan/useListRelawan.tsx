import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import TestService from "../../services/TestService";

const useListRelawan = () => {
  const testService = new TestService();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, type: "number" },

    { field: "name", headerName: "Name", flex: 1 },

    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "createdDate",
      headerName: "Created Date",
      type: "date",
      flex: 1,
      valueFormatter: (params: any) => {
        const formattedDate = moment(params).format("DD/MM/YYYY");
        return formattedDate;
      },
    },

    {
      field: "updatedDate",

      headerName: "Updated Date",
      type: "date",

      flex: 1,
      valueFormatter: (params: any) => {
        const formattedDate = moment(params).format("DD/MM/YYYY");
        return formattedDate;
      },
    },

    {
      field: "action",
      type: "actions",
      headerName: "Action",
      cellClassName: "wd-flex wd-flex-row wd-items-center",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className="wd-flex wd-flex-row wd-gap-2 ">
            <Button variant="contained" color="warning" onClick={() => {}}>
              <span className="wd-font-sans   wd-text-white">Edit</span>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {}}
            >
              {" "}
              <span className="wd-font-sans   wd-text-white">Delete</span>
            </Button>
          </div>
        );
      },
    },
  ];
  const handleAddButtonClick = () => {
    console.log("add button clicked");
  };
  return {
    columns,
    testService,
    handleAddButtonClick,
  };
};

export default useListRelawan;
