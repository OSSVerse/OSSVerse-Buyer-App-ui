import AppBreadCrumb from "@/components/common/app-breadcrumb";
import GridLayoutIcon from "@/components/icons/grid-layout-icon";
import ListLayoutIcon from "@/components/icons/list-layout-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H1 } from "@/components/ui/typography";
import { ChevronDownIcon, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import MarketplaceList from "../components/marketplace-list";
import { useMarketPlaceProducts } from "@/services/marketplace-service";
import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCT_TYPE } from "@/lib/constant";

const breadcrumb = [
  {
    title: "Homepage",
    url: "/",
  },
  {
    title: "Marketplace",
    url: "/marketplace",
  },
];

const TabItem = ({
  title,
  badge,
  value,
}: { title: string; badge: number; value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className="flex bg-transparent items-center gap-0 md:gap-2 outline-none data-[state=active]:font-semibold data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none !shadow-none overflow-auto max-w-screen p-1 md:p-4 data-[state=active]:bg-transparent"
    >
      <span>{title}</span>
      <Badge variant="secondary" className="bg-stone-400">
        {badge}
      </Badge>
    </TabsTrigger>
  );
};

const MarketPlacePage = ({ isHomePage = false }: { isHomePage?: boolean }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");


  const showFilter = searchParams.get("filter") || "";
  const activeTab = searchParams.get("q") || "";
  const selectedCategory = {
    projects: "OSS Project",
    "ml-models": "ML Model",
  };

  const { data, isLoading } = useMarketPlaceProducts(
    "",
    selectedCategory[activeTab as keyof typeof selectedCategory] ?? "",
  );
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data || [];
    return (
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      data?.filter((item: any) =>
        item.descriptor.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [searchQuery, data]);

  const onChange = (value: string) => {
    if (value === "") {
      searchParams.delete("q");
    } else {
      searchParams.set("q", value);
    }
    setSearchParams(searchParams);
  };

  const onFilterChange = (value: string) => {
    if (value) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", "true");
    }
    setSearchParams(searchParams);
  };


  const [isGrid, setIsGrid] = useState(false);
  return (
    <div className="page-root flex flex-col gap-11 relative ">
      <div className="absolute top-0 left-0 w-full h-[404px] -z-10 bg-[#CCCC] dark:bg-gray-800" />
      {!isHomePage && <AppBreadCrumb data={breadcrumb} />}
      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        <H1 className="text-gray-900 dark:text-gray-100">Explore Marketplace</H1>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 flex gap-3 w-full md:w-auto">
            <div className="relative border-2 border-gray-500/40 dark:border-gray-600 rounded-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Input
                type="search"
                placeholder="Search Project/ML Model name.."
                className="pl-8 w-full md:w-[200px] lg:w-[380px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col-reverse  md:flex-row  justify-between gap-4 items-center  flex-wrap md:flex-nowrap">
        <Tabs onValueChange={onChange} value={activeTab} className="w-full">
          <TabsList className="bg-transparent gap-0 md:gap-4">
            <TabItem title="All Project" badge={data?.length ?? 0} value="" />
            <TabItem title="Project" badge={data?.filter(item => item.category_id === PRODUCT_TYPE.projects)?.length ?? 0} value="projects" />
            <TabItem title="ML Model" badge={data?.filter(item => item.category_id === PRODUCT_TYPE["ml-models"])?.length ?? 0} value="ml-models" />
          </TabsList>
        </Tabs>
        <div className="flex w-full md:justify-end items-center gap-4">
          <div>
            <Button
              variant={"ghost"}
              size="icon"
              className="border-none bg-transparent hover:bg-transparent"
              onClick={() => setIsGrid(false)}
            >
              <ListLayoutIcon
                className={`h-5 w-5  duration-200 hover:text-black ${isGrid ? "text-gray-500" : "text-black"}`}
              />
            </Button>
            <Button
              variant={"ghost"}
              size="icon"
              className="border-none bg-transparent hover:bg-transparent"
              onClick={() => setIsGrid(true)}
            >
              <GridLayoutIcon
                className={`h-5 w-5  duration-200 hover:text-black ${isGrid ? "text-black" : "text-gray-500"}`}
              />
            </Button>
          </div>
          {/* <div className="w-2 h-full bg-black" >hi</div> */}
          <div className="w-[2px] h-8 bg-gray-400 my-2 rounded-md" />
          <Button onClick={() => onFilterChange(showFilter)}>Filter</Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button disabled={true}>
                Newest
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <span>Newest</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="text-gray-700 dark:text-gray-300">Loading...</div>
        ) : data && data.length > 0 ? (
          <MarketplaceList showFilter={!!showFilter} products={filteredData} />
        ) : (
          <div className="text-gray-700 dark:text-gray-300">No data found</div>
        )}
      </div>

    </div>
  );
};

export default MarketPlacePage;
