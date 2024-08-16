import { LoginRequest } from "@/types/AuthModel";
import useLogin from "./useLogin";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormikTextField from "@/components/formik/FormikTextField";

const LoginPage = () => {
  const {
    mutation,
    validationSchema,
    brandName,
    showPassword,
    setShowPassword,
  } = useLogin();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="wd-h-screen wd-flex wd-flex-row wd-w-full wd-bg-login-right wd-bg-cover">
      <div className="wd-w-1/2 wd-gap-4  wd-flex-col wd-bg-login-left wd-bg-cover wd-justify-center wd-items-center wd-hidden md:wd-flex wd-m-3 wd-rounded-lg wd-text-white wd-shadow-md">
        {/* <img src="assets/images/logo.png" alt="logo" className="wd-w-[180px] wd-h-[180px]"> */}
        <p className="wd-text-4xl">{brandName}</p>
      </div>
      <div className="wd-w-full md:wd-w-1/2 wd-flex wd-justify-center wd-items-center">
        <div className="wd-w-full wd-max-w-sm  wd-bg-white wd-p-4 wd-rounded-md wd-shadow-md">
          <h5 className="wd-text-3xl wd-font-bold wd-text-gray-900 dark:wd-text-white">
            Masuk
          </h5>
          <p className="wd-text-gray-600">
            Masukkan email dan kata sandi untuk masuk
          </p>
          <Formik<LoginRequest>
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              mutation.mutate(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormikTextField
                  name="email"
                  label="Email"
                  placeholder="Masukkan email"
                />

                <FormikTextField
                  name="password"
                  label="Password"
                  placeholder="Masukkan password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  style={{ marginTop: "0.5rem" }}
                  disabled={mutation.isPending}
                  startIcon={
                    mutation.isPending ? <CircularProgress size="1rem" /> : null
                  }
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
