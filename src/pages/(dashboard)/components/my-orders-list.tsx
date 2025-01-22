import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Span } from "@/components/ui/span";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn, type FinalProduct, getSpanVariant } from "@/lib/utils";
import Pager from "@/components/common/pager";
import type { IFilterSortPager } from "@/store/data-store";
import FilterCol from "./filter-col";

dayjs.extend(relativeTime);

const OrderDetails = ({ order }: { order: FinalProduct }) => (
  <>
    <div>Last update {dayjs(order?.updated_at).fromNow()}</div>
    <div className="grid grid-cols-2">
      <DetailRow label="Transaction ID" value={`${order?.id.slice(0, 8)}...`} />
      <DetailRow label="Assigned OASP" value="DevOp Solution" />
    </div>
    <div className="grid grid-cols-2">
      <DetailRow label="Delivery Date" value={order?.created_at ? dayjs(order?.created_at).format("DD MMM YYYY") : "-"} />
      <DetailRow label="Order Status" value={<Span variant={getSpanVariant(order?.state)}>{order?.state}</Span>} />
    </div>
  </>
);

const DetailRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="space-y-1">
    <div className="text-muted-foreground">{label}</div>
    <div>{value}</div>
  </div>
);

const OrderCard = ({ order }: { order: FinalProduct }) => (
  <Link to={`/dashboard/orders/detail/${encodeURIComponent(order?.id)}`}>
    <Card className="max-w-full bg-gray-100 dark:bg-gray-900 border shadow-none rounded-lg overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="space-y-2">
          <Badge variant={"secondary"} className="h-16 w-16 flex items-center justify-center rounded-full">
            <ProjectIcon className="h-8 w-8" />
          </Badge>
          <h3 className="text-lg font-semibold">{order.item.descriptor.name}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <OrderDetails order={order} />
      </CardContent>
      <CardFooter className="flex justify-between items-center px-6 mt-auto">
        <Button>View</Button>
      </CardFooter>
    </Card>
  </Link>
);

const OrderListHeader = () => (
  <div className="w-full bg-secondary rounded-lg p-4">
    <div className="grid grid-cols-8 gap-6 items-center">
      <div className="col-span-3">Order Project Name</div>
      <div>Transaction ID</div>
      <div>Assigned OASP</div>
      <div>Delivery Date</div>
      <div className="col-span-2">Order Status</div>
    </div>
  </div>
);

const OrderListItem = ({ order }: { order: FinalProduct }) => (
  <Link to={`/dashboard/orders/detail/${encodeURIComponent(order?.id)}`} className="w-full">
    <Card className="xl:w-full border rounded-lg">
      <CardContent className="text-sm space-y-2 p-4">
        <div className="grid grid-cols-8 gap-6 items-center">
          <div>
            <Badge variant={"secondary"} className="h-16 w-16 flex items-center justify-center rounded-full">
              <ProjectIcon className="h-8 w-8" />
            </Badge>
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-semibold">{order.item.descriptor.name}</h3>
            <div>Last update {dayjs(order?.updated_at).fromNow()}</div>
          </div>
          <div>{order?.id.slice(0, 8)}...</div>
          <div>DevOp Solution</div>
          <div>
            <div>{"-"}</div>
            {order?.created_at && <div className="text-muted-foreground">{dayjs(order?.created_at).fromNow()}</div>}
          </div>
          <div>
            <Span variant={getSpanVariant(order?.state)}>{order?.state}</Span>
          </div>
          <div>
            <Button>View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

interface MyOrdersListProps {
  setFilterSortPager: React.Dispatch<React.SetStateAction<IFilterSortPager>>;
  filterSortPager: IFilterSortPager;
  showFilter: boolean;
  showGrid: boolean;
  orders: FinalProduct[] | undefined;
}

const MyOrdersList = ({ setFilterSortPager, filterSortPager, showFilter, showGrid, orders = [] }: MyOrdersListProps) => {
  return (
    <div data-testid="my-orders-list" className="flex flex-col gap-9">
      <div className="w-full flex gap-[30px] items-start">
        {showFilter && <FilterCol setFilterSortPager={setFilterSortPager} filterSortPager={filterSortPager} />}
        <div className="space-y-4 w-full">
          <div
            className={cn(`
            ${!showGrid
                ? "flex flex-col gap-4 w-full"
                : `grid gap-[30px] justify-center mx-auto w-full
            ${showFilter
                  ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }
            `
              }
        `)}
          >
            {!showGrid && <OrderListHeader />}
            {orders.map((order, index) =>
              showGrid ? (
                <OrderCard
                  order={order}
                  key={`${order.id}-${index}`}
                />
              ) : (
                <OrderListItem
                  order={order}
                  key={`${order.id}-${index}`}
                />
              )
            )}
          </div>

          {orders.length === 0 && <div>No orders found</div>}

          <Pager setFilterSortPager={setFilterSortPager} filterSortPager={filterSortPager} />
        </div>
      </div>
    </div>
  )
};

export default MyOrdersList;
