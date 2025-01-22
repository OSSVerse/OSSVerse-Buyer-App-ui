import Icon from "@/components/common/icon";
import StarIcon from "@/components/icons/star-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { H3, Muted } from "@/components/ui/typography";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import { useState } from "react";
import type { StageItem } from "../orderdetails-page";

interface Props {
  setStageItems: React.Dispatch<React.SetStateAction<StageItem[]>>;
  stageItems: StageItem[];
}

type CheckItem = {
  id: string;
  name: string;
  rating: string;
  bid: number;
  duration: string;
  icon: string;
};

const initCheckItem = {
  id: "",
  name: "",
  rating: "",
  bid: 0,
  duration: "",
  icon: "",
};

const oaspBids: CheckItem[] = [
  {
    id: "oasp-bid-1",
    name: "Tocomo",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-2",
    name: "BrainTech",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-3",
    name: "GreenHill",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-4",
    name: "Advanced Soft",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-5",
    name: "InnoTech",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-6",
    name: "InnovationLead",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-7",
    name: "ButterflyTech",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-8",
    name: "TechAuto",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-9",
    name: "OpenFort",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
  {
    id: "oasp-bid-10",
    name: "Autotech",
    rating: "4.9",
    bid: 400,
    duration: "3D 20H",
    icon: "",
  },
];

const CheckItem = ({
  checkItem,
  checkedItems,
  setCheckedItems,
  selectedItem,
  setSelectedItem,
  setStageItems,
  stageItems,
}: {
  checkItem: CheckItem;
  checkedItems: CheckItem[];
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckItem[]>>;
  selectedItem: CheckItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<CheckItem>>;
  setStageItems: React.Dispatch<React.SetStateAction<StageItem[]>>;
  stageItems: StageItem[];
}) => {
  const [checked, setChecked] = useState(false);
  const checkboxName = checkItem.name.toLowerCase().split(" ").join("");

  const handleCheck = () => {
    setChecked(!checked);
    if (!checked) {
      setCheckedItems([...checkedItems, checkItem]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item.id !== checkItem.id));
    }
  };

  const handleSelection = () => {
    if (selectedItem.id === "") setSelectedItem(checkItem);
    else setSelectedItem(initCheckItem);
    const tempItem = stageItems.map((item) => {
      if (item.name === "OASP Selected") {
        return {
          ...item,
          status: selectedItem.id === "" ? "completed" : "pending",
        };
      }
      return item;
    });
    setStageItems(tempItem);
  };

  return (
    <Label
      className="text-[15px] font-medium leading-[35px] items-center flex w-full flex-wrap gap-[15px] bg-stone-200 dark:bg-stone-800 text-gray-900 dark:text-gray-100 px-4 py-1 rounded-md basis-[49%] justify-between"
      htmlFor={checkItem.id}
    >
      <Checkbox
        id={checkItem.id}
        name={checkboxName}
        checked={
          // biome-ignore lint/complexity/noUselessTernary: <explanation>
          checkedItems.find((item) => item.id === checkItem.id) ? true : false
        }
        onCheckedChange={handleCheck}
      />
      <span className="flex items-center gap-2 min-w-72">
        <Icon icon={checkItem.icon} className="opacity-50 text-gray-700 dark:text-gray-400" />
        <span>{checkItem.name}</span>
      </span>
      <span className="flex items-center justify-between flex-grow">
        <span className="flex items-center gap-2">
          <StarIcon className="text-yellow-500 dark:text-yellow-400" /> {checkItem.rating}
        </span>
        <span className="text-gray-900 dark:text-gray-100">₹{checkItem.bid}</span>
        <span className="text-gray-700 dark:text-gray-300">{checkItem.duration}</span>
        <Button
          variant={"default"}
          onClick={handleSelection}
          disabled={selectedItem.id !== "" && selectedItem.id !== checkItem.id}
          className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedItem?.id === checkItem.id ? "UnSelect" : "Select"}
        </Button>
      </span>
    </Label>
  );
};

const OrderDetailsSelectOASPBids = ({ setStageItems, stageItems }: Props) => {
  const [checkedOASPBids, setCheckedOASPBids] = useState<CheckItem[]>([]);
  const [selectedOASPBid, setSelectedOASPBid] =
    useState<CheckItem>(initCheckItem);
  return (
    <Card className="px-5 py-5 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap items-end justify-between">
        <div className="basis-3/5 flex gap-4 items-center">
          <div>
            <H3 className="text-gray-900 dark:text-gray-100">
              OASP Bids for Custom Request List
            </H3>
            <Muted className="leading-5 text-gray-700 dark:text-gray-400">
              Compare and assess Bids & select the OASP you want to assign for the task.
            </Muted>
          </div>
        </div>
        <div className="basis-2/5 flex gap-4 justify-end">
          {checkedOASPBids.length > 1 && (
            <div className="flex space-x-4">
              <Button
                variant={"ghost"}
                className="text-gray-900 dark:text-gray-100"
                onClick={() => setCheckedOASPBids([])}
              >
                Unselect
              </Button>
              <Button
                variant={"outline"}
                className="border border-gray-700 dark:border-gray-400 font-semibold text-gray-900 dark:text-gray-100"
              >
                Compare
              </Button>
            </div>
          )}
          <form className="ml-auto flex gap-3 md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search OASP.."
                className="pl-8 w-full md:w-[200px] lg:w-[300px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="overflow-auto h-[250px] w-full flex gap-2 flex-wrap content-start mb-5">
        {oaspBids.map((item) => (
          <CheckItem
            checkItem={item}
            checkedItems={checkedOASPBids}
            setCheckedItems={setCheckedOASPBids}
            selectedItem={selectedOASPBid}
            setSelectedItem={setSelectedOASPBid}
            setStageItems={setStageItems}
            stageItems={stageItems}
            key={item.id}
          />
        ))}
      </div>
    </Card>
  );
};

export default OrderDetailsSelectOASPBids;
