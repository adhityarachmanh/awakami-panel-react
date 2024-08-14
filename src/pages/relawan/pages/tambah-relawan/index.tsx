import {
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
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

const TambahRelawan = () => {
  const { validationCreateSchema, navigate, mutation } = useTambahRelawan();
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
            validationSchema={validationCreateSchema}
            onSubmit={(values) => {
              mutation.mutate(values);
            }}
          >
            {({ values, handleSubmit, errors, touched }) => (
              <Form
                className="wd-grid lg:wd-grid-cols-2 wd-gap-4"
                onSubmit={handleSubmit}
              >
                <div className="wd-flex wd-flex-col ">
                  <div>
                    <Field
                      name="nama"
                      as={TextField}
                      label="Nama"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={touched.nama && Boolean(errors.nama)}
                      helperText={touched.nama && errors.nama}
                    />
                  </div>
                  <div>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </div>

                  <div>
                    <Field
                      name="noKTP"
                      as={TextField}
                      label="No KTP"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={touched.noKTP && Boolean(errors.noKTP)}
                      helperText={touched.noKTP && errors.noKTP}
                      inputProps={{
                        maxLength: 16,
                        onKeyPress: (
                          event: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        },
                      }}
                    />
                  </div>
                  <div>
                    <JenisKelaminField />
                  </div>
                  <div>
                    <Field
                      name="jabatan"
                      as={TextField}
                      label="Jabatan"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={touched.jabatan && Boolean(errors.jabatan)}
                      helperText={touched.jabatan && errors.jabatan}
                    />
                  </div>

                  <div>
                    <JabatanPoskoField />
                  </div>
                  <div>
                    <PoskoField />
                  </div>
                </div>
                <div className="wd-flex wd-flex-col">
                  <ProvinsiField />

                  <KotaField />
                  <KecamatanField />
                  <KelurahanField />
                  <div>
                    <Field
                      name="alamat"
                      as={TextField}
                      label="Alamat"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
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
