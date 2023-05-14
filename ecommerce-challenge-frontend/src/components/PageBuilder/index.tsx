import NoDataImage from "@/assets/image/no-data.png";
import PageLayout from "@/layouts/PageLayout";
import { ReactNode } from "react";
import Spinner from "../Spinner";
import Table, { IColumn } from "../Table";

interface IPageBuilderProps<T extends object> {
  className?: string;
  title: string;
  desc: string;
  columns: IColumn<T>[];
  data: T[];
  onChange : (value : T[]) => void
  loading: boolean;
  topRightButtons?: ReactNode;
}

const PageBuilder = <T extends object>(props: IPageBuilderProps<T>) => {
  const { columns, title, desc, data, loading, topRightButtons , onChange } = props;

  return (
    <PageLayout
      title={`${title} (${data.length})`}
      desc={desc}
      topRightButtons={topRightButtons}
    >
      {loading && (
        <div className="h-30 center-children  ">
          <Spinner />
        </div>
      )}
      {!loading && data.length > 0 && (
        <Table
          data={data}
          columns={columns as any}
          className="overflow-x-auto w-[1130px]"
          onChange={onChange}
        />
      )}
      {!loading && data.length === 0 && (
        <div className="h-30 w-full center-children">
          <div className="flex my-8">
            <img className="h-20" src={NoDataImage} />
            <div className="">
              <h2 className="text-5xl font-bold">Trống</h2>
              <h2 className="font-semibold text-xxl">Không có dữ liệu nào</h2>
              <p className="mt-2 text-lg text-gray-400 font-light">
                Vui lòng tạo thêm dữ liệu để bạn có thể dùng tính năng này
              </p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default PageBuilder;
