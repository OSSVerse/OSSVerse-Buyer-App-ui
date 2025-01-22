import AppBreadCrumb from "@/components/common/app-breadcrumb";
import PlaceorderHeader from "./components/placeorder-header";
import AnchorLists, {
  isLessThanCurrentAnchor,
} from "../components/anchor-list";
import DescriptionDetail from "./components/placeorder-description-detail";
import { cn } from "@/lib/utils";
import AssessmentServicePricing from "./components/placeorder-assessment-service-pricing";
import Payment from "./components/placeorder-payment";
import { useEffect, useState } from "react";
import { Muted } from "@/components/ui/typography";
import Footer from "./components/placeorder-footer";
import { usePlaceOrderQuote } from "@/services/placeorder-quote-service";
import { useParams } from "react-router-dom";
import { useMarketPlaceProducts } from "@/services/marketplace-service";
import type { ICheckItem } from "@/components/common/check-item";
import PyamentMethod from "../components/payment-method";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "OSS ARTIFACT DETAILS",
    url: "/dashboard/placeholder",
  },
];

const anchroLists = [
  "Descripton Details",
  "Assessment Service Pricing",
  "Payment",
];

const product = {
  id: 1,
  title: "OpenPilot",
  creator: "OpenFort",
  description:
    "An open source driving agent that performs automatic lane keeping.",
  services: [
    "ASSESSMENT",
    "ATTESTATION",
    "CERTIFICATION",
    "REMEDIATION",
    "FEATURE ENHANCEMENT",
  ],
  price: 400,
  total_payment_amount: 1200,
  credit_card: {
    number: "12134 1234 1234 1234",
    date: "08/24 XXX",
  },
  type: "PROJECT",
  pricing_overall_info: [
    "OASP License",
    "12 SIMILAR PROJECT",
    "98% SUCCESSFULL",
    "4.9 from 50 reviewers",
  ],
  description_details:
    "### OpenPilot\nOpenpilot is an open source driver assistance system. 0penpilot performs the functions of Automated Lane Centering and Adaptive Cruise Controlfor250+ supported car makes and models.\n\n### Input\nA ison file that contains the following fields:\n- text -(string, required) The text sequence to use to prompt nthe generation\n- max_length - (int, optional, defaults to length of input text + 50) - The maximum length of the sequence to be generated\n- max new tokens(int,optional) \n- min_length (int, optional)\n- do sample(boolean,optional)\n- early_stopping (boolean, optional) num beams(int,optional)\n- temperature (float,optional)\n- top k(int,optional) \n- top_p(float, optional) repetition penalty (float,optional)\n- no_repeat_ngram size(int,optional)\n- encoderno_repeat_ngram_size(int,optional) num return\n- sequences(int.optional)\nFor more information on the above fields, refer to the Huggingface Model generation documentation [https:/huggingface.co/transformers/main_classes/model.html#generation](https:/huggingface.co/transformers/main_classes/model.html#generation)\n\n### Output\ngenerated text A text file containing the\n",
  feature_enhancement:
    "### Feature Enhancement\nSecurity Upgrades \n- Two-Factor Authentication (2FA): Add 2FA to provide an extra layer of security for user accounts.\n- Data Encryption: lmplement end-to-end encryption for all data transactions to ensure user data privacy and security.\n\nNew Functionalities \n\n- Real-Time Colaboration: Enable multiple users to work on the same document or project simultaneously, with real-time updates and version control.\n- Al-Powered insights: ntegrate artificial inteligence to provide predictive analytics and actionable insights based on user data.\n\nIntegration Capabilities\n\n- Third-Party integrations: support for popular third-party services such as Slack, Trello, or Google Drive, alowing seamless integration and workfow automation.\n- APl! Enhancements: Expand APl capabilities to alow more comprehensive access and manipulation of data, enabing developers to build more powerful integrations.",
};

const PlaceOrderPage = () => {
  const { id } = useParams();
  const [currentAnchor, setCurrentAnchor] = useState(0);

  const { data: products } = useMarketPlaceProducts(id as string, "");
  const {
    data: placeOrderQuote,
    mutateAsync,
    isPending,
  } = usePlaceOrderQuote();

  const [selectedServices, setSelectedServices] = useState<ICheckItem[]>([]);

  useEffect(() => {
    if (products && id) {
      mutateAsync({
        fulfillment: {},
        items: selectedServices?.map((service) => ({ id: service.id })) ?? [],
        provider: {
          id: products?.[0]?.provider?.id ?? "",
        },
        context: products?.[0]?.context
      });
    }
  }, [mutateAsync, products, id, selectedServices]);

  useEffect(() => {
    if (products) {
      setSelectedServices(products[0]?.services ?? []);
    }
  }, [products]);

  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={breadcrumb} />
      {/* title */}
      <PlaceorderHeader
        type={product.type}
        title={products?.[0]?.descriptor?.name ?? ""}
        description={products?.[0]?.descriptor?.short_desc ?? ""}
      />

      {/* main */}
      <main
        className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap
      before:content=['']
      before:absolute
      before:top-0
      before:left-0
      before:w-full
      before:h-[400px]
      before:bg-neutral-100
      before:dark:bg-gray-500
      before:z-[-1]
      "
      >
        {/* main aside */}
        <aside className="basis-72 flex-shrink-0">
          {/* anchor link list */}
          <AnchorLists
            currentAnchor={currentAnchor}
            setCurrentAnchor={setCurrentAnchor}
            anchroLists={anchroLists}
          />

          <PyamentMethod
            number={product?.credit_card?.number}
            date={product?.credit_card?.date}
            total_payment_amount={
              isPending
                ? "loading..."
                : placeOrderQuote
                  ? (Number(
                    placeOrderQuote?.[0]?.message?.catalogs?.order?.quote
                      ?.price.value,
                  ) ?? 0)
                  : 0
            }
          />
        </aside>
        <div className="flex-grow">
          {/* description detail section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(0, currentAnchor) && "hidden"
            )}
          >
            <Muted className="mb-4 text-gray-700 dark:text-gray-300">
              {anchroLists[0].toLocaleUpperCase()}
            </Muted>
            <DescriptionDetail
              description_details={product?.description_details}
              feature_enhancement={product?.feature_enhancement}
            />
          </section>


          {/* assessment service pricing section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(1, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[1].toLocaleUpperCase()}</Muted>
            <AssessmentServicePricing
              total_payment_amount={
                isPending
                  ? "loading..."
                  : placeOrderQuote
                    ? (Number(
                      placeOrderQuote?.[0]?.message?.catalogs?.order?.quote
                        ?.price.value,
                    ) ?? 0)
                    : 0
              }
              type={product.type}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              creator={product.creator}
              pricing_overall_info={product.pricing_overall_info}
              products={products ?? []}
            />
          </section>

          {/* payment section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(2, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[2].toLocaleUpperCase()}</Muted>
            {/* Here will be replaced by 3rd party payment gayway */}
            <Payment />
          </section>

          {/* footer */}
          {products && (
            <Footer
              selectedServices={selectedServices}
              total_payment_amount={
                isPending
                  ? "loading..."
                  : placeOrderQuote
                    ? (Number(
                      placeOrderQuote?.[0]?.message?.catalogs?.order?.quote
                        ?.price.value,
                    ) ?? 0)
                    : 0
              }
              items={products[0]?.services ?? []}
              id={products?.[0]?.provider?.id ?? ""}
              title={products?.[0]?.descriptor?.name ?? ""}
              context={products?.[0]?.context}
              isGetQuotePending={isPending}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PlaceOrderPage;
