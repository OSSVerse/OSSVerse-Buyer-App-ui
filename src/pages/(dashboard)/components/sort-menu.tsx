import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Fragment, useState } from "react";
import { type SortOption, SortOrder, SORT_MENUS } from "@/lib/constant";
import type { IFilterSortPager } from "@/store/data-store";

interface SortMenuProps {
  setFilterSortPager: React.Dispatch<React.SetStateAction<IFilterSortPager>>;
  filterSortPager: IFilterSortPager;
}

const SortMenu = ({ setFilterSortPager, filterSortPager }: SortMenuProps) => {
  const { order, sort } = filterSortPager;
  const [localSort, setLocalSort] = useState(sort);
  const [localOrder, setLocalOrder] = useState(order);

  const handleSortChange = (localSort: SortOption, sortMenu: SortOption) => {
    const isSameSort = localSort === sortMenu;
    const finalOrder = isSameSort
      ? localOrder === SortOrder.Ascending
        ? SortOrder.Descending
        : SortOrder.Ascending
      : SortOrder.Descending;

    setLocalSort(sortMenu);
    setLocalOrder(finalOrder);

    setFilterSortPager((prev) => ({
      ...prev,
      sort: sortMenu,
      order: finalOrder ? finalOrder : SortOrder.Descending,
    }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled={true}>
          {localSort} <Icon icon="chevron-down" className="ml-2" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-4 pr-8 flex flex-col">
        {SORT_MENUS.map((sortMenu) => {
          const menu = sortMenu.toLowerCase();
          return (
            <Fragment key={menu}>
              <div className="inline-flex justify-between items-center">
                <Button
                  variant={"link"}
                  onClick={() => handleSortChange(localSort, sortMenu)}
                >
                  {sortMenu}
                </Button>

                {localSort === sortMenu &&
                  localOrder === SortOrder.Descending && <ArrowUp />}
                {localSort === sortMenu &&
                  localOrder === SortOrder.Ascending && <ArrowDown />}
              </div>
            </Fragment>
          );
        })}
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};

export default SortMenu;
