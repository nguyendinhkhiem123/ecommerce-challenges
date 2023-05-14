import Button, { IButtonProps } from "@/components/Button";
import React from "react";
import { useDialogContext } from "..";

export const _ButtonAccept: React.FC<Omit<IButtonProps, "variant">> = (
  props
) => {
  return <Button variant="primary" {...props} />;
};

export const _ButtonDanger: React.FC<Omit<IButtonProps, "variant">> = (
  props
) => {
  return <Button variant="danger" {...props} />;
};

export const _ButtonCancel: React.FC<
  Omit<IButtonProps, "variant" | "onClick">
> = (props) => {
  const { closeDialog } = useDialogContext();
  return <Button onClick={closeDialog} variant="text" {...props} />;
};
