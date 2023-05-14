import { withAuthorization } from "@/HOC/withAuth";
import Button from "@/components/Button";
import { confirmDialog } from "@/components/ConfirmDialog";
import { formDialog } from "@/components/FormDialog";
import PageBuilder from "@/components/PageBuilder";
import { Actions } from "@/components/PageBuilder/Actions";
import RichText from "@/components/RichText";
import { IColumn } from "@/components/Table";
import TextArea from "@/components/TextArea";
import TextField from "@/components/TextField";
import { toast } from "@/components/Toast";
import ArticleService from "@/services/article";
import { IArticle } from "@/typings/article";
import { timeSince } from "@/utils/time.utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import ArticleDetailDialog, { showArticleDetailDialog } from "./ArticleDetail";
import { AddIcon } from "./icons";

interface IWriteArticle {
  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
}
interface IArticlesPageProps {}
const Articles: React.FC<IArticlesPageProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const columns: IColumn<IArticle>[] = useMemo(
    () => [
      {
        Header: "Mã số",
        accessor: "id",
        minWidth: 120,
        width: 120,
        maxWidth: 120,
      },
      {
        Header: "Tiêu đề",
        accessor: "title",
        minWidth: 150,
        width: 150,
        maxWidth: 150,
      },
      {
        Header: "Nội dung",
        accessor: (article) => {
    
          return <p dangerouslySetInnerHTML={{
            __html : article.body
          }}></p>
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Mô tả",
        accessor: "description",
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Slug",
        accessor: "slug",
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Số lượt thích",
        accessor: "favoriteCount",
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Thẻ",
        accessor: (article) => {
          const { tagList } = article;
          if (tagList.length === 0) return null;
          return (
            <ul className="list-disc">
              {tagList.map((tag, index) => {
                return <li key={index}>{tag}</li>;
              })}
            </ul>
          );
        },
        minWidth: 150,
        width: 150,
        maxWidth: 150,
      },
      {
        Header: "Tác giả",
        accessor: (article) => {
          const { author } = article;
          return author.username;
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },

      {
        Header: "Ngày tạo",
        accessor: (article) => {
          return <div>{timeSince(String(new Date(article.created)))}</div>;
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Ngày cập nhật",
        accessor: (article) => {
          return <div>{timeSince(String(new Date(article.updated)))}</div>;
        },
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
      {
        Header: "Hành động",
        accessor: (article) => {
          return (
            <Actions.Container key={article.id}>
              <Actions.View
                onClick={() => {
                  showArticleDetailDialog(article);
                }}
              />
              <Actions.Edit
                onClick={() => {
                  handleWrite({
                    body: article.body,
                    description: article.description,
                    slug: article.slug,
                    tagList: article.tagList,
                    title: article.title,
                  });
                }}
              />
              <Actions.Delete
                onClick={() => {
                  handleDeleteArticle(article);
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
    invokedGetAllArticles();
  }, []);

  const invokedGetAllArticles = async () => {
    try {
      setLoading(true);
      const { data } = await ArticleService.getAllArticles();
      setArticles(data.articles);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = useCallback(async (article: IArticle) => {
    await confirmDialog({
      title: `Xác nhận xoá bài viết`,
      message: `Bạn có chắc bạn muốn xoá người dùng có tiêu đề là ${article.title}. Dữ liệu sẽ bị mất và không khôi phục được.`,
      confirmButton: "Xác nhận",
      onConfirm: async () => {
        try {
          await ArticleService.deleteArticle(article.slug);
          invokedGetAllArticles();
          toast.success("Xoá bài viết thành công");
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

  const handleWrite = async (article?: IWriteArticle) => {
    const isEdit = article ? true : false;
    const validationSchema = yup
      .object()
      .shape<{ [key in keyof IWriteArticle]: any }>({
        title: yup.string().required("Vui lòng nhập tiêu đề bài viết"),
        body: yup.string().required("Vui lòng nhập nội dung bài viết"),
        description: yup.string(),
      });
    await formDialog({
      title: isEdit ? `Chỉnh sủa bài viết ${article?.title}` : "Thêm bài viết",
      initValues: {
        body: article?.body || "",
        description: article?.description || "",
        tagList: article?.tagList || [],
        title: article?.title || "",
      },
      component: () => {
        return (
          <div className="space-y-1">
            <TextField
              label="Tiêu đề"
              name="title"
              placeholder="Tiêu đề của bài viết"
              required
            />
            <RichText
              label="Nội dung"
              name="body"
              placeholder="Nôi dung của bài viết"
              required
            />
            <TextArea
              label="Mô tả"
              name="description"
              placeholder="Mô tả ngắn về bài viết."
            />
          </div>
        );
      },
      onSubmit: async (values: IWriteArticle) => {
        if (isEdit) {
          try {
            await ArticleService.updateArticle(values?.slug || "", {
              body: values?.body || "",
              description: values?.description || "",
              tagList: values?.tagList || [],
              title: values?.title || "",
            });
            invokedGetAllArticles();
            toast.success("Cập nhật bài viết thành công");
          } catch (error: any) {
            if (error?.response?.status === 401) {
              toast.error("Bạn không có quyền xoá");
              return;
            }
            toast.error("Lỗi hệ thống");
          }
        } else {
          try {
            await ArticleService.createArticle({
              body: values?.body || "",
              description: values?.description || "",
              tagList: values?.tagList || [],
              title: values?.title || "",
            });
            invokedGetAllArticles();
            toast.success("Thêm bài viết thành công");
          } catch (error: any) {
            if (error?.response?.status === 401) {
              toast.error("Bạn không có quyền thêm");
              return;
            }
            toast.error("Lỗi hệ thống");
          }
        }
      },
      yup: validationSchema,
    });
  };

  return (
    <>
      <ArticleDetailDialog />
      <PageBuilder
        onChange={(value) => setArticles(value)}
        title="Bài viết"
        desc="Quản lí tất cả bài viết của hệ thống"
        columns={columns as any}
        data={articles}
        loading={loading}
        topRightButtons={
          <Button
            onClick={() => {
              handleWrite();
            }}
          >
            <div className="flex items-center gap-1">
              <AddIcon />
              Thêm bài viết
            </div>
          </Button>
        }
      />
    </>
  );
};

export default withAuthorization(Articles);
