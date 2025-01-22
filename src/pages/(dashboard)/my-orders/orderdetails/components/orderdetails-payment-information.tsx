import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H3, Muted, Paragraph } from "@/components/ui/typography";
import type { OrderDetails } from "@/services/myorders-service";
import { CreditCardIcon, TabletIcon, UserIcon } from "lucide-react";

interface IPaymentInfo {
  payment_method: string;
  status: string;
  amount: string;
}

interface IBillingInfo {
  first_name: string;
  last_name: string;
  work_mail: string;
  phone: string;
}

interface Props {
  payment_info: IPaymentInfo;
  billing_info: IBillingInfo;
  order: OrderDetails;
}

const OrderDetailsPaymentBillingInfo = ({
  payment_info,
  billing_info,
  order
}: Props) => {
  return (
    <Card className="px-5 py-6 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <>
        <H3 className="mb-3 text-gray-900 dark:text-gray-100">Payment Info</H3>
        <div className="mb-7 flex items-center">
          <div className="pe-5">
            <Badge variant={"secondary"} className="p-2 bg-gray-200 dark:bg-gray-700">
              <CreditCardIcon className="text-gray-500 dark:text-gray-400" />
            </Badge>
          </div>
          <div className="pe-10">
            <Muted className="text-base text-gray-700 dark:text-gray-400">Payment Method</Muted>
            <Paragraph className="text-gray-900 dark:text-gray-100">
              {payment_info.payment_method}
            </Paragraph>
          </div>
          <div className="pe-10">
            <Muted className="text-base text-gray-700 dark:text-gray-400">Status</Muted>
            <Paragraph className="text-gray-900 dark:text-gray-100">
              {payment_info.status}
            </Paragraph>
          </div>
          <div>
            <Muted className="text-base text-gray-700 dark:text-gray-400">Amount</Muted>
            <Paragraph className="text-gray-900 dark:text-gray-100">
              ₹{order?.quote?.price?.value}
            </Paragraph>
          </div>
        </div>
      </>
      <>
        <H3 className="mb-3 text-gray-900 dark:text-gray-100">Billing Info</H3>
        <div className="mb-7 flex items-center">
          <div className="pe-5">
            <Badge variant={"secondary"} className="p-2 bg-gray-200 dark:bg-gray-700">
              <UserIcon className="text-gray-500 dark:text-gray-400" />
            </Badge>
          </div>
          <div className="pe-10">
            <Muted className="text-base text-gray-700 dark:text-gray-400">First Name</Muted>
            <Paragraph className="text-gray-900 dark:text-gray-100">
              {billing_info.first_name}
            </Paragraph>
          </div>
          <div className="pe-10">
            <Muted className="text-base text-gray-700 dark:text-gray-400">Last Name</Muted>
            <Paragraph className="text-gray-900 dark:text-gray-100">
              {billing_info.last_name}
            </Paragraph>
          </div>
          <div className="pe-5">
            <Badge variant={"secondary"} className="p-2 bg-gray-200 dark:bg-gray-700">
              <TabletIcon className="text-gray-500 dark:text-gray-400" />
            </Badge>
          </div>
          <div className="pe-10">
            <Muted className="text-base text-gray-700 dark:text-gray-400">Work Mail</Muted>
            <Paragraph className="text-gray-900 dark:text-gray-100">
              {billing_info.work_mail}
            </Paragraph>
          </div>
          <div>
            <Muted className="text-base text-gray-700 dark:text-gray-400">Phone</Muted>
            <Paragraph className="text-gray-900 dark:text-gray-100">
              {billing_info.phone}
            </Paragraph>
          </div>
        </div>
        <div className="mb-5 flex items-center">
          <div className="pe-10">
            <Button
              variant={"outline"}
              className="border border-2 border-gray-700 dark:border-gray-400 font-semibold text-gray-900 dark:text-gray-100"
            >
              Edit Billing Info
            </Button>
          </div>
          <div>
            <Muted className="text-gray-700 dark:text-gray-400">
              Billing information can only be changed if the OASP <br /> hasn't
              accepted the order yet.
            </Muted>
          </div>
        </div>
      </>
    </Card>
  );
};

export default OrderDetailsPaymentBillingInfo;
