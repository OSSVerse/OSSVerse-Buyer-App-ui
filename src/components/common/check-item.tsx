import * as Label from "@radix-ui/react-label";
import { Checkbox } from "../ui/checkbox";

export interface ICheckItem {
  id: string;
  name: string;
  price: number;
}

interface CheckItemProps {
  checkItem: ICheckItem;
  setSelectedItems: React.Dispatch<React.SetStateAction<ICheckItem[]>>;
  disabledLength?: boolean;
  selectedItems: ICheckItem[];
}

const CheckItem = ({
  checkItem,
  setSelectedItems,
  selectedItems,
  disabledLength,
}: CheckItemProps) => {
  // const [checked, setChecked] = useState(false);
  const { name, id, price } = checkItem;
  const checkboxName = name.toLowerCase().split(" ").join("");

  // useEffect(() => {
  //   if (checked) {
  //     setSelectedItems((prevItems: ICheckItem[]) => [...prevItems, checkItem]);
  //   } else {
  //     setSelectedItems((prevItems: ICheckItem[]) =>
  //       prevItems.filter((item) => item.id !== checkItem.id),
  //     );
  //   }
  // }, [checked, checkItem, setSelectedItems]);

  return (
    <Label.Root
      data-testid="check-item"
      className="text-[15px] font-medium leading-[35px] items-center flex w-full flex-wrap gap-[15px] bg-stone-100 dark:bg-stone-800 px-4 py-1 rounded-md basis-[49%] justify-between"
      htmlFor={id}
    >
      <span className="flex items-center gap-3 min-w-72 text-gray-900 dark:text-gray-100">
        {/* <Icon icon={icon} className="opacity-50" /> */}
        <span>{name}</span>
      </span>
      <span className="flex items-center justify-between flex-grow text-gray-900 dark:text-gray-100">
        <span>₹{price}</span>
        <Checkbox
          id={id}
          name={checkboxName}
          checked={selectedItems.some((item) => item.id === id)}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedItems((prevItems) => [...prevItems, checkItem]);
            } else {
              setSelectedItems((prevItems) =>
                prevItems.filter((item) => item.id !== checkItem.id),
              );
            }
          }}
          disabled={
            disabledLength && !selectedItems.some((item) => item.id === id)
          }
        />
      </span>
    </Label.Root>
  );
};

export default CheckItem;
