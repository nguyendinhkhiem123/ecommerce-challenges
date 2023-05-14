import { Dialog } from "@/components/Dialog";
import TextLine from "@/components/TextLine";
import { IComment } from "@/typings/comment";
import { timeSince } from "@/utils/time.utils";
import EventEmitter from "events";
import { useEffect, useState } from "react";

const SHOW_COMMENT_DETAIL = "SHOW_COMMENT_DETAIL";
const FINISH_COMMENT_DETAIL = "FINISH_COMMENT_DETAIL";

const eventManager = new EventEmitter();

export const showCommentDetailDialog = function (payload: IComment) {
  return new Promise((resolve) => {
    eventManager.emit(SHOW_COMMENT_DETAIL, payload);
    eventManager.on(FINISH_COMMENT_DETAIL, (isOk: boolean) => {
      resolve(isOk);
    });
  });
};

const CommentDetailDialog = () => {
  const [payload, setPayload] = useState<IComment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    eventManager.on(SHOW_COMMENT_DETAIL, (payload: IComment) => {
      setOpenDialog(true);
      setPayload(payload);
    });
  }, []);

  const handleCancel = () => {
    eventManager.emit(FINISH_COMMENT_DETAIL);
    setOpenDialog(false);
  };

  if (!payload) return <></>;
  return (
    <Dialog open={openDialog} onClose={handleCancel} >
      <Dialog.Header title={`Thông tin bình luận`} />
      <Dialog.Content>
        <div className="space-y-0.5">
          <TextLine title="Mã số" content={String(payload.id)} />
          <TextLine title="Nôi dụng" content={payload.body} isDangerHTML />
          <TextLine title="Người bình luận" content={payload?.author?.username} />
          <TextLine
            title="Ngày tạo"
            content={String(timeSince(new Date(payload?.created)))}
          />
        </div>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Dialog.ButtonCancel>Đóng</Dialog.ButtonCancel>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default CommentDetailDialog;
