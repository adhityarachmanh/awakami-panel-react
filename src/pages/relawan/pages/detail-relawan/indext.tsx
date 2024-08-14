import { ArrowCircleLeftOutlined, EditOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useDetailRelawan from "./useDetailRelawan";
import React from "react";
import DataTable from "@/components/table";

const DetailRelawan = () => {
  const { id } = useParams();
  const {
    relawanQuery,
    navigate,
    getJenisKelamin,
    getJabatanPosko,
    tpsColumns,
    tpsService,
  } = useDetailRelawan(Number(id));
  const relawanData = React.useMemo(() => {
    if (relawanQuery.isSuccess) {
      return relawanQuery.data;
    }
    return null;
  }, [relawanQuery]);
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <div className="wd-flex wd-flex-wrap wd-gap-4 wd-w-full">
        <Card className="wd-w-full lg:wd-w-4/12">
          <CardHeader
            style={{ paddingBottom: 0 }}
            avatar={
              <IconButton
                size="small"
                onClick={() => navigate("/portal/relawan")}
              >
                <ArrowCircleLeftOutlined />
              </IconButton>
            }
            action={
              <IconButton
                size="small"
                onClick={() => navigate(`/portal/relawan/edit/${id}`)}
              >
                <EditOutlined color="warning" />
              </IconButton>
            }
            title="Detail Relawan"
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
                  <Typography>{relawanData?.nama}</Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    No KTP:
                  </Typography>
                  <Typography>{relawanData?.noKTP}</Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Jenis Kelamin:
                  </Typography>
                  <Typography>
                    {getJenisKelamin(relawanData?.jenisKelamin)}
                  </Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Jabatan:
                  </Typography>
                  <Typography>{relawanData?.jabatan}</Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Jabatan Posko:
                  </Typography>
                  <Typography>
                    {getJabatanPosko(relawanData?.jabatanPosko)}
                  </Typography>
                </div>
              </div>
              <div className="wd-flex wd-flex-col wd-w-full wd-gap-2">
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Provinsi:
                  </Typography>
                  <Typography>{relawanData?.provinsi?.name}</Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Kabupaten:
                  </Typography>
                  <Typography>{relawanData?.kota?.name}</Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Kecamatan:
                  </Typography>
                  <Typography>{relawanData?.kecamatan?.name}</Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Kelurahan:
                  </Typography>
                  <Typography>{relawanData?.kelurahan?.name}</Typography>
                </div>
                <div className="wd-flex wd-flex-col wd-w-full">
                  <Typography color="primary" fontWeight="bold">
                    Alamat:
                  </Typography>
                  <Typography>{relawanData?.alamat}</Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="wd-w-full lg:wd-w-7/12">
          <CardHeader
            style={{ paddingBottom: 0 }}
            title="TPS"
            titleTypographyProps={{
              fontSize: 24,
            }}
            subheaderTypographyProps={{
              fontSize: 16,
            }}
          />
          <CardContent>
            <DataTable
              uniqKey="tps-relawan"
              handleAddButtonClick={() =>
                navigate(`/portal/relawan/tambah-tps/${id}`)
              }
              paginable={false}
              selectable={false}
              columns={tpsColumns}
              service={tpsService}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailRelawan;
