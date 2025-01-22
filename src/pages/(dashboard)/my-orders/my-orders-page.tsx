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
import { type OrderResponse, useMyOrders } from "@/services/myorders-service";
import SortMenu from "../components/sort-menu";
import { type FinalProduct, deriveData, getSpanVariant } from "@/lib/utils";
import type { IFilterSortPager } from "@/store/data-store";
import { DEFAULT_FILTER_SORT_PAGER, DEFAULT_PAGE_SIZE, LOCAL_DEFAULT_CATEGORY_IDS, LOCAL_DEFAULT_PRODUCT_SUB_CATEOGRY_1, type VariantTypes, } from "@/lib/constant";

const breadcrumb = [
  { title: "Dashboard", url: "/dashboard" },
  { title: "My Orders", url: "/dashboard/orders" },
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
  const { data, isLoading: _ } = useMyOrders();
  const [orders, setOrders] = useState<OrderResponse['orders'] | null>(null);

  useEffect(() => {
    if (data) setOrders(data);
  }, [data]);

  if (_) { return <div>Loading...</div> }
  if (!data) { return <div>No data</div> }
  return orders && <OrdersPage data={orders} />;
}

const prepareTabsData = (data: FinalProduct[] | null) => {
  if (!data) return [];
  const stateCounts: Record<string, { state: string; count: number; value: string }> = {};
  data.map((order) => {
    const { state } = order;
    if (stateCounts[state]) {
      stateCounts[state].count += 1;
    } else {
      stateCounts[state] = { state, count: 1, value: state };
    }
  });
  return Object.values(stateCounts);
}

const prepareListData = (data: OrderResponse["orders"]) => {
  return data?.map((order) => {
    const orderMessage = order.orders[0]?.message.responses[0]?.message.order;
    if (orderMessage) {
      const { items, id, updated_at, created_at, state } = orderMessage;
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
    }
    // Return an empty array if no valid orderMessage is found
    return [];
  }) || [];
};


const OrdersPage = ({ data }: { data: OrderResponse['orders'] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("q") || "All";
  const [filterSortPager, setFilterSortPager] = useState<IFilterSortPager>(DEFAULT_FILTER_SORT_PAGER);
  const [currentData, setCurrentData] = useState<FinalProduct[] | null>(null);
  const [isGrid, setIsGrid] = useState(true);
  const showFilter = searchParams.get("filter") || "";
  const tabsData = prepareTabsData(currentData);
  const listData = prepareListData(data);
  const totalCount = (tabsData || []).reduce((acc, item) => acc + item.count, 0);
  const tabsDataArr = [{ state: "All", count: totalCount }, ...tabsData];
  const onChange = (value: string) => {
    const total = tabsDataArr.find((tab) => tab.state === value)?.count || 0;
    setFilterSortPager({
      ...DEFAULT_FILTER_SORT_PAGER,
      total,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    if (value === "All") searchParams.delete("q");
    else searchParams.set("q", value);
    setSearchParams(searchParams);
  };

  const onFilterChange = (value: string) => {
    if (value) searchParams.delete("filter");
    else searchParams.set("filter", "true");
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterSortPager({ ...DEFAULT_FILTER_SORT_PAGER, search: value });
  };

  const onDisplayChange = (value: boolean) => setIsGrid(value);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data) {
      setFilterSortPager((prev) => ({ ...prev, total: totalCount }));
      // biome-ignore lint/complexity/noForEach: <explanation>
      tabsData.forEach(({ count }) => {
        setFilterSortPager((prev) => ({ ...prev, total: count }));
      });
    }
  }, [data, setFilterSortPager, totalCount]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data && filterSortPager && activeTab) {
      const productSubcategory1Set = new Set<string>();
      const categoryIdSet = new Set<string>();

      data.map((orderArray) => {
        orderArray.orders?.map((order) => {
          order.message?.responses?.map((response) => {
            response?.message?.order?.items?.map((item) => {
              if (item.productSubcategory1) {
                productSubcategory1Set.add(item.productSubcategory1);
              }
              if (item.category_id) {
                categoryIdSet.add(item.category_id);
              }
            });
          });
        });
      });
      const productSubcategory1Array: string[] = Array.from(productSubcategory1Set);
      const categoryIdArray: string[] = Array.from(categoryIdSet);

      categoryIdArray.map((categoryId: string) => {
        if (!LOCAL_DEFAULT_CATEGORY_IDS.includes(categoryId)) {
          LOCAL_DEFAULT_CATEGORY_IDS.push(categoryId);
        }
      });

      productSubcategory1Array.map((productSubcategory: string) => {
        if (!LOCAL_DEFAULT_PRODUCT_SUB_CATEOGRY_1.includes(productSubcategory)) {
          LOCAL_DEFAULT_PRODUCT_SUB_CATEOGRY_1.push(productSubcategory);
        }
      });
      let d: FinalProduct[] = [];
      if (activeTab === "All") d = listData.flat();
      //@ts-ignore
      else d = listData.flat().filter((d) => d.state === activeTab);
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
  }, [data, filterSortPager, activeTab]);
  return (
    <div
      data-testid="my-orders-page"
      className="page-root flex flex-col gap-11 relative"
    >
      <div className="absolute top-0 left-0 w-full h-[404px] -z-10 bg-[#CCCC] dark:bg-gray-800" />
      <AppBreadCrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        <H1 className="text-gray-900 dark:text-gray-100">My Orders</H1>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 flex gap-3 w-full md:w-auto">
            <div className="relative border-2 border-gray-500/40 dark:border-gray-600 rounded-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Input
                type="search"
                placeholder="Search by Order Project name"
                className="pl-8 w-full md:w-[200px] lg:w-[380px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4 items-center flex-wrap lg:flex-nowrap">
        <Tabs onValueChange={onChange} value={activeTab} className="w-full">
          <TabsList className="bg-transparent gap-0 md:gap-4">
            {Array.from(
              new Map(tabsData.map((item) => [item.state, item])).values()
            ).map((tab) => (
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
        <div className="flex w-full md:justify-end items-center gap-4">
          <Button
            variant={"outline"}
            size="icon"
            className={`rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${!isGrid && "opacity-30"
              }`}
            onClick={() => onDisplayChange(false)}
          >
            <ListLayoutIcon className="h-5 w-5" />
          </Button>
          <Button
            variant={"outline"}
            size="icon"
            className={`rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${isGrid && "opacity-30"
              }`}
            onClick={() => onDisplayChange(true)}
          >
            <GridLayoutIcon className="h-5 w-5" />
          </Button>
          <Button
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
      <div className="xl:w-[1406px] mx-auto">
        {currentData && (
          <MyOrdersList
            setFilterSortPager={setFilterSortPager}
            filterSortPager={filterSortPager}
            orders={currentData || []}
            showFilter={!!showFilter}
            showGrid={!!isGrid}
          />
        )}
      </div>
    </div>

  );
};

export default MyOrdersPage;
