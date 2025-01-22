import { MarketplaceCard } from "@/components/common/marketplace-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useMarketPlaceProducts } from "@/services/marketplace-service";
import type { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MarketPlacePage from "../(dashboard)/marketplace/marketplace-page";
import { SquareArrowOutUpRight } from "lucide-react";
import LatestNews from "./components/LatestNews";
import { FeatureCard } from "@/components/common/feature-card";
import { PRODUCT_TYPE } from "@/lib/constant";
import PagePagination from "@/components/common/page-pagination";
import { ROUTE_PATH } from "@/routes/route-path";
const TabItem = ({
  title,
  badge,
  value,
}: { title: string; badge?: number; value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-0 md:gap-2 outline-none data-[state=active]:font-semibold data-[state=active]:border-black data-[state=active]:border-b-2 rounded-none !shadow-none overflow-auto max-w-screen p-1 md:p-4"
    >
      <span>{title}</span>
      {badge && <Badge variant={"secondary"}>{badge}</Badge>}
    </TabsTrigger>
  );
};

const HomePage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const featuredCurrentPage = Number(searchParams.get("fpage")) || 1;

  const activeTab = searchParams.get("f") || "";
  const { data: products, isLoading } = useMarketPlaceProducts(
    "",
    activeTab ? PRODUCT_TYPE[activeTab as keyof typeof PRODUCT_TYPE] : "",
  );
  const { data: productsForOSAP, isLoading: isLoadingForOSAP } =
    useMarketPlaceProducts("", "");

  const onPageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const getPageItems = () => {
    return products?.slice((currentPage - 1) * 4, currentPage * 4);
  };

  const pageCount = Math.ceil(products ? products?.length / 4 : 0);

  const getFeaturedPageItems = () => {
    return productsForOSAP?.slice((featuredCurrentPage - 1) * 4, featuredCurrentPage * 4);
  };

  const featuredPageCount = Math.ceil(productsForOSAP ? productsForOSAP?.length / 4 : 0);

  const onFeaturedPageChange = (page: number) => {
    searchParams.set("fpage", page.toString());
    setSearchParams(searchParams);
  };

  const onChange = (value: string) => {
    if (value === "") {
      searchParams.delete("f");
    } else {
      searchParams.set("f", value);
    }
    setSearchParams(searchParams);
  };
  return (
    <div>
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 -mt-3 page-root">
        <div className="flex flex-col gap-7">
          <Typography as="h1" className="text-gray-900 dark:text-gray-100">
            <div>Your Marketplace for Secure</div>
            <div>Open Source Software Solutions</div>
          </Typography>
          <Typography as="p" className="text-gray-700 dark:text-gray-300 w-full lg:w-4/5 xl:w-1/2">
            Rely on the OSSVerse partner ecosystem, a collaborative community of
            experts and technologies, to keep your automotive business at the
            forefront of cloud and AI advancements.
          </Typography>
          <div className="flex gap-4">
            <Button
              type="button"
              disabled
              className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              Get Started
            </Button>
          </div>
        </div>
        <img
          src="/MarketplaceServices.png"
          className="hidden lg:block w-[625px]"
          alt="Banner"
        />
      </div>

      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-4 px-10">
          <Typography as="h2" className="text-gray-900 dark:text-gray-100">
            Featured Marketplace Offerings
          </Typography>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-4 items-center flex-wrap md:flex-nowrap">
            <Tabs onValueChange={onChange} value={activeTab} className="w-full">
              <TabsList className="bg-transparent gap-0 md:gap-4 text-gray-700 dark:text-gray-300">
                <TabItem title="All Offering" value="" />
                <TabItem title="ML Model" value="ml-models" />
                <TabItem title="Project" value="projects" />
              </TabsList>
            </Tabs>
            {/* Pagination */}
            <div>
              <PagePagination
                currentPage={currentPage}
                totalPages={pageCount}
                onPageChange={onPageChange}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="text-gray-700 dark:text-gray-300">Loading...</div>
          ) : (
            products && (
              <div className="grid gap-[30px] justify-center mx-auto w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {getPageItems()?.map((product) => (
                  <MarketplaceCard product={product} key={product?.id} />
                ))}
              </div>
            )
          )}
          <div className="mt-6">
            <Link to={ROUTE_PATH.MARKETPLACE}>
              <Button
                className="flex gap-1 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                type="button"
              >
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-10">
          <Typography as="h2" className="text-gray-900 dark:text-gray-100">
            Featured Open Source Assurance Service Providers
          </Typography>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2 text-gray-700 dark:text-gray-300 text-sm">
              <span>Popular Service Offered:</span>
              <div className="flex items-center">
                <span>Assessment</span>
                <SquareArrowOutUpRight className="h-3 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex items-center">
                <span>Certification</span>
                <SquareArrowOutUpRight className="h-3 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex items-center">
                <span>Feature Enhancement</span>
                <SquareArrowOutUpRight className="h-3 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            {/* Pagination */}
            <div>
              <PagePagination
                currentPage={featuredCurrentPage}
                totalPages={featuredPageCount}
                onPageChange={onFeaturedPageChange}
              />
            </div>
          </div>
          {isLoadingForOSAP ? (
            <div className="text-gray-700 dark:text-gray-300">Loading...</div>
          ) : (
            productsForOSAP && (
              <div className="grid gap-[30px] justify-center mx-auto w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {getFeaturedPageItems()?.map((product) => (
                  <FeatureCard product={product} key={product.id} />
                ))}
              </div>
            )
          )}
          <div className="mt-6">
            <Button
              disabled={true}
              className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            >
              Explore Open Source Service Providers (OASP)
            </Button>
          </div>
        </div>

        <MarketPlacePage isHomePage={true} />
        <LatestNews />
      </div>
    </div>
  );
};

export default HomePage;
