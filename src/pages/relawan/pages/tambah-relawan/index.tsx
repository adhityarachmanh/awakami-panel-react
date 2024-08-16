import {
  Card,
  CardContent,
  Button,
  CardHeader,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import { RelawanFormModel } from "../../types/RelawanModel";
import JabatanPoskoField from "../../components/JabatanPoskoField";
import JenisKelaminField from "../../components/JenisKelaminField";
import PoskoField from "../../components/PoskoField";
import ProvinsiField from "../../components/ProvinsiField";
import KotaField from "../../components/KotaField";
import KecamatanField from "../../components/KecamatanField";
import KelurahanField from "../../components/KelurahanField";
import useTambahRelawan from "./useTambahRelawan";
import FormikTextField from "@/components/formik/FormikTextField";

const TambahRelawan = () => {
  const { validationSchema, navigate, mutation } = useTambahRelawan();
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
          title="Tambah Relawan"
          titleTypographyProps={{
            fontSize: 24,
          }}
          subheader="Formulir Pendaftaran Relawan"
          subheaderTypographyProps={{
            fontSize: 16,
          }}
        />
        <CardContent style={{ paddingTop: 0 }}>
          <Formik<RelawanFormModel>
            initialValues={{
              nama: "",
              email: "",
              noKTP: "",
              jenisKelamin: "",
              jabatan: "",
              jabatanPosko: "",
              poskoId: null,
              provinsiId: null,
              kotaId: null,
              kecamatanId: null,
              kelurahanId: null,
              alamat: "",
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
                  <FormikTextField name="email" label="Email" />
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
                    mutation.isPending ? <CircularProgress size="1rem" /> : null
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TambahRelawan;
