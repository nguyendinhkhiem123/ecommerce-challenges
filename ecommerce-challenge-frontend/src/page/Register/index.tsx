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

const ALERT_BAR_ID = "register";
interface IRegisterPageProps {}

interface IFormValue {
  username: string;
  email: string;
  password: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    username: yup.string().required("Vui lòng nhập tên tài khoản"),
    email: yup
      .string()
      .required("Vui lòng nhập tài khoản e-mail")
      .email("E-mail không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });

const Register: React.FC<IRegisterPageProps> = () => {
  const nav = useNavigate();
  const { isAuth } = useAuth();
  const [initialValues] = useState<IFormValue>({
    password: "",
    email: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: IFormValue) => {
    try {
      setLoading(true);
      const response = await UserServices.register({
        email: values.email,
        password: values.password,
        username: values.username,
      });

      auth.setAccount(response.data);
      alertBar(ALERT_BAR_ID, {
        message:
          "Đăng ký thành công. Chào mừng bạn đến với E-commerce challenges !",
        type: "success",
      });
      setTimeout(() => {
        nav(PATH.USERS);
      }, 1500);
    } catch (error) {
      alertBar(ALERT_BAR_ID, {
        message: "Tên tài khoản hoặc e-email đã bị trùng",
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
      title="Đăng ký"
      description="Hãy tạo một tài khoản tại E-commerce challenges"
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
                name="username"
                required
                label="Tên tài khoản"
                placeholder="nguyendinhkhiem"
              />
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
              Đăng ký
            </Button>
          </div>
          <p className="text-center text-md">
            Đã có tài khoản?{" "}
            <a
              className="underline text-blue-500 cursor-pointer"
              href={PATH.LOGIN}
            >
              Đăng nhập ngay
            </a>
          </p>
        </Form>
      </Formik>
    </LoginLayout>
  );
};

export default Register;
