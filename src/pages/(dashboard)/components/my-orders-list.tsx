import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import { Span } from "@/components/ui/span";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn, getSpanVariant } from "@/lib/utils";
import Pager from "@/components/common/pager";
import type { IFilterSortPager } from "@/store/data-store";
import FilterCol from "./filter-col";
import type { Order } from "@/services/myorders-service";
dayjs.extend(relativeTime);

export const OrderCard = ({ order }: { order: Order['orders'][0]['message']['responses'][0]['message']['order'] }) => {
  return (
    <Link to={`/dashboard/orders/detail/${encodeURIComponent(order?.id)}`}>
      <Card className="max-w-full ld:max-w-[300px] sm:max-w-[280px] md:max-w-[290px] border rounded-lg overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="space-y-2">
            <Badge
              variant={"secondary"}
              className=" h-16 w-16 flex items-center justify-center rounded-full"
            >
              <ProjectIcon className="h-8 w-8" />

              {/* {order.type === "PROJECT" ? (
              <ProjectIcon className="h-8 w-8" />
              ) : (
                <MLModelIcon className="h-8 w-8" />
              )} */}
            </Badge>
            <h3 className="text-lg font-semibold ">
              {order.items[0].descriptor.name}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>Last update {dayjs(order?.updated_at).fromNow()}</div>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <div className="text-muted-foreground">Transaction ID</div>
              <div>{order?.id.slice(0, 8)}...</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Assigned OASP</div>
              <div>
                {/* {order.assignedOASP} */}
                DevOp Solution
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <div className="text-muted-foreground">Delivery Date</div>
              {/* <div>{"-"}</div> */}
              {order?.created_at && (
                <div className="text-muted-foreground">
                  {dayjs(order?.created_at).format("DD MMM YYYY")}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Order Status</div>
              <div>
                <Span variant={getSpanVariant(order?.state)}>
                  {order?.state}
                </Span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-6 mt-auto">
          <div>
            <Button>View</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export const OrderListHeader = () => {
  return (
    <div className="sm:w-[50rem] md:w-[60rem] xl:w-full 2xl:w-[90rem] bg-secondary rounded-lg p-4">
      <div className="grid grid-cols-8">
        <div className="col-span-3">Order Project Name</div>
        <div>Transaction ID</div>
        <div>Assigned OASP</div>
        <div>Delivery Date</div>
        <div className="col-span-2">Order Status</div>
      </div>
    </div>
  );
};

export const OrderListItem = ({
  order,
}: {
  order: Order['orders'][0]['message']['responses'][0]['message']['order'];
}) => {
  return (
    <Link to={`/dashboard/orders/detail/${encodeURIComponent(order?.id)}`} className="xl:w-full ">
      <Card className="sm:w-[50rem] md:w-[60rem] xl:w-full 2xl:w-[90rem] border rounded-lg">
        <CardContent className="text-sm space-y-2 p-4">
          <div className="grid grid-cols-8 gap-6 items-center">
            <div>
              <Badge
                variant={"secondary"}
                className=" h-16 w-16 flex items-center justify-center rounded-full"
              >
                {/* {order.type === "PROJECT" ? (
                  <ProjectIcon className="h-8 w-8" />
                ) : (
                  <MLModelIcon className="h-8 w-8" />
                )} */}
                <ProjectIcon className="h-8 w-8" />
              </Badge>
            </div>
            <div className="col-span-2">
              <div>
                <h3 className="text-lg font-semibold ">
                  {order.items[0].descriptor.name}
                </h3>
              </div>
              <div>Last update {dayjs(order?.updated_at).fromNow()}</div>
            </div>
            <div>{order?.id.slice(0, 8)}...</div>
            <div>DevOp Solution</div>
            <div>
              <div>{"-"}</div>
              {order?.created_at && (
                <div className="text-muted-foreground">
                  {dayjs(order?.created_at).fromNow()}
                </div>
              )}
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
};

interface MyOrdersListProps {
  setFilterSortPager: React.Dispatch<React.SetStateAction<IFilterSortPager>>;
  filterSortPager: IFilterSortPager;
  showFilter: boolean;
  showGrid: boolean;
  orders: Order[] | undefined;
}

const MyOrdersList = ({
  setFilterSortPager,
  filterSortPager,
  showFilter,
  showGrid,
  orders = [],
}: MyOrdersListProps) => {
  console.log(orders);

  return (
    <div data-testid="my-orders-list" className="flex flex-col gap-9">
      <div className="w-full flex gap-[30px] items-start">
        {showFilter && (
          <FilterCol
            setFilterSortPager={setFilterSortPager}
            filterSortPager={filterSortPager}
          />
        )}
        <div className=" space-y-4  w-full">
          <div
            className={cn(`
            ${!showGrid
                ? "flex flex-wrap gap-7 justify-center mx-auto w-full"
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
            {/* TODO: now the key use index which is redudunt because there is no unique thing for it  */}
            {orders.map((order) =>
              showGrid ? (
                <OrderCard
                  order={order.orders[0].message.responses[0].message.order}
                  key={order.orders[0].message.responses[0].message.order.items[0].descriptor.name}
                />
              ) : (
                <OrderListItem
                  order={order.orders[0].message.responses[0].message.order}
                  key={order.orders[0].message.responses[0].message.order.items[0].descriptor.name}
                />
              ),
            )}
          </div>

          {orders.length === 0 && <div>No orders found</div>}
          {/* pagination */}
          <Pager
            setFilterSortPager={setFilterSortPager}
            filterSortPager={filterSortPager}
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrdersList;
