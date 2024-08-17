import RichTextView from "@/components/richtext-view";
import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
} from "@mui/material";
import useDetailBerita from "./useDetailBerita";
import { useParams } from "react-router-dom";
import richtextDefaultFormater from "@/utility/richtextFormater";
import ImagePreview from "@/components/image/ImagePreview";
import { formatDateString } from "@/utility/dateFormat";

const DetailBerita = () => {
  const { id } = useParams();
  const { data, isLoading, navigate } = useDetailBerita(Number(id));
  if (isLoading) return <></>;
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-container wd-mx-auto wd-mt-[5rem] wd-mb-4">
      <div className="wd-flex wd-flex-wrap wd-gap-4">
        <Card className="wd-w-full lg:wd-w-1/4 wd-self-start">
          <CardHeader
            style={{ paddingBottom: 0 }}
            avatar={
              <IconButton
                size="small"
                onClick={() => navigate(-1)}
              >
                <ArrowCircleLeftOutlined />
              </IconButton>
            }
            title="Detail Berita"
            titleTypographyProps={{
              fontSize: 24,
            }}
            subheaderTypographyProps={{
              fontSize: 16,
            }}
          />
          <CardContent className="wd-flex wd-flex-col wd-gap-4">
            <div className="wd-flex wd-flex-col wd-w-full wd-gap-2">
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Cover:
                </Typography>
                <ImagePreview
                  src={`${import.meta.env.VITE_BASE_URL}/${data?.filePath}`}
                  imageStyle={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                  alt={data?.judul || ""}
                />
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Judul:
                </Typography>
                <Typography>{data?.judul}</Typography>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full">
                <Typography color="primary" fontWeight="bold">
                  Tanggal:
                </Typography>
                <Typography>{formatDateString(data?.tanggal)}</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="wd-w-full lg:wd-w-2/3 wd-relative wd-min-h-[700px]">
          <CardContent>
            <div className="wd-flex wd-flex-col wd-w-full">
              <Typography color="primary" fontWeight="bold">
                Deskripsi:
              </Typography>
              <RichTextView
                content={data?.deskripsi}
                formater={richtextDefaultFormater}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailBerita;
