import React from "react";
import useDetailPosko from "./useDetailPosko";
import { useParams } from "react-router-dom";
import { ArrowCircleLeftOutlined, EditOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { formatDateString } from "@/utility/dateFormat";

const DetailPosko = () => {
  const { id } = useParams();
  const { poskoQuery, navigate } = useDetailPosko(Number(id));
  const poskoData = React.useMemo(() => {
    if (poskoQuery.isSuccess) {
      return poskoQuery.data;
    }
    return null;
  }, [poskoQuery]);
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card className="wd-w-full lg:wd-w-4/12">
        <CardHeader
          style={{ paddingBottom: 0 }}
          avatar={
            <IconButton size="small" onClick={() => navigate("/portal/posko")}>
              <ArrowCircleLeftOutlined />
            </IconButton>
          }
          action={
            <IconButton
              size="small"
              onClick={() => navigate(`/portal/posko/edit/${id}`)}
            >
              <EditOutlined color="warning" />
            </IconButton>
          }
          title="Detail Posko"
          titleTypographyProps={{
            fontSize: 24,
          }}
          subheaderTypographyProps={{
            fontSize: 16,
          }}
        />
        <CardContent>
          <div className="wd-grid lg:wd-grid-cols-2 wd-gap-4">
            <div className="wd-flex wd-flex-col wd-w-full wd-gap-2">
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Nama:
                </Typography>
                <Typography>{poskoData?.nama}</Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Alamat:
                </Typography>
                <Typography>{poskoData?.alamat}</Typography>
              </div>
            </div>
            <div className="wd-flex wd-flex-col wd-w-full wd-gap-2">
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Created By:
                </Typography>
                <Typography>{poskoData?.createdBy}</Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Created Date:
                </Typography>
                <Typography>
                  {formatDateString(poskoData?.createdDate)}
                </Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Updated By:
                </Typography>
                <Typography>{poskoData?.updatedBy}</Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Updated Date:
                </Typography>
                <Typography>
                  {formatDateString(poskoData?.updatedDate)}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPosko;
