import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import useEditPosko from "./useEditPosko";
import { Form, Formik } from "formik";
import { PoskoFormModel } from "../../types/PoskoModel";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import FormikTextField from "@/components/formik/FormikTextField";

const EditPosko = () => {
  const { id } = useParams();
  const { validationSchema, navigate, mutation, poskoQuery } = useEditPosko(
    Number(id)
  );
  const poskoData = useMemo(() => {
    return poskoQuery.data ?? null;
  }, [poskoQuery.isSuccess, poskoQuery.data]);
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      {poskoQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <Card sx={{ width: { xs: "100%", sm: "60%", md: "40%", lg: "30%" } }}>
          <CardHeader
            style={{ paddingBottom: 0 }}
            avatar={
              <IconButton
                size="small"
                onClick={() => navigate("/portal/posko")}
              >
                <ArrowCircleLeftOutlined />
              </IconButton>
            }
            title="Edit Posko"
            titleTypographyProps={{
              fontSize: 24,
            }}
            subheader="Formulir Pendaftaran Posko"
            subheaderTypographyProps={{
              fontSize: 16,
            }}
          />
          <CardContent style={{ paddingTop: 0 }}>
            <Formik<PoskoFormModel>
              initialValues={{
                nama: poskoData?.nama ?? "",
                alamat: poskoData?.alamat ?? "",
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
                  <FormikTextField name="nama" label="Nama" />
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
      )}
    </div>
  );
};

export default EditPosko;
