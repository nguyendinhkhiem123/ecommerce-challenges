import { PATH } from "@/common/constants/routes";
import { AlertBar, alertBar } from "@/components/AlertBar";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useAuth } from "@/hooks/useAuth";
import LoginLayout from "@/layouts/Login";
import UserServices from "@/services/user";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface ILoginPageProps {}

interface IFormValue {
  email: string;
  password: string;
}
const ALERT_BAR_ID = "login";
const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    email: yup
      .string()
      .required("Vui lòng nhập tài khoản e-mail")
      .email("E-mail không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });

const LoginPage: React.FC<ILoginPageProps> = () => {
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [initialValues] = useState<IFormValue>({
    password: "",
    email: "",
  });

  const handleSubmit = async (values: IFormValue) => {
    try {
      setLoading(true);
      const response = await UserServices.login({
        email: values.email,
        password: values.password,
      });

      auth.setAccount(response.data);
      alertBar(ALERT_BAR_ID, {
        message: "Đăng nhập thành công",
        type: "success",
      });
      setTimeout(() => {
        nav(PATH.USERS);
      }, 1500);
    } catch (error) {
      alertBar(ALERT_BAR_ID, {
        message: "Không tìm thấy tài khoản ",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      nav(PATH.USERS);
    }
  }, []);
  return (
    <LoginLayout
      title="Đăng nhập"
      description="Chào mừng bạn đến với E-commerce challenges"
    >
      <AlertBar id={ALERT_BAR_ID} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="space-y-3">
          <div className="space-y-2.5">
            <div className="space-y-1">
              <TextField
                name="email"
                required
                label="E-mail"
                placeholder="a@gmail.com"
              />
              <TextField
                type="password"
                name="password"
                required
                label="Mật khẩu"
                placeholder="••••••"
              />
            </div>
            <Button
              type="submit"
              size="md"
              className="w-full"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </div>
          <p className="text-center text-md">
            Chưa có tài khoản?{" "}
            <a
              className="underline text-blue-500 cursor-pointer"
              href={PATH.REGISTER}
            >
              Đăng ký ngay
            </a>
          </p>
        </Form>
      </Formik>
    </LoginLayout>
  );
};

export default LoginPage;
