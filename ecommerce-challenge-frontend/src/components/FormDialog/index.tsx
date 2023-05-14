import EventEmitter from "events";
import { useEffect, useState } from "react";
import { Dialog } from "../Dialog";

import { Form, Formik } from "formik";
import React from "react";

import { v4 } from "uuid";
import { IFormDialogPayload } from "./types";

const eventManager = new EventEmitter();

const SHOW_FORM_DIALOG = "SHOW_FORM_DIALOG";
const FINISH_FORM_DIALOG = "FINISH_FORM_DIALOG";

interface IFormDialog {}

export const formDialog = <T,>(payload: IFormDialogPayload<T>) => {
  return new Promise<void>((resolve) => {
    eventManager.emit(SHOW_FORM_DIALOG, payload);
    eventManager.on(FINISH_FORM_DIALOG, () => {
      resolve();
    });
  });
};

const FormDialog: React.FC<IFormDialog> = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [payload, setPayload] = useState<IFormDialogPayload<any>>({
    title: "",
    initValues: {},
    component: () => null,
    onSubmit: () => {},
  });
  const [loading, setLoading] = useState(false);
  const [formId] = useState(v4());

  useEffect(() => {
    eventManager.on(SHOW_FORM_DIALOG, (payload) => {
      setOpenDialog(true);
      setPayload(payload);
    });
  }, []);

  const handleCancel = () => {
    if (loading) return;

    eventManager.emit(FINISH_FORM_DIALOG);
    setOpenDialog(false);
  };

  const handleConfirm = async (values: any) => {
    setLoading(true);
    try {
      await payload.onSubmit?.(values);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    eventManager.emit(FINISH_FORM_DIALOG);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={handleCancel}>
      <Dialog.Header title={payload.title} />
      <Dialog.Content>
        <Formik
          initialValues={payload.initValues}
          onSubmit={handleConfirm}
          validationSchema={payload.yup}
        >
          {(props) => {
            return <Form id={formId}>{payload.component(props)}</Form>;
          }}
        </Formik>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Dialog.ButtonCancel>Huỷ</Dialog.ButtonCancel>
        <Dialog.ButtonAccept type="submit" form={formId} loading={loading}>
          Xác nhận
        </Dialog.ButtonAccept>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default FormDialog;
