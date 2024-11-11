import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { type PageSize, pageSizes } from "@/lib/constant";
import Select, { SelectItem } from "../ui/select";
import type { IFilterSortPager } from "@/store/data-store";

interface PagerProps {
    setFilterSortPager: React.Dispatch<React.SetStateAction<IFilterSortPager>>;
    filterSortPager: IFilterSortPager;
}

const Pager = ({ setFilterSortPager, filterSortPager }: PagerProps) => {
    const { total, pageSize, page } = filterSortPager;
    const pagers = Math.ceil(total / pageSize);
    const pageNumbers = [...Array(pagers).keys()].map((num) => num + 1);
    const offsetFrom = (page - 1) * pageSize + 1;
    const offsetTo = Math.min(offsetFrom + pageSize - 1, total);

    const handlePreviousNextPage = (direction: "prev" | "next") => {
        const newPage = direction === "prev" ? page - 1 : page + 1;
        setFilterSortPager((prev) => ({
            ...prev,
            page: newPage,
        }));
    };
    const handlePager = (page: number) => {
        setFilterSortPager((prev) => ({
            ...prev,
            page,
        }));
    };

    if (pageNumbers.length === 0) return;
    return (
        <div className="sm:flex justify-between items-center w-full">
            <div className="flex items-center gap-2 w-96">
                <span className="text-xs ">
                    Showing {offsetFrom}-{offsetTo} of {total}
                </span>{" "}
                <Separator orientation="vertical" className="h-4 w-[3px]" />
                <div className="w-20">
                    <ShowPerPage
                        setFilterSortPager={setFilterSortPager}
                        filterSortPager={filterSortPager}
                    />
                </div>
                per page
            </div>
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePreviousNextPage("prev")}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </PaginationPrevious>
                        </PaginationItem>
                        {pageNumbers.map((num) => (
                            <PaginationItem key={num}>
                                <PaginationLink
                                    isActive={num === page}
                                    onClick={() => handlePager(num)}
                                >
                                    {num}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePreviousNextPage("next")}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default Pager;

interface ShowPerPageProps {
    setFilterSortPager: React.Dispatch<React.SetStateAction<IFilterSortPager>>;
    filterSortPager: IFilterSortPager;
}

export const ShowPerPage = ({
    setFilterSortPager,
    filterSortPager,
}: ShowPerPageProps) => {
    const { total, page, pageSize } = filterSortPager;
    // const [localPageSize,setLocalPageSize]=useState('')
    const handleOnChange = (size: string) => {
        // setLocalPageSize(size)

        /**
         * predefind: data= [1,2,3,4,5,6,7]
         * Edge caseA:
         * init:   page=3 pageSize=3 showData = 1,2,3   | 4,5,6 | 7  pagers = 3
         * action: page=3 newPageSize=4 showData = 1,2,3,4 | 5,6,7   pagers = 2
         * expected: finalPage should change to 2
         *
         * Edge caseB:
         * init:   page=2 pageSize=4 showData = 1,2,3,4 | 5,6,7        pagers = 2
         * action: page=2 newPageSize=3 showData = 1,2,3   | 4,5,6 | 7 pagers = 3
         * expected: finalPage should stay at 2
         *
         * So we need to check
         */
        const pagers = Math.ceil(total / +size);
        const finalPage = Math.min(page, pagers);

        setFilterSortPager((prev) => ({
            ...prev,
            page: finalPage,
            pageSize: +size as PageSize,
        }));
    };
    return (
        <Select
            id="showPerPage"
            value={String(pageSize)}
            onValueChange={handleOnChange}
        >
            {pageSizes.map((pageSize: PageSize) => (
                <SelectItem value={String(pageSize)} key={pageSize}>
                    {pageSize}
                </SelectItem>
            ))}
        </Select>
    );
};
