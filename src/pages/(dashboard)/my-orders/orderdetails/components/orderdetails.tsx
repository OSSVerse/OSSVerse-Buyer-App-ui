import { Card } from "@/components/ui/card";
import { H3, Muted, Paragraph } from "@/components/ui/typography";
import type { OrderDetails as OrderDetailsType } from "@/services/myorders-service";

interface IOrderDetail {
  project_title: string;
  assesment_project_description: string;
  outcome: string;
  expected_time_of_delivery: { time_line: string; priority_level: string };
  deliverables: string;
}

interface Props {
  order_detail: IOrderDetail;
  order: OrderDetailsType;
}
const OrderDetails = ({ order_detail, order }: Props) => (
  <Card className="px-5 py-6 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
    <>
      <H3 className="mb-3 text-gray-900 dark:text-gray-100">Project Title</H3>
      <Paragraph className="mb-7 capitalize text-gray-700 dark:text-gray-300">
        {order?.items?.[0]?.descriptor?.name}
      </Paragraph>
    </>
    <>
      <H3 className="mb-3 text-gray-900 dark:text-gray-100">Assessment Project Description</H3>
      <Paragraph className="mb-7 text-gray-700 dark:text-gray-300">
        {order?.items?.[0]?.description}
      </Paragraph>
    </>
    <>
      <H3 className="mb-3 text-gray-900 dark:text-gray-100">Outcome</H3>
      <Paragraph className="mb-7 text-gray-700 dark:text-gray-300">
        {order?.items?.[0]?.longDescription}
      </Paragraph>
    </>
    <>
      <H3 className="mb-3 text-gray-900 dark:text-gray-100">Expected Time of Delivery</H3>
      <div className="mb-7 flex">
        <div className="pe-16">
          <Muted className="text-base text-gray-700 dark:text-gray-400">Time line</Muted>
          <Paragraph className="text-gray-700 dark:text-gray-300">
            {order_detail.expected_time_of_delivery.time_line}
          </Paragraph>
        </div>
        <div>
          <Muted className="text-base text-gray-700 dark:text-gray-400">Priority Level</Muted>
          <Paragraph className="text-gray-700 dark:text-gray-300">
            {order_detail.expected_time_of_delivery.priority_level}
          </Paragraph>
        </div>
      </div>
    </>
    <>
      <H3 className="mb-3 text-gray-900 dark:text-gray-100">Deliverables</H3>
      <Muted className="text-base mb-1 text-gray-700 dark:text-gray-400">
        {order_detail.deliverables}
      </Muted>
      <Paragraph className="mb-7 text-gray-700 dark:text-gray-300">
        the download link only visible if the deliverable is complete
      </Paragraph>
    </>
  </Card>
);

export default OrderDetails;
