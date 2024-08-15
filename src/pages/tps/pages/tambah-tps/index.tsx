import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import useTambahTPS from "./useTambahTPS";
import { Form, Formik } from "formik";
import { TPSFormModel } from "../../types/TPSModel";
import NomorField from "../../components/NomorField";
import AlamatField from "../../components/AlamatField";

const TambahTPS = () => {
  const { validationSchema, navigate, mutation } = useTambahTPS();
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card sx={{ width: { xs: "100%", sm: "60%", md: "40%", lg: "30%" } }}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          avatar={
            <IconButton size="small" onClick={() => navigate("/portal/tps")}>
              <ArrowCircleLeftOutlined />
            </IconButton>
          }
          title="Tambah TPS"
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
              nomor: "",
              alamat: "",
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
                <NomorField />
                <AlamatField />
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

export default TambahTPS;
