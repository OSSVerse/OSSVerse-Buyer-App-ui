import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H3, H4, Muted, Paragraph } from "@/components/ui/typography";

interface Props {
  type: string;
  title: string;
  transactionID: string;
}
const OrderDetailsHeader = ({ type, title, transactionID }: Props) => {
  const status = (
    <div>
      <ul className="flex justify-end">
        <li className="list-disc">
          <Paragraph className="font-semibold text-gray-900">
            Select OASP
          </Paragraph>
        </li>
      </ul>

      <Muted className="text-gray-700 dark:text-gray-400">(Pending Acceptance)</Muted>
    </div>
  );

  return (
    <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap justify-between">
      {/* Left Section */}
      <div className="basis-3/5 flex gap-4 items-center">
        <Badge
          variant={"secondary"}
          className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700"
        >
          {type === "PROJECT" ? (
            <ProjectIcon className="h-8 w-8 text-gray-900 dark:text-gray-100" />
          ) : (
            <MLModelIcon className="h-8 w-8 text-gray-900 dark:text-gray-100" />
          )}
        </Badge>
        <div>
          <H3 className="text-3xl text-gray-900 dark:text-gray-100">{title}</H3>
          <H4 className="text-gray-700">Transaction ID {transactionID}</H4>
        </div>
      </div>

      {/* Right Section */}
      <div className="basis-2/5 flex gap-4 items-center justify-end">
        <span className="text-gray-900 dark:text-gray-100">{status}</span>
        <Separator orientation="vertical" className="border-gray-300 dark:border-gray-600" />
        <Button
          variant={"destructive"}
          className="font-bold text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-800"
        >
          Cancel Order
        </Button>
      </div>
    </div>

  );
};

export default OrderDetailsHeader;
