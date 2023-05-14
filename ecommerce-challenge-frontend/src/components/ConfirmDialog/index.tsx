import cn from "classnames";
import EventEmitter from "events";
import React, { useEffect, useState } from "react";
import { Dialog } from "../Dialog";
import { WarningIcon } from "./icons";

export type IConfirmDialogPayload = {
  title: string;
  message: React.ReactNode;
  confirmButton?: string;
  onConfirm?: () => Promise<void> | void;
};

const SHOW_CONFIRM = "SHOW_CONFIRM";
const FINISH_CONFIRM = "FINISH_CONFIRM";

const eventManager = new EventEmitter();

export const confirmDialog = function (payload: IConfirmDialogPayload) {
  return new Promise((resolve) => {
    eventManager.emit(SHOW_CONFIRM, payload);
    eventManager.on(FINISH_CONFIRM, (isOk: boolean) => {
      resolve(isOk);
    });
  });
};

const ConfirmDialog: React.FC = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [payload, setPayload] = useState<IConfirmDialogPayload>({
    title: "",
    message: "",
    confirmButton: "Xác nhận",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    eventManager.addListener(SHOW_CONFIRM, (payload) => {
      setOpenAlertDialog(true);
      setPayload({
        ...payload,
      });
    });
  }, []);

  const handleConfirm = async () => {
    eventManager.emit(FINISH_CONFIRM, true);
    setLoading(true);
    try {
      await payload.onConfirm?.();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setOpenAlertDialog(false);
  };

  const handleCancel = () => {
    if (loading) return;
    eventManager.emit(FINISH_CONFIRM, false);
    setOpenAlertDialog(false);
  };

  if (!payload) return null;

  return (
    <Dialog open={openAlertDialog} onClose={handleCancel}>
      <Dialog.Header title={payload.title} />
      <Dialog.Content className="flex flex-row space-x-2">
        <div
          className={cn(
            "flex-shrink-0 w-5 h-5 p-1 bg-red-200 text-red-600 rounded-full "
          )}
        >
          <WarningIcon />
        </div>
        <div>{payload.message}</div>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Dialog.ButtonCancel autoFocus>Huỷ</Dialog.ButtonCancel>
        <Dialog.ButtonDanger loading={loading} onClick={handleConfirm}>
          {payload.confirmButton || "Xác nhận"}
        </Dialog.ButtonDanger>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default ConfirmDialog;
