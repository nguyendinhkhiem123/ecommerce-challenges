import { useCallback, useEffect, useMemo, useState } from "react";

import { withAuthorization } from "@/HOC/withAuth";

import { confirmDialog } from "@/components/ConfirmDialog";
import { formDialog } from "@/components/FormDialog";
import PageBuilder from "@/components/PageBuilder";
import { Actions } from "@/components/PageBuilder/Actions";
import { IColumn } from "@/components/Table";
import TextField from "@/components/TextField";
import { toast } from "@/components/Toast";
import UploadImage from "@/components/UploadImage";

import { useAuth } from "@/hooks/useAuth";

import UserServices from "@/services/user";

import { IUser } from "@/typings/user";

import * as yup from "yup";

import NoImage from "@/assets/image/no-image.jpg";
import UserProfileDialog, { showUserProfileDialog } from "./UserProfileDialog";

interface IUsersPageProps {}
const Users: React.FC<IUsersPageProps> = ({}) => {
  const { userProfile } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const columns: IColumn<IUser>[] = useMemo(
    () => [
      {
        Header: "Mã số",
        accessor: "id",
        minWidth: 150,
        width: 150,
        maxWidth: 150,
      },
      {
        Header: "Hình ảnh",
        accessor: (user) => {
          return (
            <img
              src={user?.image || NoImage}
              className="w-10 h-10 object-contain rounded-lg"
            />
          );
        },
        id: "image",
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Tên tài khoản",
        accessor: "username",
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "E-mail",
        accessor: "email",
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Bio",
        accessor: "bio",
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },

      {
        Header: "Hành động",
        accessor: (user) => {
          return (
            <Actions.Container key={user.id}>
              <Actions.View
                onClick={() => {
                  showUserProfileDialog(user);
                }}
              />
              {userProfile?.id === user.id && (
                <Actions.Edit
                  onClick={() => {
                    handleUpdateUser(user);
                  }}
                />
              )}
              {userProfile?.id !== user.id && (
                <Actions.Delete onClick={() => handleDeleteUser(user)} />
              )}
            </Actions.Container>
          );
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
    ],
    [userProfile]
  );

  useEffect(() => {
    invokedGetAllUsers();
  }, []);

  const invokedGetAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UserServices.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [userProfile]);

  const handleDeleteUser = useCallback(
    async (user: IUser) => {
      await confirmDialog({
        title: `Xác nhận xoá người dùng`,
        message: `Bạn có chắc bạn muốn xoá người dùng x có email là ${user.email}. Dữ liệu sẽ bị mất và không khôi phục được.`,
        confirmButton: "Xác nhận",
        onConfirm: async () => {
          try {
            await UserServices.deleteUser(user.email);
            invokedGetAllUsers();
            toast.success("Xoá người dùng thành công ");
          } catch (error: any) {
            if (error?.response?.status === 400) {
              toast.error("Bạn không thể xoá chính mình");
              return;
            }
            if (error?.response?.status === 401) {
              toast.error("Bạn không có quyền xoá");
              return;
            }
            toast.error("Lỗi hệ thống");
          }
        },
      });
    },
    [userProfile]
  );

  const handleUpdateUser = async (user: IUser) => {
    const validationSchema = yup.object().shape<{ [key in keyof IUser]: any }>({
      bio: yup.string(),
      email: yup
        .string()
        .required("Vui lòng nhập e-mail")
        .email("E-mail không hợp lệ"),
      image: yup.string(),
      id: yup.string(),
      token: yup.string(),
      username: yup.string().required("Vui lòng nhập tên tài khoản"),
    });
    await formDialog({
      title: `Chỉnh sửa người dùng ${user.email}`,
      initValues: {
        bio: user.bio,
        email: user.email,
        id: user.id,
        image: user.image,
        token: user.token,
        username: user.username,
      },
      onSubmit: async (values: IUser) => {
        try {
          await UserServices.updateUser({
            bio: values.bio,
            email: values.email,
            image: values.image,
            username: values.username,
          });
          invokedGetAllUsers();
          toast.success("Cập nhật thành công");
        } catch (error: any) {
          console.log(error);
          if (error?.response?.status === 401) {
            toast.error("Bạn không có quyền xoá");
            return;
          }
          if (error?.response.status === 413) {
            toast.error("Ảnh quá lớn. Vui lòng chọn lại");
            return;
          }
          toast.error("Lỗi hệ thống");
        }
      },
      component: () => {
        return (
          <div className="space-y-1">
            <UploadImage name="image" label="Hình ảnh" />
            <TextField
              label="Tên tài khoản"
              name="username"
              placeholder="nguyendinhkhiem"
              required
            />
            <TextField
              label="E-mail"
              name="email"
              placeholder="a@gmail.com"
              required
            />
            <TextField label="Bio" name="bio" placeholder="Bio" />
          </div>
        );
      },
      yup: validationSchema,
    });
  };

  return (
    <>
      <UserProfileDialog />
      <PageBuilder
        onChange={(value) => setUsers(value)}
        title="Người dùng"
        desc="Quản lí tất cả người dùng của hệ thống"
        columns={columns as any}
        data={users}
        loading={loading}
      />
    </>
  );
};

export default withAuthorization(Users);
