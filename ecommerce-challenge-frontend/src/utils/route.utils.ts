import { RouteObject } from "react-router-dom";

export const convertToListRoutes = (
  pathsObject: Record<string, any>
): RouteObject[] => {
  const children: RouteObject[] = [];

  for (let key in pathsObject) {
    const currObject = pathsObject[key];
    const item: RouteObject = {
      path: currObject.path,
      element: currObject.element,
    };
    children?.push(item);
  }

  return children;
};
