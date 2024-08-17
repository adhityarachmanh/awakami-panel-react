import { ArrowCircleLeftOutlined, EditOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import React from "react";
import useEditProfile from "./useEditProfile";
import FormikImageField from "@/components/formik/FormikImageField";
import { Form, Formik } from "formik";
import { ProfileFormModel } from "../../types/ProfileModel";
import FormikTextField from "@/components/formik/FormikTextField";

const EditProfile = () => {
  const { query, navigate, isLoading, validationSchema, mutation } =
    useEditProfile();

  const profile = React.useMemo(() => query?.data, [query?.data]);
  if (isLoading) return <></>;
  return (
    <Formik<ProfileFormModel>
      validationSchema={validationSchema}
      initialValues={{
        Name: profile?.name ?? "",
        Email: profile?.email ?? "",
        ImageFile: null,
      }}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      {({ handleSubmit }) => (
        <div className="wd-flex wd-flex-col wd-gap-4 wd-items-center wd-w-full wd-container wd-mx-auto wd-mt-[10rem] wd-m-8">
          <Form
            className="wd-w-full sm:wd-w-6/12 md:wd-w-4/12 lg:wd-w-3/12"
            onSubmit={handleSubmit}
          >
            <Card>
              <CardHeader
                style={{ paddingBottom: 0 }}
                avatar={
                  <IconButton size="small" onClick={() => navigate(-1)}>
                    <ArrowCircleLeftOutlined />
                  </IconButton>
                }
                action={
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/portal/profile/edit`)}
                  >
                    <EditOutlined color="warning" />
                  </IconButton>
                }
                title="Edit Profile"
                titleTypographyProps={{
                  fontSize: 24,
                }}
                subheaderTypographyProps={{
                  fontSize: 16,
                }}
              />
              <CardContent>
                <div className="wd-flex wd-flex-col wd-w-full wd-gap-2">
                  <div className="wd-flex wd-justify-center">
                    <FormikImageField
                      defaultSource={`${import.meta.env.VITE_BASE_URL}/${
                        profile?.imagePath
                      }`}
                      imageStyle={{
                        width: "100%",
                        height: "300px",
                        fontSize: "100px",
                      }}
                      name="ImageFile"
                      label="Gambar"
                    />
                  </div>
                  <FormikTextField name="Name" label="Name" />
                  <FormikTextField name="Email" label="Email" />
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
                </div>
              </CardContent>
            </Card>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default EditProfile;
