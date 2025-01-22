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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import PagePagination from "@/components/common/page-pagination";

const initialFilters = {
  OSAP: [{ name: "All OSAP", value: "all" }],
  "Service Offered": [{ name: "All Service Offered", value: "all" }],
  "TAVOSS Version": [{ name: "All TAVOSS Version", value: "all" }],
};

const defaultInitialFilters = JSON.parse(JSON.stringify(initialFilters));

const MarketplaceList = ({
  showFilter,
  products,
}: { showFilter: boolean; products: Item[] }) => {

  const [filterdata, setFilterdata] = useState(defaultInitialFilters);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation> // Fix Me
  const [activeFilters, setActiveFilters]: any = useState(initialFilters);

  useEffect(() => {
    const updatedFilterdata = { ...defaultInitialFilters };

    products.map((product) => {
      if (product.provider?.name) {
        if (
          !updatedFilterdata.OSAP.some(
            (item: { value: string }) => item.value === product.provider?.name.toLowerCase().replace(/\s+/g, "-")
          )
        ) {
          updatedFilterdata.OSAP.push({
            name: product.provider.name,
            value: product.provider.name.toLowerCase().replace(/\s+/g, "-"),
          });
        }
      }

      if (product.services?.length) {
        product.services.map((service: { name: string }) => {
          if (
            !updatedFilterdata["Service Offered"].some(
              (item: { value: string }) => item.value === service.name.toLowerCase().replace(/\s+/g, "-")
            )
          ) {
            updatedFilterdata["Service Offered"].push({
              name: service.name,
              value: service.name.toLowerCase().replace(/\s+/g, "-"),
            });
          }
        });
      }
    });
    setFilterdata(updatedFilterdata);
  }, [products]);

  const [searchParams, setSearchParams] = useSearchParams();
  const featuredCurrentPage = Number(searchParams.get("mpage")) || 1;

  const hasFilters = Object.keys(activeFilters)
    .filter((item) =>
      activeFilters[item as keyof typeof activeFilters].find(
        (f: { value: string; }) => f.value !== "all",
      ),
    ).length > 0

  const handleFilterChange = (
    filter: string,
    value: { name: string; value: string },
  ) => {
    if (
      activeFilters[filter as keyof typeof filterdata].find(
        (f: { value: string; }) => f.value === value.value,
      ) !== undefined
    ) {
      const newFilters = {
        ...activeFilters,
        [filter]: activeFilters[filter as keyof typeof filterdata].filter(
          (f: { value: string; }) => f.value !== value.value,
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
        ].filter((f: { value: string; }) => f.value !== "all");
      }
      setActiveFilters(newFilters);
    }
  };

  const onFeaturedPageChange = (page: number) => {
    searchParams.set("mpage", page.toString());
    setSearchParams(searchParams);
  };

  const filterProducts = (products: Item[]) => {
    return products.filter((product) => {
      const matchesAllFilters = Object.keys(activeFilters).every((filter) => {
        const selectedValues = activeFilters[filter as keyof typeof activeFilters]
          .map((item: { value: string; }) => item.value)
          .filter((value: string) => value !== "all");
        if (selectedValues.length === 0) return true; // No active filters for this category

        // For OSAP, Service Offered, TAVOSS Version
        if (filter === "OSAP") {
          return selectedValues.includes(product.provider?.name.toLowerCase().replace(/\s+/g, "-"));
        }
        if (filter === "Service Offered") {
          return product.services?.some((service) =>
            selectedValues.includes(service.name.toLowerCase().replace(/\s+/g, "-"))
          );
        }
        // if (filter === "TAVOSS Version") {
        //   return selectedValues.includes(product.tavossVersion?.toLowerCase().replace(/\s+/g, "-"));
        // }
        return true;
      });

      return matchesAllFilters;
    });
  };


  // const getFeaturedPageItems = products?.slice((featuredCurrentPage - 1) * 6, featuredCurrentPage * 6);
  const getFeaturedPageItems = filterProducts(products).slice(
    (featuredCurrentPage - 1) * 6,
    featuredCurrentPage * 6
  );

  const featuredPageCount = Math.ceil(products ? products?.length / 6 : 0);

  return (
    <div className="flex flex-col gap-9">
      <div className="w-full flex gap-[30px]">
        {showFilter && (
          <div
            data-testid="filter-container"
            className="w-[283px] xl:w-[380px] flex flex-col gap-3"
          >
            <div className="flex bg-white dark:bg-gray-800 justify-between items-center gap-2 border border-gray-300 dark:border-gray-600 p-2 rounded">
              <span className="text-gray-900 dark:text-gray-100">Filter</span>
              <Button
                onClick={() => setActiveFilters(initialFilters)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                Reset
              </Button>
            </div>
            {Object.keys(filterdata).map((filter) => (
              <div
                key={filter}
                className="flex bg-white dark:bg-gray-800 justify-between items-center gap-2 border border-gray-300 dark:border-gray-600 p-2 rounded"
              >
                <Accordion
                  type="single"
                  collapsible
                  className="w-full border-none"
                >
                  <AccordionItem value={filter} className="border-none">
                    <AccordionTrigger className="text-gray-900 dark:text-gray-100">
                      {filter}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Search Service Offered"
                          className="pl-8 w-full text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      <div
                        data-testid={"filter-item-list"}
                        className="flex flex-col gap-2"
                      >
                        {filterdata[filter as keyof typeof filterdata].map(
                          (filtercheckbox: { value: string; name: string }) => (
                            <div
                              className="flex items-center p-1 gap-2"
                              key={filtercheckbox.value}
                            >
                              <Checkbox
                                disabled={filtercheckbox.value === "all"}
                                checked={
                                  activeFilters[
                                    filter as keyof typeof filterdata
                                  ].find(
                                    (f: { value: string }) =>
                                      f.value === filtercheckbox.value,
                                  ) !== undefined
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFilterChange(filter, filtercheckbox);
                                }}
                              />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
            ))}
          </div>
        )}
        <div className="space-y-4 w-full">
          {hasFilters && (
            <div className="ml-8 py-4 flex gap-6 font-medium w-full text-gray-900 dark:text-gray-100">
              {Object.keys(activeFilters)
                .filter((item) =>
                  activeFilters[item as keyof typeof activeFilters].find(
                    (f: { value: string }) => f.value !== "all"
                  )
                )
                .map((filter) => {
                  return (
                    <div key={filter} className="flex items-center gap-2">
                      <span>{filter}</span>
                      <span>
                        {activeFilters[filter as keyof typeof activeFilters]
                          .map((f: { name: string }) => f.name)
                          .join(", ")}
                      </span>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                          setActiveFilters((prev: any) => ({
                            ...prev,
                            [filter]: [{ name: "All", value: "all" }],
                          }))
                        }
                        size="icon"
                      >
                        <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </Button>
                    </div>
                  );
                })}
            </div>
          )}
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
            <div className="flex items-center gap-2 w-96">
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Showing{" "}
                {getFeaturedPageItems?.length * (featuredCurrentPage - 1) + 1} -{" "}
                {getFeaturedPageItems?.length * featuredCurrentPage} of{" "}
                {products?.length}
              </span>
              <Separator
                orientation="vertical"
                className="h-4 w-[3px] bg-gray-400 dark:bg-gray-600"
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">6 per page</span>
            </div>
            <div>
              <PagePagination
                currentPage={featuredCurrentPage}
                totalPages={featuredPageCount}
                onPageChange={onFeaturedPageChange}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MarketplaceList;
