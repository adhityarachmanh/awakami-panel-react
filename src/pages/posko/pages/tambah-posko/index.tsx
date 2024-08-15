import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Form, Formik } from "formik";
import { PoskoFormModel } from "../../types/PoskoModel";
import NomorField from "../../components/NamaField";
import AlamatField from "../../components/AlamatField";
import useTambahPosko from "./useTambahPosko";

const TambahPosko = () => {
  const { validationSchema, navigate, mutation } = useTambahPosko();
  return (
    <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
      <Card sx={{ width: { xs: "100%", sm: "60%", md: "40%", lg: "30%" } }}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          avatar={
            <IconButton size="small" onClick={() => navigate("/portal/posko")}>
              <ArrowCircleLeftOutlined />
            </IconButton>
          }
          title="Tambah Posko"
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
              nama: "",
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

export default TambahPosko;
