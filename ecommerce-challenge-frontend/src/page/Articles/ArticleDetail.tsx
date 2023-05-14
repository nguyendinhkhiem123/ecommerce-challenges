import { Dialog } from "@/components/Dialog";
import TextLine from "@/components/TextLine";
import { IArticle } from "@/typings/article";
import { timeSince } from "@/utils/time.utils";
import EventEmitter from "events";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Comment from "./Comment";

const SHOW_ARTICLE_DETAIL = "SHOW_ARTICLE_DETAIL";
const FINISH_ARTICLE_DETAIL = "FINISH_ARTICLE_DETAIL";

const eventManager = new EventEmitter();

export const showArticleDetailDialog = function (payload: IArticle) {
  return new Promise((resolve) => {
    eventManager.emit(SHOW_ARTICLE_DETAIL, payload);
    eventManager.on(FINISH_ARTICLE_DETAIL, (isOk: boolean) => {
      resolve(isOk);
    });
  });
};

const ArticleDetailDialog = () => {
  const [payload, setPayload] = useState<IArticle | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    eventManager.on(SHOW_ARTICLE_DETAIL, (payload: IArticle) => {
      setOpenDialog(true);
      setPayload(payload);
    });
  }, []);

  const handleCancel = () => {
    eventManager.emit(FINISH_ARTICLE_DETAIL);
    setOpenDialog(false);
  };

  if (!payload) return <></>;
  return (
    <Dialog open={openDialog} onClose={handleCancel} size="lg">
      <Dialog.Header title={`Thông tin bài viết ${payload.title}`} />
      <Dialog.Content>
        <div className="space-y-2">
          <Section title="Thông tin chi tiết của bài viết ">
            <div className="space-y-0.5">
              <TextLine title="Mã số" content={String(payload.id)} />
              <TextLine title="Tiêu đề" content={payload.title} />
              <TextLine title="Nôi dụng" content={payload.body} isDangerHTML />
              <TextLine title="Mô tả" content={payload.description} />
              <TextLine
                title="Số lượt thích"
                content={String(payload.favoriteCount)}
              />
              <TextLine
                title="Thẻ"
                content={payload?.tagList.toString() || ""}
              />
              <TextLine title="Tác giả" content={payload?.author?.username} />
              <TextLine
                title="Ngày tạo"
                content={String(timeSince(new Date(payload?.created)))}
              />
              <TextLine
                title="Ngày cập nhật"
                content={String(timeSince(new Date(payload?.updated)))}
              />
            </div>
          </Section>
          <Section title="Tất cả bình luần của bài viết">
            <Comment openDialog={openDialog} payload={payload} />
          </Section>
        </div>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Dialog.ButtonCancel>Đóng</Dialog.ButtonCancel>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default ArticleDetailDialog;

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  return (
    <div>
      <p className="font-semibold text-xxl text-gray-900">{title}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
};
