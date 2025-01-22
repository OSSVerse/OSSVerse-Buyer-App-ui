import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const AppBreadCrumb = ({
  data
}: {
  data: { title: string; url: string }[];
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((item, index) =>
          index === data.length - 1 ? (
            <BreadcrumbItem key={item.url}>
              <BreadcrumbPage className="uppercase text-[0.75rem] text-gray-500 dark:text-gray-400">
                {item.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={item.url}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.url}
                  className="uppercase text-[0.75rem] text-gray-900 hover:underline"
                >
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator
                key={`${item.url}-separator`}
                className="text-gray-500 dark:text-gray-400"
              />
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>

  );
};

export default AppBreadCrumb;
