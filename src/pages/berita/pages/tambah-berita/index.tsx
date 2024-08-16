import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import useTambahBerita from "./useTambahBerita";
import { Form, Formik } from "formik";
import { BeritaFormModel } from "../../models/BeritaModel";
import FormikRichTextEditor from "@/components/formik/FormikRichText";
import FormikImageField from "@/components/formik/FormikImageField";
import FormikTextField from "@/components/formik/FormikTextField";
import FormikDateField from "@/components/formik/FormikDateField";

const TambahBerita = () => {
  const { mutation, navigate, validationSchema } = useTambahBerita();
  return (
    <Formik<BeritaFormModel>
      validationSchema={validationSchema}
      initialValues={{
        Judul: "",
        Deskripsi: "",
        Tanggal: "",
        ImageFile: null,
      }}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      {({ handleSubmit }) => (
        <div className="wd-flex wd-flex-col wd-gap-4 wd-container wd-mx-auto wd-mt-[5rem] wd-mb-4">
          <Form
            className="wd-flex wd-flex-wrap wd-gap-4"
            onSubmit={handleSubmit}
          >
            <Card className="wd-w-full lg:wd-w-1/4 wd-self-start">
              <CardHeader
                style={{ paddingBottom: 0 }}
                avatar={
                  <IconButton
                    size="small"
                    onClick={() => navigate("/portal/berita")}
                  >
                    <ArrowCircleLeftOutlined />
                  </IconButton>
                }
                title="Tambah Berita"
                titleTypographyProps={{
                  fontSize: 24,
                }}
                subheader="Formulir Pendaftaran Berita"
                subheaderTypographyProps={{
                  fontSize: 16,
                }}
              />
              <CardContent className="wd-flex wd-flex-col wd-gap-4">
                <FormikImageField name="ImageFile" label="Gambar" />
                <FormikTextField name="Judul" label="Judul" />
                <FormikDateField name="Tanggal" label="Tanggal" />
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
              </CardContent>
            </Card>
            <Card className="wd-w-full lg:wd-w-2/3 wd-relative wd-min-h-[700px]">
              <CardContent>
                <div className="wd-flex wd-flex-col wd-gap-2">
                  <Typography variant="h6" className="wd-mb-2">
                    Deskripsi
                  </Typography>
                  <FormikRichTextEditor
                    className="wd-h-[calc(700px-175px)] lg:wd-h-[calc(700px-125px)]"
                    name="Deskripsi"
                  />
                </div>
              </CardContent>
            </Card>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default TambahBerita;
