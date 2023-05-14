import { PropsWithChildren } from "react";

import { IconButton } from "../IconButton";
import { TableActionIcons } from "./icons";

export const Actions = {
  Container: ({ children }: PropsWithChildren<{}>) => {
    return <div className="flex items-center w-full">{children}</div>;
  },
  View: ({ onClick }: { onClick: () => void }) => {
    return (
      <IconButton onClick={onClick} tooltip="Xem chi tiết">
        <TableActionIcons.ViewOnlineIcon />
      </IconButton>
    );
  },
  Edit: ({ onClick }: { onClick: () => void }) => {
    return (
      <IconButton tooltip="Chỉnh sửa" onClick={onClick}>
        <TableActionIcons.EditIcon className="icon-sm" />
      </IconButton>
    );
  },
  Delete: ({ onClick }: { onClick: () => void }) => {
    return (
      <IconButton tooltip="Xoá" onClick={onClick}>
        <TableActionIcons.DeleteIcon className="icon-sm" />
      </IconButton>
    );
  },
};
