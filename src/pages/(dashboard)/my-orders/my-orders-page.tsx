import AppBreadCrumb from "@/components/common/app-breadcrumb";
import GridLayoutIcon from "@/components/icons/grid-layout-icon";
import ListLayoutIcon from "@/components/icons/list-layout-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H1 } from "@/components/ui/typography";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import MyOrdersList from "../components/my-orders-list";
import { useEffect, useState } from "react";
import { useMyOrders } from "@/services/myorders-service";
import SortMenu from "../components/sort-menu";
import { type FinalProduct, deriveData, getSpanVariant } from "@/lib/utils";
import type { IFilterSortPager } from "@/store/data-store";
import {
  DEFAULT_FILTER_SORT_PAGER,
  DEFAULT_PAGE_SIZE,
  type VariantTypes,
} from "@/lib/constant";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "My Orders",
    url: "/dashboard/orders",
  },
];

const TabItem = ({
  title,
  badge,
  variant,
  value,
}: {
  title: string;
  badge: number;
  variant: VariantTypes;
  value: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-0 md:gap-2 outline-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 rounded-none !shadow-none overflow-auto max-w-screen p-1 md:p-4"
    >
      <span>{title}</span>
      <Badge variant={variant}>{badge}</Badge>
    </TabsTrigger>
  );
};

const MyOrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("q") || "All";

  const [filterSortPager, setFilterSortPager] = useState<IFilterSortPager>(
    DEFAULT_FILTER_SORT_PAGER,
  );

  // const { order, sort, page, pageSize } = useDataStore(state => state.pages[ROUTE_PATH.MYORDERS].categories[activeTab]);
  const [currentData, setCurrentData] = useState<FinalProduct[] | null>(null);
  const [isGrid, setIsGrid] = useState(true);
  const showFilter = searchParams.get("filter") || "";
  const onChange = (value: string) => {
    const total = tabsDataArr.find((t) => t.state === value)?.count || 0;
    setFilterSortPager({
      ...DEFAULT_FILTER_SORT_PAGER,
      total,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    if (value === "All") {
      searchParams.delete("q");
    } else {
      searchParams.set("q", value);
    }
    setSearchParams(searchParams);
  };
  const onFilterChange = (value: string) => {
    if (value) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", "true");
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterSortPager({ ...DEFAULT_FILTER_SORT_PAGER, search: value });
  };

  const onDisplayChange = (value: boolean) => {
    setIsGrid(value);
  };

  const { data, isLoading: _ } = useMyOrders();

  const tabsData =
    (data?.orders?.slice() || []).map((order) => {
      const { items, state } =
        order.orders[0].message.responses[0].message.order;
      return {
        state,
        count: items.length,
        value: state,
      };
    }) || [];

  const listData =
    (data?.orders?.slice() || []).flatMap((order) => {
      const { items, id, updated_at, created_at, state } =
        order.orders[0].message.responses[0].message.order;
      return items.map((item) => {
        return {
          item,
          id,
          updated_at,
          created_at,
          state,
          dueDate: "2024-11-09T02:51:23.997Z",
        };
      });
    }) || [];
  // listData = paginate(listData.filter(d => d.state === activeTab), filterSortPager.page, filterSortPager.pageSize)
  // const allData = paginate(listData.flatMap(tab => tab), filterSortPager.page, filterSortPager.pageSize);
  const totalCount = (tabsData || []).reduce(
    (acc, item) => acc + item.count,
    0,
  );

  const tabsDataArr = [
    {
      state: "All",
      count: totalCount,
    },
    ...tabsData,
  ];

  useEffect(() => {
    if (data) {
      setFilterSortPager((prev) => ({ ...prev, total: totalCount }));
      // biome-ignore lint/complexity/noForEach: <explanation>
      tabsData.forEach(({ count }) => {
        setFilterSortPager((prev) => ({ ...prev, total: count }));
      });
    }
  }, [data, setFilterSortPager, totalCount, tabsData]);

  useEffect(() => {
    if (data && filterSortPager && activeTab) {
      let d: FinalProduct[] = [];
      if (activeTab === "All") {

        //@ts-ignore
        d = listData.flat();
      } else {
        //@ts-ignore

        d = listData.filter((d) => d.state === activeTab);
      }
      const { currentData, finalTotalCount } = deriveData(
        d,
        filterSortPager.total,
        filterSortPager.page,
        filterSortPager.pageSize,
        filterSortPager.sort,
        filterSortPager.order,
        filterSortPager.price.from,
        filterSortPager.price.to,
        filterSortPager.category_id,
        filterSortPager.productSubcategory1,
        filterSortPager.search,
      );
      if (filterSortPager.total !== finalTotalCount) {
        setFilterSortPager((prev) => ({ ...prev, total: finalTotalCount }));
      }
      setCurrentData(currentData);
    }
  }, [data, filterSortPager, activeTab, listData]);

  return (
    <div
      data-testid="my-orders-page"
      className="page-root flex flex-col gap-7 xl:pt-8"
    >
      <div className="absolute top-0 left-0 w-full h-[370px] -z-10 bg-neutral-100" />
      <AppBreadCrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap md:flex-nowrap ">
        <H1>My Orders</H1>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <form className="ml-auto flex-1 flex  gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by Order Project name or #..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                onChange={handleSearch}
              />
            </div>
            {/* <Button className="rounded-full">
                    On-Demand Request
                </Button> */}
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse  md:flex-row  justify-between gap-4 items-center  flex-wrap lg:flex-nowrap">
        <Tabs onValueChange={onChange} value={activeTab} className="w-full">
          <TabsList className="bg-transparent gap-0 md:gap-4">
            {tabsDataArr?.map((tab) => (
              <TabItem
                key={tab.state}
                title={tab.state}
                variant={getSpanVariant(tab.state)}
                badge={tab.count}
                value={tab.state}
              />
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            size="icon"
            className="rounded-full"
            onClick={() => onDisplayChange(false)}
          >
            <ListLayoutIcon className={`h-5 w-5 ${!isGrid && "opacity-30"}`} />
          </Button>
          <Button
            variant={"outline"}
            size="icon"
            className="rounded-full"
            onClick={() => onDisplayChange(true)}
          >
            <GridLayoutIcon className={`h-5 w-5 ${isGrid && "opacity-30"}`} />
          </Button>
          <Button
            variant={"outline"}
            className="border-2 border-black text-black"
            onClick={() => onFilterChange(showFilter)}
          >
            Filter
          </Button>
          <SortMenu
            setFilterSortPager={setFilterSortPager}
            filterSortPager={filterSortPager}
          />
        </div>
      </div>
      <div className="page-container">
        {currentData && (
          <MyOrdersList
            setFilterSortPager={setFilterSortPager}
            filterSortPager={filterSortPager}
            orders={currentData}
            showFilter={!!showFilter}
            showGrid={!!isGrid}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
