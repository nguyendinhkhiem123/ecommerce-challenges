import { PATH } from "@/common/constants/routes";
import Articles from "@/page/Articles";
import Users from "@/page/Users";
import { ArticlesIcon, UserGroupIcon } from "./icons";

export const _privateRoutes = {
  Users: {
    title: "Danh sách người dùng",
    element: <Users />,
    path: PATH.USERS,
    icon: <UserGroupIcon />,
  },
  Articles: {
    title: "Danh sách bài viết",
    element: <Articles />,
    path: PATH.ARTICLES,
    icon: <ArticlesIcon />,
  }
};
