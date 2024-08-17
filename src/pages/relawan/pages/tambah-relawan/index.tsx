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
import useTambahRelawan from "./useTambahRelawan";
import FormikTextField from "@/components/formik/FormikTextField";
import {
  JABATAN_POSKO_OPTIONS,
  JENIS_KELAMIN_OPTIONS,
} from "@/constants/app_constant";
import {
  WilayahKecamatan,
  WilayahKelurahan,
  WilayahKota,
  WilayahProvinsi,
} from "@/types/WilayahModel";
import FormikAutocompleteField from "@/components/formik/autocomplete";
import { PostQuery } from "@/types/PostQuery";
import { PoskoModel } from "@/pages/posko/types/PoskoModel";

const TambahRelawan = () => {
  const { validationSchema, navigate, mutation, poskoService, wilayahService } =
    useTambahRelawan();

  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card sx={{ width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" } }}>
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
            {({ handleSubmit, values, setFieldValue }) => (
              <Form
                className="wd-grid lg:wd-grid-cols-2 wd-gap-4"
                onSubmit={handleSubmit}
              >
                <div className="wd-flex wd-flex-col ">
                  <FormikTextField
                    name="nama"
                    label="Nama"
                    placeholder="Masukkan Nama..."
                  />
                  <FormikTextField
                    name="email"
                    label="Email"
                    placeholder="Masukkan Email..."
                  />
                  <FormikTextField
                    name="noKTP"
                    label="No KTP"
                    placeholder="Masukkan No KTP..."
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
                  <FormikAutocompleteField
                    name="jenisKelamin"
                    label="Jenis Kelamin"
                    mode="dropdown"
                    placeholder="-- Pilih Jenis Kelamin --"
                    options={Object.entries(JENIS_KELAMIN_OPTIONS)}
                    buildOption={(option: [string, string]) => ({
                      label: option[1],
                      value: option[0],
                    })}
                  />
                  <FormikTextField
                    name="jabatan"
                    label="Jabatan"
                    placeholder="Masukkan Jabatan..."
                  />
                  <FormikAutocompleteField
                    name="jabatanPosko"
                    label="Jabatan Posko"
                    mode="dropdown"
                    placeholder="-- Pilih Jabatan Posko --"
                    options={Object.entries(JABATAN_POSKO_OPTIONS)}
                    buildOption={(option: [string, string]) => ({
                      label: option[1],
                      value: option[0],
                    })}
                  />
                  <FormikAutocompleteField
                    name="poskoId"
                    label="Posko"
                    mode="dropdown"
                    placeholder="-- Pilih Posko --"
                    service={() => poskoService.list()}
                    buildOption={(option: PoskoModel) => ({
                      label: option.nama,
                      value: option.id,
                    })}
                  />
                </div>
                <div className="wd-flex wd-flex-col">
                  {/* <ProvinsiField /> */}
                  <FormikAutocompleteField
                    name="provinsiId"
                    labelKey="name"
                    label="Provinsi"
                    placeholder="Cari Provinsi..."
                    columns={[
                      { field: "name", headerName: "Name", type: "string" },
                    ]}
                    buildValue={(row: WilayahProvinsi) => row.id}
                    service={(postQuery: PostQuery) =>
                      wilayahService.provinsiAll(postQuery)
                    }
                    filterOnChange={() => {
                      setFieldValue("kotaId", null);
                      setFieldValue("kecamatanId", null);
                      setFieldValue("kelurahanId", null);
                    }}
                  />
                  <FormikAutocompleteField
                    visible={values.provinsiId !== null}
                    filterKey="provinsiId"
                    filterValue={values.provinsiId?.toString()}
                    name="kotaId"
                    labelKey="name"
                    label="Kota"
                    placeholder="Cari Kota..."
                    columns={[
                      { field: "name", headerName: "Name", type: "string" },
                    ]}
                    buildValue={(row: WilayahKota) => row.id}
                    service={(postQuery: PostQuery) =>
                      wilayahService.kotaAll(postQuery)
                    }
                    filterOnChange={() => {
                      setFieldValue("kecamatanId", null);
                      setFieldValue("kelurahanId", null);
                    }}
                  />

                  <FormikAutocompleteField
                    visible={values.kotaId !== null}
                    filterKey="kotaId"
                    filterValue={values.kotaId?.toString()}
                    name="kecamatanId"
                    labelKey="name"
                    label="Kecamatan"
                    placeholder="Cari Kecamatan..."
                    columns={[
                      { field: "name", headerName: "Name", type: "string" },
                    ]}
                    buildValue={(row: WilayahKecamatan) => row.id}
                    service={(postQuery: PostQuery) =>
                      wilayahService.kecamatanAll(postQuery)
                    }
                    filterOnChange={() => {
                      setFieldValue("kelurahanId", null);
                    }}
                  />
                  <FormikAutocompleteField
                    visible={values.kecamatanId !== null}
                    filterKey="kecamatanId"
                    filterValue={values.kecamatanId?.toString()}
                    name="kelurahanId"
                    labelKey="name"
                    label="Kelurahan"
                    placeholder="Cari Kelurahan..."
                    columns={[
                      { field: "name", headerName: "Name", type: "string" },
                    ]}
                    buildValue={(row: WilayahKelurahan) => row.id}
                    service={(postQuery: PostQuery) =>
                      wilayahService.kelurahanAll(postQuery)
                    }
                  />
                  <FormikTextField
                    name="alamat"
                    label="Alamat"
                    placeholder="Masukkan Alamat..."
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
