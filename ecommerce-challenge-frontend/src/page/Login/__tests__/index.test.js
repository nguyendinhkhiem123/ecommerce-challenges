import "@/utils/auth.utils";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "..";

describe("login", () => {
  describe("Render form", () => {
    let button;
    let spinner;
    let email;
    let password;
    let component
    beforeEach(async () => {
      component = render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      email = component.getByPlaceholderText("a@gmail.com");
      password = component.getByPlaceholderText("••••••");
      button = component.getByRole("button", "Đăng nhập");
      spinner = button.getElementsByClassName("spinner");
    });

    test("login form should be in the document", () => {
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
    test("email input should accept text", async () => {
      await act(async () => {
        await userEvent.type(email, "abc@gmail.com");
      });
      expect(email).toHaveValue("abc@gmail.com");
    });
    test("password input should accept text", async () => {
      await act(async () => {
        await userEvent.type(password, "123456");
      });
      expect(password).toHaveValue("123456");
    });

    test("Require message should be show when email empty", async () => {
      await act(async () => {
        await userEvent.type(email, "");
      });
      await act(async () => {
        await userEvent.click(button);
      });
      const emailMessage = component.getByText("Vui lòng nhập tài khoản e-mail")
      expect(emailMessage).toBeInTheDocument();
    });

    test("Invalid message should be show when email invalid", async () => {
      await act(async () => {
        await userEvent.type(email, "1234");
      });
      await act(async () => {
        await userEvent.click(button);
      });
      const emailMessage = component.getByText("E-mail không hợp lệ")
      expect(emailMessage).toBeInTheDocument();
    });

    test("Require message should be show when password empty", async () => {
      await act(async () => {
        await userEvent.type(password, "");
      });
      await act(async () => {
        await userEvent.click(button);
      });
      const emailMessage = component.getByText("Vui lòng nhập mật khẩu")
      expect(emailMessage).toBeInTheDocument();
    });
  });
});
