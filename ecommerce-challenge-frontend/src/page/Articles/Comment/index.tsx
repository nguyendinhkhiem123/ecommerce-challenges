import Button from "@/components/Button";
import { confirmDialog } from "@/components/ConfirmDialog";
import { formDialog } from "@/components/FormDialog";
import { Actions } from "@/components/PageBuilder/Actions";
import RichText from "@/components/RichText";
import Skeleton from "@/components/Skeleton";
import Table, { IColumn } from "@/components/Table";
import { toast } from "@/components/Toast";
import CommentService from "@/services/comment";
import { IArticle } from "@/typings/article";
import { IComment } from "@/typings/comment";
import { timeSince } from "@/utils/time.utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { AddIcon } from "../icons";
import CommentDetailDialog, { showCommentDetailDialog } from "./CommentDetail";

interface ICommentProps {
  payload: IArticle;
  openDialog: boolean;
}

interface IFormValue {
  body: string;
}
const Comment: React.FC<ICommentProps> = ({ openDialog, payload }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: IColumn<IComment>[] = useMemo(
    () => [
      {
        Header: "Mã số",
        accessor: "id",
        minWidth: 120,
        width: 120,
        maxWidth: 120,
      },
      {
        Header: "Nôi dụng",
        accessor: (comment) => {
            
            return <p dangerouslySetInnerHTML={{
                __html : comment.body
            }}></p>
          },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Người bình luận",
        accessor: (comment) => {
          const { author } = comment;
          return author.username;
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },

      {
        Header: "Ngày tạo",
        accessor: (comment) => {
          return <div>{timeSince(String(new Date(comment.created)))}</div>;
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },

      {
        Header: "Hành động",
        accessor: (comment) => {
          return (
            <Actions.Container key={comment.id}>
              <Actions.View onClick={() => {
                showCommentDetailDialog(comment);
              }} />
              <Actions.Delete
                onClick={() => {
                  handleDeleteComment(comment);
                }}
              />
            </Actions.Container>
          );
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
    ],
    []
  );

  useEffect(() => {
    if (openDialog && payload) {
      invokedGetAllComments();
    }
  }, [openDialog, payload]);

  const invokedGetAllComments = async () => {
    try {
      setLoading(true);
      const { data } = await CommentService.getAllComments(payload?.slug || "");
      setComments(data.comments);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = useCallback(async (comment: IComment) => {
    await confirmDialog({
      title: `Xác nhận xoá bình luận`,
      message: `Bạn có chắc bạn muốn xoá bình luận có mã số là ${comment.id}. Dữ liệu sẽ bị mất và không khôi phục được.`,
      confirmButton: "Xác nhận",
      onConfirm: async () => {
        try {
          await CommentService.deleteComment(payload?.slug || "", comment.id);
          invokedGetAllComments();
          toast.success("Xoá bình luận thành công");
        } catch (error: any) {
          if (error?.response?.status === 401) {
            toast.error("Bạn không có quyền xoá");
            return;
          }
          toast.error("Lỗi hệ thống");
        }
      },
    });
  }, []);

  const handleCreateComment = async () => {
    const validationSchema = yup
      .object()
      .shape<{ [key in keyof IFormValue]: any }>({
        body: yup.string().required("Vui lòng nhập nội dung bình luận"),
      });
    await formDialog({
      title: "Thêm bình luận",
      component: () => {
        return (
          <RichText
            placeholder="Viết bình luận của bạn về bài viết."
            name="body"
            label="Nội dung"
            required
          />
        );
      },
      initValues: {
        body: "",
      },
      onSubmit: async(values: IFormValue) => {
        try {
            await CommentService.createComment(payload?.slug || "", values);
            invokedGetAllComments();
            toast.success("Thêm bình luận thành công");
          } catch (error: any) {
            if (error?.response?.status === 401) {
              toast.error("Bạn không có quyền thêm");
              return;
            }
            toast.error("Lỗi hệ thống");
          }
      },
      yup: validationSchema,
    });
  };
  return (
    <>
    <CommentDetailDialog/>
      {loading && <Skeleton className="h-20 w-full" />}
      {!loading && comments.length === 0 && (
        <div className="space-y-1 text-center">
          <p className="font-light">Bài viết chưa có bình luận nào</p>
          <Button onClick={handleCreateComment}>
            <div className="flex items-center gap-1">
              <AddIcon />
              Thêm bình luận
            </div>
          </Button>
        </div>
      )}
      {!loading && comments.length > 0 && (
        <div className="space-y-1">
          <div className="flex justify-end">
            <Button onClick={handleCreateComment}>
              <div className="flex items-center gap-1">
                <AddIcon />
                Thêm bình luân
              </div>
            </Button>
          </div>
          <div className="w-full overflow-x-auto">
            <Table
              data={comments}
              onChange={(value) => setComments(value)}
              columns={columns}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
