import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import { Form, useParams } from "react-router-dom";
import { TPSRelawanFormModel } from "../../types/TPSRelawanModel";
import useEditTPSRelawan from "./useEditTPSRelawan";
import { useMemo } from "react";
import FormikAutocompleteField from "@/components/formik/autocomplete";
import { TPSModel } from "@/pages/tps/types/TPSModel";

const EditTPSRelawan = () => {
  const { id } = useParams();
  const { mutation, navigate, validationSchema, tpsQuery, tpsService } =
    useEditTPSRelawan(Number(id));
  const tpsData = useMemo(() => {
    return tpsQuery.data ?? null;
    return null;
  }, [tpsQuery.isSuccess, tpsQuery.data]);
  if (tpsQuery.isLoading) return <></>;
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card sx={{ width: { xs: "100%", sm: "60%", md: "40%", lg: "30%" } }}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          avatar={
            <IconButton
              size="small"
              onClick={() =>
                navigate(-1)
              }
            >
              <ArrowCircleLeftOutlined />
            </IconButton>
          }
          title="Edit TPS Relawan"
          titleTypographyProps={{
            fontSize: 24,
          }}
          subheader="Formulir Edit TPS untuk Relawan"
          subheaderTypographyProps={{
            fontSize: 16,
          }}
        />
        <CardContent style={{ paddingTop: 0 }}>
          <Formik<TPSRelawanFormModel>
            initialValues={{
              tpsId: tpsData?.tpsId ?? 0,
              relawanId: tpsData?.relawanId ?? 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              mutation.mutate(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form
                className="wd-flex wd-flex-col wd-gap-4"
                onSubmit={handleSubmit}
              >
                <FormikAutocompleteField
                  name="tpsId"
                  label="TPS"
                  mode="dropdown"
                  placeholder="-- Pilih TPS --"
                  service={() => tpsService.list()}
                  buildOption={(option: TPSModel) => ({
                    label: option.nomor,
                    value: option.id,
                  })}
                />
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

export default EditTPSRelawan;
