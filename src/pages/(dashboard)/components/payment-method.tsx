import { Card } from "@/components/ui/card";
import { Muted, Paragraph } from "@/components/ui/typography";

interface PyamentMethodProps {
  number: string;
  date: string;
  total_payment_amount: number | string;
}
const PyamentMethod = ({
  number,
  date,
  total_payment_amount,
}: PyamentMethodProps) => (
  <Card className="px-5 py-6 bg-gray-100 dark:bg-gray-800">
    <Muted className="mb-1 text-gray-700 dark:text-gray-300">Payment Method</Muted>

    {number && (
      <div className="mb-4">
        <Paragraph className="text-gray-900 dark:text-gray-100">Credit Card</Paragraph>
        <Paragraph className="text-gray-700 dark:text-gray-300">{number}</Paragraph>
        <Paragraph className="text-gray-700 dark:text-gray-300">{date}</Paragraph>
      </div>
    )}
    {String(total_payment_amount) && (
      <>
        <Muted className="mb-1 text-gray-700 dark:text-gray-300">Total Payment Amount</Muted>
        <Paragraph className="text-gray-900 dark:text-gray-100">₹{total_payment_amount}</Paragraph>
      </>
    )}
  </Card>

);

export default PyamentMethod;
