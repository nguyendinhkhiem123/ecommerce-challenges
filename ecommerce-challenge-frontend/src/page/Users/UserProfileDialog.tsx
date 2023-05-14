import NoImage from "@/assets/image/no-image.jpg";
import { Dialog } from "@/components/Dialog";
import TextLine from "@/components/TextLine";
import { IUser } from "@/typings/user";
import EventEmitter from "events";
import { useEffect, useState } from "react";
const SHOW_USER_PROFILE = "SHOW_USER_PROFILE";
const FINISH_USER_PROFILE = "FINISH_USER_PROFILE";

const eventManager = new EventEmitter();

export const showUserProfileDialog = function (payload: IUser) {
  return new Promise((resolve) => {
    eventManager.emit(SHOW_USER_PROFILE, payload);
    eventManager.on(FINISH_USER_PROFILE, (isOk: boolean) => {
      resolve(isOk);
    });
  });
};

const UserProfileDialog = () => {
  const [payload, setPayload] = useState<IUser | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    eventManager.on(SHOW_USER_PROFILE, (payload: IUser) => {
      setOpenDialog(true);
      setPayload(payload);
    });
  }, []);

  const handleCancel = () => {
    eventManager.emit(FINISH_USER_PROFILE);
    setOpenDialog(false);
  };

  if (!payload) return <></>;

  return (
    <Dialog open={openDialog} onClose={handleCancel}>
      <Dialog.Header title={`Thông tin người dùng ${payload.email}`} />
      <Dialog.Content>
        <div className="flex gap-6">
          <div className="w-10 center-children border-2 border-solid border-gray-200 rounded-full">
            <img
              src={payload.image || NoImage}
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="space-y-0.5">
            <TextLine title="Mã số" content={String(payload.id)} />
            <TextLine title="Tên tài khoản" content={payload.username} />
            <TextLine title="E-mail" content={payload.email} />
            <TextLine title="Bio" content={payload.bio} />
          </div>
        </div>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Dialog.ButtonCancel>Đóng</Dialog.ButtonCancel>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default UserProfileDialog;
