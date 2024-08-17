import FormikDateField from "@/components/formik/FormikDateField";
import FormikImageField from "@/components/formik/FormikImageField";
import FormikTextField from "@/components/formik/FormikTextField";
import FormikTimeField from "@/components/formik/FormikTimeField";
import FormikRichTextEditor from "@/components/formik/FormikRichText";
import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { Form, useParams } from "react-router-dom";
import { BeritaFormModel } from "../../models/BeritaModel";
import useEditBerita from "./useEditBerita";

const EditBerita = () => {
  const { id } = useParams();
  const { mutation, navigate, validationSchema, data, isLoading } =
    useEditBerita(Number(id));
  if (isLoading) return <></>;
  return (
    <Formik<BeritaFormModel>
      validationSchema={validationSchema}
      initialValues={{
        Judul: data?.judul ?? "",
        Deskripsi: data?.deskripsi ?? "",
        Tanggal: data?.tanggal ?? "",
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
                    onClick={() => navigate(-1)}
                  >
                    <ArrowCircleLeftOutlined />
                  </IconButton>
                }
                title="Edit Berita"
                titleTypographyProps={{
                  fontSize: 24,
                }}
                subheaderTypographyProps={{
                  fontSize: 16,
                }}
              />
              <CardContent className="wd-flex wd-flex-col wd-gap-4">
                <FormikImageField
                  defaultSource={`${import.meta.env.VITE_BASE_URL}/${
                    data?.filePath
                  }`}
                  name="ImageFile"
                  label="Gambar"
                />
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
                    className="wd-h-[calc(700px-200px)] lg:wd-h-[calc(700px-200px)]"
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

export default EditBerita;
