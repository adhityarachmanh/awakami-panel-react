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
import { RelawanEditFormModel } from "../../types/RelawanModel";
import FormikTextField from "@/components/formik/FormikTextField";
import {
  JENIS_KELAMIN_OPTIONS,
  JABATAN_POSKO_OPTIONS,
} from "@/constants/app_constant";
import {
  WilayahProvinsi,
  WilayahKota,
  WilayahKecamatan,
  WilayahKelurahan,
} from "@/types/WilayahModel";
import { PostQuery } from "@/types/PostQuery";
import FormikAutocompleteField from "@/components/formik/autocomplete";
import { PoskoModel } from "@/pages/posko/types/PoskoModel";

const EditRelawan = () => {
  const { id } = useParams();

  const {
    isLoading,
    validationSchema,
    data,
    mutation,
    navigate,
    poskoService,
    wilayahService,
  } = useEditRelawan(Number(id));
  if (isLoading) return <></>;
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card sx={{ width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" } }}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          avatar={
            <IconButton size="small" onClick={() => navigate(-1)}>
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
            {({ handleSubmit, setFieldValue, values }) => (
              <Form
                className="wd-grid lg:wd-grid-cols-2 wd-gap-4"
                onSubmit={handleSubmit}
              >
                <div className="wd-flex wd-flex-col ">
                  <FormikTextField name="nama" label="Nama" />
                  <FormikTextField name="noKTP" label="No KTP" />

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
                  <FormikTextField name="jabatan" label="Jabatan" />

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
                  <FormikAutocompleteField<WilayahProvinsi>
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
                  <FormikAutocompleteField<WilayahKota>
                    visible={values.provinsiId !== null}
                    filterKey="provinsiId"
                    filterValue={values.provinsiId?.toString()}
                    name="kotaId"
                    buildLabel={(row: WilayahKota) => `${row.name}`}
                    label="Kota"
                    placeholder="Cari Kota..."
                    buildValue={(row: WilayahKota) => row.id}
                    columns={[
                      { field: "name", headerName: "Name", type: "string" },
                    ]}
                    service={(postQuery: PostQuery) =>
                      wilayahService.kotaAll(postQuery)
                    }
                    filterOnChange={() => {
                      setFieldValue("kecamatanId", null);
                      setFieldValue("kelurahanId", null);
                    }}
                  />

                  <FormikAutocompleteField<WilayahKecamatan>
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
                  <FormikAutocompleteField<WilayahKelurahan>
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

export default EditRelawan;
