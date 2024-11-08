import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

import type { Item } from "@/services/marketplace-service";
import { MarketplaceCard } from "@/components/common/marketplace-card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import PagePagination from "@/components/common/page-pagination";

const filterdata = {
  OSAP: [
    {
      name: "All OSAP",
      value: "all",
    },
    {
      name: "OSAP Acme A",
      value: "osap-acme-a",
    },
    {
      name: "OSAP Acme B",
      value: "osap-acme-b",
    },
    {
      name: "OSAP Acme C",
      value: "osap-acme-c",
    },
    {
      name: "OSAP Acme D",
      value: "osap-acme-d",
    },
  ],
  "Service Offered": [
    {
      name: "All Service Offered",
      value: "all",
    },
    {
      name: "Assesment",
      value: "assesment",
    },
    {
      name: "Attestation",
      value: "attestation",
    },
    {
      name: "Certification",
      value: "certification",
    },
    {
      name: "Remediation",
      value: "remediation",
    },
  ],
  "TAVOSS Version": [
    {
      name: "All TAVOSS Version",
      value: "all",
    },
    {
      name: "ASF",
      value: "asf",
    },
    {
      name: "ISO",
      value: "iso",
    },
    {
      name: "Linux Foundation",
      value: "linux-foundation",
    },
    {
      name: "OpenSSF",
      value: "open-ssf",
    },
  ],
};

const MarketplaceList = ({
  showFilter,
  products,
}: { showFilter: boolean; products: Item[] }) => {
  const initialFilters = {
    OSAP: [{ name: "All OSAP", value: "all" }],
    "Service Offered": [{ name: "All Service Offered", value: "all" }],
    "TAVOSS Version": [{ name: "All TAVOSS Version", value: "all" }],
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const featuredCurrentPage = Number(searchParams.get("mpage")) || 1;

  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const hasFilters = Object.keys(activeFilters)
    .filter((item) =>
      activeFilters[item as keyof typeof activeFilters].find(
        (f) => f.value !== "all",
      ),
    ).length > 0

  const handleFilterChange = (
    filter: string,
    value: { name: string; value: string },
  ) => {
    if (
      activeFilters[filter as keyof typeof filterdata].find(
        (f) => f.value === value.value,
      ) !== undefined
    ) {
      const newFilters = {
        ...activeFilters,
        [filter]: activeFilters[filter as keyof typeof filterdata].filter(
          (f) => f.value !== value.value,
        ),
      };
      if (newFilters[filter as keyof typeof filterdata].length === 0) {
        newFilters[filter as keyof typeof filterdata] = [
          { name: "All", value: "all" },
        ];
      }
      setActiveFilters(newFilters);
    } else {
      const newFilters = {
        ...activeFilters,
        [filter]: [...activeFilters[filter as keyof typeof filterdata], value],
      };
      if (value.value !== "all") {
        newFilters[filter as keyof typeof filterdata] = newFilters[
          filter as keyof typeof filterdata
        ].filter((f) => f.value !== "all");
      }
      setActiveFilters(newFilters);
    }
  };

  const onFeaturedPageChange = (page: number) => {
    searchParams.set("mpage", page.toString());
    setSearchParams(searchParams);
  };
  const getFeaturedPageItems = products?.slice((featuredCurrentPage - 1) * 6, featuredCurrentPage * 6);


  const featuredPageCount = Math.ceil(products ? products?.length / 6 : 0);



  return (
    <div className="flex flex-col gap-9">
      <div className="w-full flex gap-[30px]">
        {showFilter && (
          <div
            data-testid="filter-container"
            className="w-[283px] xl:w-[380px] flex flex-col gap-3"
          >
            <div className="flex bg-white justify-between items-center gap-2 border p-2 rounded">
              <span>Filter</span>
              <Button onClick={() => setActiveFilters(initialFilters)}>
                Reset
              </Button>
            </div>
            {Object.keys(filterdata).map((filter) => {
              return (
                <div
                  key={filter}
                  className="flex flex-col gap-2  border p-2 rounded "
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full   border-none"
                  >
                    <AccordionItem value={filter} className="border-none">
                      <AccordionTrigger>{filter}</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search Service Offered"
                            className="pl-8 w-full text-xs"
                          />
                        </div>
                        <div
                          data-testid={"filter-item-list"}
                          className="flex flex-col gap-2 "
                        >
                          {filterdata[filter as keyof typeof filterdata].map(
                            (filtercheckbox) => (
                              <div
                                className="flex items-center p-1 gap-2"
                                key={filtercheckbox.value}
                              >
                                <Checkbox
                                  disabled={filtercheckbox.value === "all"}
                                  // value={filtercheckbox.value}
                                  checked={
                                    activeFilters[
                                      filter as keyof typeof filterdata
                                    ].find(
                                      (f) => f.value === filtercheckbox.value,
                                    ) !== undefined
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFilterChange(filter, filtercheckbox);
                                  }}
                                />
                                <label
                                  htmlFor="terms"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {filtercheckbox.name}
                                </label>
                              </div>
                            ),
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>
        )}
        <div className=" space-y-4  w-full">
          {hasFilters && (<div className="ml-8 py-4 flex gap-6 font-medium w-full">
            {Object.keys(activeFilters)
              .filter((item) =>
                activeFilters[item as keyof typeof activeFilters].find(
                  (f) => f.value !== "all",
                ),
              )
              .map((filter) => {
                return (
                  <div key={filter} className="flex items-center gap-2">
                    <span>{filter}</span>
                    <span>
                      {activeFilters[filter as keyof typeof activeFilters]
                        .map((f) => f.name)
                        .join(", ")}
                    </span>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          [filter]: [{ name: "All", value: "all" }],
                        }))
                      }
                      size="icon"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                );
              })}
          </div>)}
          <div
            data-testid={"product-list"}
            className={cn(`
            grid gap-[30px] justify-center mx-auto w-full
            ${showFilter
                ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }
          `)}
          >
            {getFeaturedPageItems?.map((product) => (
              <MarketplaceCard product={product} key={product.id} />
            ))}
          </div>
          <div className="sm:flex space-y-4 justify-between items-center w-full">
            <div className="flex items-center  gap-2 w-96">
              <span className="text-xs ">Showing {getFeaturedPageItems?.length * (featuredCurrentPage - 1) + 1} - {getFeaturedPageItems?.length * featuredCurrentPage} of {products?.length}</span>{" "}
              <Separator orientation="vertical" className="h-4 w-[3px]" />
              <span className="text-xs ">6 per page</span>
            </div>
            <div>
              <PagePagination currentPage={featuredCurrentPage} totalPages={featuredPageCount} onPageChange={onFeaturedPageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceList;
