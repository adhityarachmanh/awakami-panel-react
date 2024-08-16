import useEditRelawan from "./useEditRelawan";
import { Form, useParams } from "react-router-dom";
import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import JabatanPoskoField from "../../components/JabatanPoskoField";
import JenisKelaminField from "../../components/JenisKelaminField";
import KecamatanField from "../../components/KecamatanField";
import KelurahanField from "../../components/KelurahanField";
import KotaField from "../../components/KotaField";
import PoskoField from "../../components/PoskoField";
import ProvinsiField from "../../components/ProvinsiField";
import { RelawanEditFormModel } from "../../types/RelawanModel";
import FormikTextField from "@/components/formik/FormikTextField";

const EditRelawan = () => {
  const { id } = useParams();
  const { isLoading, validationSchema, data, mutation, navigate } =
    useEditRelawan(Number(id));

  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card sx={{ width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" } }}>
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
          title="Edit Relawan"
          titleTypographyProps={{
            fontSize: 24,
          }}
          subheader="Formulir Pendaftaran Relawan"
          subheaderTypographyProps={{
            fontSize: 16,
          }}
        />
        <CardContent style={{ paddingTop: 0 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Formik<RelawanEditFormModel>
              initialValues={{
                nama: data?.nama || "",
                noKTP: data?.noKTP || "",
                jenisKelamin: data?.jenisKelamin || "",
                jabatan: data?.jabatan || "",
                jabatanPosko: data?.jabatanPosko || "",
                poskoId: data?.poskoId || null,
                provinsiId: data?.provinsiId || null,
                kotaId: data?.kotaId || null,
                kecamatanId: data?.kecamatanId || null,
                kelurahanId: data?.kelurahanId || null,
                alamat: data?.alamat || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                mutation.mutate(values);
              }}
            >
              {({ handleSubmit }) => (
                <Form
                  className="wd-grid lg:wd-grid-cols-2 wd-gap-4"
                  onSubmit={handleSubmit}
                >
                  <div className="wd-flex wd-flex-col ">
                    <FormikTextField name="nama" label="Nama" />
                    <FormikTextField name="noKTP" label="No KTP" />

                    <JenisKelaminField />
                    <FormikTextField name="jabatan" label="Jabatan" />

                    <JabatanPoskoField />
                    <PoskoField />
                  </div>
                  <div className="wd-flex wd-flex-col">
                    <ProvinsiField />

                    <KotaField />
                    <KecamatanField />
                    <KelurahanField />
                    <FormikTextField
                      name="alamat"
                      label="Alamat"
                      rows={4}
                      multiline
                    />
                  </div>
                  <Button
                    disabled={mutation.isPending}
                    startIcon={
                      mutation.isPending ? (
                        <CircularProgress size="1rem" />
                      ) : null
                    }
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="wd-mb-4"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditRelawan;
