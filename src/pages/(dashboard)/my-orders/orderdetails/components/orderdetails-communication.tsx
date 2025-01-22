import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Select, { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { H3, Muted } from "@/components/ui/typography";
import {
  CodesandboxIcon,
  FlagIcon,
  FrownIcon,
  MessageCircleIcon,
  PaperclipIcon,
  SendIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

const userMessage = {
  userName: "Adam",
  message: "Hi I'm Adam ! How I can help you?",
  timeStamp: "1/3/2024 05:32 EST",
};
const oaspMessage = {
  userName: "OASP",
  message:
    "Hi Adam. I need to compare the two residential solar products to see which is better fit for assessment",
  timeStamp: "1/3/2024 05:33 EST",
};

const ActionBtn = ({
  srName,
  children,
}: {
  srName: string;
  children: React.ReactNode;
}) => {
  return (
    <Button
      variant={"outline"}
      className="border-gray-400 px-2 py-5 rounded-md bg-stone-100"
    >
      <span className="sr-only">{srName}</span>
      {children}
    </Button>
  );
};

const OrderDetailsCommunication = () => {
  return (
    <Card className="px-5 py-6 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between">
        <div>
          <H3 className="text-gray-900 dark:text-gray-100">Communicate with OASP</H3>
          <Muted className="mb-7 text-gray-700 dark:text-gray-400">
            Communications with the OASP that assigned to the order or offered to do the order
          </Muted>
        </div>
        <div className="flex items-center">
          <div className="pe-5 text-gray-900 dark:text-gray-100">Active</div>
          <div className="w-[150px]">
            <Select defaultValue="1" id="oaspCommunication">
              <SelectItem value="1" key={"1"} className="text-red-500">
                End Chat
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>
      <div className="bg-stone-100 dark:bg-stone-800 rounded-md py-5">
        <div className="pb-5">
          <Separator className="h-[2px] bg-gray-300 dark:bg-gray-600" />
          <div className="text-sm font-semibold text-center mt-2 text-gray-900 dark:text-gray-100">
            Session started - 1/3/2024 04:30 EST
          </div>
          <div className="flex justify-center mt-5">
            <div className="flex text-gray-900 dark:text-gray-100">
              <CodesandboxIcon />
              <span className="ms-2">
                Adam T joined the conversation - 05:30 EST
              </span>
            </div>
          </div>
          <div className="mt-7 text-end">
            <div className="inline-flex flex-col mx-10">
              <div className="bg-stone-500 text-white p-3 rounded-l-xl rounded-tr-xl mb-2">
                {userMessage.message}
              </div>
              <div className="text-start text-gray-700 dark:text-gray-400">
                {userMessage.userName} - {userMessage.timeStamp}
              </div>
            </div>
          </div>
          <div className="my-7">
            <div className="inline-flex flex-col mx-10">
              <div className="bg-stone-200 dark:bg-stone-700 p-3 rounded-r-xl rounded-tl-xl mb-2 text-gray-900 dark:text-gray-100">
                {oaspMessage.message}
              </div>
              <div className="text-start text-gray-700 dark:text-gray-400">
                {oaspMessage.userName} - {oaspMessage.timeStamp}
              </div>
            </div>
          </div>
          <Separator className="h-[2px] bg-gray-300 dark:bg-gray-600" />
        </div>
        <div className="flex mx-10">
          <div className="me-2">
            <ActionBtn srName="Frown Icon">
              <FrownIcon className="text-gray-500 dark:text-gray-400" />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="Users Icon">
              <UsersIcon className="text-gray-500 dark:text-gray-400" />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="MessageCircle Icon">
              <MessageCircleIcon className="text-gray-500 dark:text-gray-400" />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="ShieldCheck Icon">
              <ShieldCheckIcon className="text-gray-500 dark:text-gray-400" />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="Paperclip Icon">
              <PaperclipIcon className="text-gray-500 dark:text-gray-400" />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="Flag Icon">
              <FlagIcon className="text-gray-500 dark:text-gray-400" />
            </ActionBtn>
          </div>
        </div>
        <div className="mx-10 mt-4 flex">
          <Input
            placeholder="Reply to message"
            className="border-gray-400 dark:border-gray-600 h-10 me-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Button variant={"default"} className="px-2 py-5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <span className="sr-only">Send Icon</span>
            <SendIcon />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderDetailsCommunication;
