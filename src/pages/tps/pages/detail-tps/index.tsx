import React from "react";
import useDetailTPS from "./useDetailTPS";
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

const DetailTPS = () => {
  const { id } = useParams();
  const { tpsQuery, navigate } = useDetailTPS(Number(id));
  const tpsData = React.useMemo(() => {
    if (tpsQuery.isSuccess) {
      return tpsQuery.data;
    }
    return null;
  }, [tpsQuery]);
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card className="wd-w-full lg:wd-w-4/12">
        <CardHeader
          style={{ paddingBottom: 0 }}
          avatar={
            <IconButton size="small" onClick={() => navigate("/portal/tps")}>
              <ArrowCircleLeftOutlined />
            </IconButton>
          }
          action={
            <IconButton
              size="small"
              onClick={() => navigate(`/portal/tps/edit/${id}`)}
            >
              <EditOutlined color="warning" />
            </IconButton>
          }
          title="Detail TPS"
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
                  Nomor:
                </Typography>
                <Typography>{tpsData?.nomor}</Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Alamat:
                </Typography>
                <Typography>{tpsData?.alamat}</Typography>
              </div>
            </div>
            <div className="wd-flex wd-flex-col wd-w-full wd-gap-2">
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Created By:
                </Typography>
                <Typography>{tpsData?.createdBy}</Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Created Date:
                </Typography>
                <Typography>
                  {formatDateString(tpsData?.createdDate)}
                </Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Updated By:
                </Typography>
                <Typography>{tpsData?.updatedBy}</Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Updated Date:
                </Typography>
                <Typography>
                  {formatDateString(tpsData?.updatedDate)}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailTPS;
