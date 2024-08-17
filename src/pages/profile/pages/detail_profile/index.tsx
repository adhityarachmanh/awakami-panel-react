import { ArrowCircleLeftOutlined, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import useDetailProfile from "./useDetailProfile";
import ImagePreview from "@/components/image/ImagePreview";
import PhotoIcon from "@mui/icons-material/Photo";
const DetailProfile = () => {
  const { query, navigate } = useDetailProfile();

  const profile = React.useMemo(() => query.data?.data, [query.data?.data]);

  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card className="wd-w-full sm:wd-w-6/12 md:wd-w-4/12 lg:wd-w-3/12">
        <CardHeader
          style={{ paddingBottom: 0 }}
          avatar={
            <IconButton size="small" onClick={() => navigate(-1)}>
              <ArrowCircleLeftOutlined />
            </IconButton>
          }
          action={
            <IconButton
              size="small"
              onClick={() => navigate(`/portal/profile/edit`)}
            >
              <EditOutlined color="warning" />
            </IconButton>
          }
          title="Detail Profile"
          titleTypographyProps={{
            fontSize: 24,
          }}
          subheaderTypographyProps={{
            fontSize: 16,
          }}
        />
        <CardContent>
          <div className="wd-flex wd-flex-col wd-w-full wd-gap-2">
            <div className="wd-flex wd-justify-center">
              <ImagePreview
                src={`${import.meta.env.VITE_BASE_URL}/${profile?.imagePath}`}
                alt="profile"
                imageStyle={{
                  width: "100%",
                  height: "300px",
                  fontSize: "100px",
                }}
              />
            </div>
            <div className="wd-flex wd-flex-col wd-w-full">
              <Typography color="primary" fontWeight="bold">
                Nama:
              </Typography>
              <Typography>{profile?.name}</Typography>
            </div>
            <div className="wd-flex wd-flex-col wd-w-full">
              <Typography color="primary" fontWeight="bold">
                Email:
              </Typography>
              <Typography>{profile?.email}</Typography>
            </div>
            <div className="wd-flex wd-flex-col wd-w-full">
              <Typography color="primary" fontWeight="bold">
                Roles:
              </Typography>
              <Typography>{profile?.roles.join(", ")}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailProfile;
