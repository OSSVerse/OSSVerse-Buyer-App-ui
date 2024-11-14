import AppBreadCrumb from "@/components/common/app-breadcrumb";
import { useEffect, useState } from "react";
import AnchorLists, {
  isLessThanCurrentAnchor,
} from "../../components/anchor-list";
import OrderDetailsHeader from "./components/orderdetails-header";
import { cn } from "@/lib/utils";
import { Muted } from "@/components/ui/typography";
import OrderDetails from "./components/orderdetails";
import OrderDetailsSelectOASPBids from "./components/orderdetails-select-oasp-bids";
import OrderDetailsPaymentBillingInfo from "./components/orderdetails-payment-information";
import OrderDetailsCommunication from "./components/orderdetails-communication";
import OrderDetailsTracking from "./components/orderdetails-tracking";
import {
  type OrderDetails as OrderDetailsType,
  useMyOrders,
} from "@/services/myorders-service";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import PyamentMethod from "../../components/payment-method";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "MY ORDERS",
    url: "/dashboard/orders",
  },
  {
    title: "Orders Details & Tracking",
    url: "/dashboard/orders/detail",
  },
];

const anchorList = [
  "Order Details",
  "Select OASP Bids",
  "Payment & Billing Information",
  "Communication",
];

export type StageItem = {
  name: string;
  remark: string;
  status: string;
};

const order = {
  title: "AutoSync Project",
  transaction_ID: "#12345",
  type: "PROJECT",
  total_payment_amount: "1,100",
  credit_card: {
    number: "12134 1234 1234 1234",
    date: "08/24 XXX",
  },
  order_details: {
    project_title: "Batteries Charger Auto for Automotive",
    assesment_project_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    outcome: "Identify and report vulnerabilities",
    expected_time_of_delivery: {
      time_line: "2024/9/12 07:00 AM",
      priority_level: "High",
    },
    deliverables: "Download Assessment Report",
  },
  payment_info: {
    payment_method: "Credit Card",
    status: "Verified",
    amount: "1,100",
  },
  billing_info: {
    first_name: "John",
    last_name: "Appleseed",
    work_mail: "johndoe@workmail.com",
    phone: "(123) 456-7890",
  },
};

const OrderDetailsPage = () => {
  console.log("OrderDetailsPage");
  const [currentAnchor, setCurrentAnchor] = useState(0);
  const [stages, setStages] = useState<StageItem[]>([
    {
      name: "Order Placed",
      remark: "",
      status: "completed",
    },
    {
      name: "OASP Selected",
      remark: "Pending Acceptance",
      status: "pending",
    },
    {
      name: "OASP Assigned",
      remark: "Work in Progress",
      status: "pending",
    },
    {
      name: "Delivered",
      remark: "Completed",
      status: "pending",
    },
  ]);

  const { data } = useMyOrders();
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType>(
    {} as OrderDetailsType,
  );

  useEffect(() => {
    if (data && id) {
      const response = data?.[0]?.orders[0]?.message.responses.find(
        (response) => response.message.order.id === id,
      );
      setOrderDetails(response?.message.order ?? ({} as OrderDetailsType));
    }
  }, [data, id]);

  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={breadcrumb} />

      <OrderDetailsHeader
        type={"PROJECT"}
        title={orderDetails?.items?.[0]?.descriptor?.name}
        transactionID={orderDetails?.id?.slice(0, 8)}
      />

      <main
        className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap
      before:content=['']
      before:absolute
      before:top-0
      before:left-0
      before:w-full
        before:h-[400px]
        before:bg-neutral-100
        before:z-[-1]
      }
      "
      >
        <aside className="basis-72 flex-shrink-0">
          <AnchorLists
            currentAnchor={currentAnchor}
            setCurrentAnchor={setCurrentAnchor}
            anchroLists={anchorList}
          />
          <PyamentMethod
            number={order.credit_card.number}
            date={dayjs(orderDetails?.created_at).format("MM/YY")}
            total_payment_amount={
              orderDetails?.quote?.price?.value
                ? (Number(orderDetails?.quote?.price?.value) ?? 0)
                : 0
            }
          />
        </aside>
        <div className="flex-grow">
          {/* stages section */}
          <section>
            <OrderDetailsTracking stages={stages} />
          </section>
          {/* order detail section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(0, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchorList[0].toLocaleUpperCase()}</Muted>
            <OrderDetails
              order_detail={order?.order_details}
              order={orderDetails}
            />
          </section>
          {/* select oasp bids section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(1, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4 mt-7">
              {anchorList[1].toLocaleUpperCase()}
            </Muted>
            <OrderDetailsSelectOASPBids
              setStageItems={setStages}
              stageItems={stages}
            />
          </section>
          {/* payment & billing information section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(2, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4 mt-7">
              {anchorList[2].toLocaleUpperCase()}
            </Muted>
            <OrderDetailsPaymentBillingInfo
              order={orderDetails}
              payment_info={order.payment_info}
              billing_info={order.billing_info}
            />
          </section>
          {/* communication section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(3, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4 mt-7">
              {anchorList[3].toLocaleUpperCase()}
            </Muted>
            <OrderDetailsCommunication />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailsPage;
