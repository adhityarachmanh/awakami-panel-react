import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import useEditTPS from "./useEditTPS";
import { Form, Formik } from "formik";
import { TPSFormModel } from "../../types/TPSModel";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import FormikTextField from "@/components/formik/FormikTextField";

const EditTPS = () => {
  const { id } = useParams();
  const { validationSchema, navigate, mutation, tpsQuery } = useEditTPS(
    Number(id)
  );
  const tpsData = useMemo(() => {
    return tpsQuery.data ?? null;
  }, [tpsQuery.isSuccess, tpsQuery.data]);
  if (tpsQuery.isLoading) return <></>;
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
   
        <Card sx={{ width: { xs: "100%", sm: "60%", md: "40%", lg: "30%" } }}>
          <CardHeader
            style={{ paddingBottom: 0 }}
            avatar={
              <IconButton size="small" onClick={() => navigate(-1)}>
                <ArrowCircleLeftOutlined />
              </IconButton>
            }
            title="Edit TPS"
            titleTypographyProps={{
              fontSize: 24,
            }}
            subheader="Formulir Pendaftaran TPS"
            subheaderTypographyProps={{
              fontSize: 16,
            }}
          />
          <CardContent style={{ paddingTop: 0 }}>
            <Formik<TPSFormModel>
              initialValues={{
                nomor: tpsData?.nomor ?? "",
                alamat: tpsData?.alamat ?? "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                mutation.mutate(values);
              }}
            >
              {({ handleSubmit }) => (
                <Form
                  className="wd-flex wd-flex-col wd-gap-2"
                  onSubmit={handleSubmit}
                >
                  <FormikTextField name="nomor" label="Nomor" />
                  <FormikTextField
                    name="alamat"
                    label="Alamat"
                    rows={4}
                    multiline
                  />
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
          </CardContent>
        </Card>
   
    </div>
  );
};

export default EditTPS;
