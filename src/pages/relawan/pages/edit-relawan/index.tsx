import React from "react";
import useEditRelawan from "./useEditRelawan";
import { Form, useParams } from "react-router-dom";
import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Formik, Field } from "formik";
import JabatanPoskoField from "../../components/JabatanPoskoField";
import JenisKelaminField from "../../components/JenisKelaminField";
import KecamatanField from "../../components/KecamatanField";
import KelurahanField from "../../components/KelurahanField";
import KotaField from "../../components/KotaField";
import PoskoField from "../../components/PoskoField";
import ProvinsiField from "../../components/ProvinsiField";
import { RelawanEditFormModel } from "../../types/RelawanModel";

const EditRelawan = () => {
  const { id } = useParams();
  const { isLoading, validationEditSchema, data, mutation, navigate } =
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
              validationSchema={validationEditSchema}
              onSubmit={(values) => {
                mutation.mutate(values);
              }}
            >
              {({ handleSubmit, errors, touched }) => (
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
