import type { ICheckItem } from "@/components/common/check-item";
import PlaceOrderCheckList from "./placeorder-check-list";
import { Card } from "@/components/ui/card";
import { H1, H3, Paragraph } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import ProjectIcon from "@/components/icons/project-icon";
import MLModelIcon from "@/components/icons/ml-model-icon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import type { Item } from "@/services/marketplace-service";

// const servicesItems: ICheckItem[] = [
//   {
//     id: "servicesItems-1",
//     name: "Assessment",
//     qty: 400,
//     icon: "search-alt",
//   },
//   {
//     id: "servicesItems-2",
//     name: "Attestation",
//     qty: 400,
//     icon: "rr-file",
//   },
//   {
//     id: "servicesItems-3",
//     name: "Certification",
//     qty: 400,
//     icon: "diploma",
//   },
//   {
//     id: "servicesItems-4",
//     name: "Remediation",
//     qty: 400,
//     icon: "refresh",
//   },
//   {
//     id: "servicesItems-5",
//     name: "Feature Enhancement",
//     qty: 300,
//     icon: "file-add",
//   },
//   {
//     id: "servicesItems-6",
//     name: "TAVOSS Version",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-7",
//     name: "Security Hardening",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-8",
//     name: "Vuinerability Management",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-9",
//     name: "Code Review & Analysis",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-10",
//     name: "Penetration Testing",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-11",
//     name: "Test",
//     qty: 400,
//     icon: "file",
//   },
//   {
//     id: "servicesItems-12",
//     name: "Dummy",
//     qty: 400,
//     icon: "file",
//   },
// ];

// const oaspItems: ICheckItem[] = [
//   {
//     id: "oaspItems-1",
//     name: "Tocomo",
//     qty: 400,
//     to: 600,
//     icon: "search-alt",
//   },
//   {
//     id: "oaspItems-2",
//     name: "GreenHil",
//     qty: 400,
//     to: 600,
//     icon: "rr-file",
//   },
//   {
//     id: "oaspItems-3",
//     name: "InnoTech",
//     qty: 400,
//     to: 600,
//     icon: "diploma",
//   },
//   {
//     id: "oaspItems-4",
//     name: "ButterflyTech",
//     qty: 400,
//     to: 600,
//     icon: "refresh",
//   },
//   {
//     id: "oaspItems-5",
//     name: "OpenFort",
//     qty: 300,
//     to: 600,
//     icon: "file-add",
//   },
//   {
//     id: "oaspItems-6",
//     name: "BrainTech",
//     qty: 400,
//     to: 600,
//     icon: "file",
//   },
//   {
//     id: "oaspItems-7",
//     name: "Advanced Soft",
//     qty: 400,
//     to: 600,
//     icon: "file",
//   },
//   {
//     id: "oaspItems-8",
//     name: "ButterflyTech",
//     qty: 400,
//     to: 600,
//     icon: "file",
//   },
//   {
//     id: "oaspItems-9",
//     name: "InnovationLead",
//     qty: 400,
//     to: 600,
//     icon: "file",
//   },
//   {
//     id: "oaspItems-10",
//     name: "TechAuto",
//     qty: 400,
//     to: 600,
//     icon: "file",
//   },
//   {
//     id: "oaspItems-11",
//     name: "Test",
//     qty: 400,
//     to: 600,
//     icon: "file",
//   },
//   {
//     id: "oaspItems-12",
//     name: "Dummy",
//     qty: 400,
//     to: 600,
//     icon: "file",
//   },
// ];

interface AssessmentServicePricingProps {
  type: string;
  creator: string;
  pricing_overall_info: string[];
  products: Item[];
  selectedServices: ICheckItem[];
  setSelectedServices: React.Dispatch<React.SetStateAction<ICheckItem[]>>;
  total_payment_amount: number | string;
}

const AssessmentServicePricing = ({
  type,
  pricing_overall_info,
  products,
  selectedServices,
  setSelectedServices,
  total_payment_amount,
}: AssessmentServicePricingProps) => {
  const total_service_amount = 0;

  return (
    <Card className="px-5 py-6 mb-4">
      <H3 className="font-bold  mb-4">OASP and Service List Provided</H3>
      <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap items-end justify-between">
        <div className="basis-3/5 flex gap-4 items-center">
          <Badge
            variant={"secondary"}
            className=" h-16 w-16 flex items-center justify-center rounded-full"
          >
            {type === "PROJECT" ? (
              <ProjectIcon className="h-8 w-8" />
            ) : (
              <MLModelIcon className="h-8 w-8" />
            )}
          </Badge>
          <div>
            <H1 className="mb-1">{products?.[0]?.provider?.name}</H1>
            <div className=" space-x-1">
              {pricing_overall_info.map((info) => (
                <Badge variant="secondary" className="text-x " key={info}>
                  {info}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-2/5 flex gap-4 justify-end">
          <form className="ml-auto flex  gap-3 md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Service.."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </div>

      {/* service list */}
      <PlaceOrderCheckList
        items={products?.[0]?.services ?? []}
        setSelectedItems={setSelectedServices}
        selectedItems={selectedServices}
      />
      {/* <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap items-end justify-between">
        <div className="basis-3/5 flex gap-4 items-center">
          <div>
            <H1>Top Recommended OASPs for Validation Your Project</H1>

            <Muted className="leading-5">
              Recommendation Criteria: Suitable expertise,95% successful track
              record or above, 4.8customer ratings or above and same
              geographical proximity.
            </Muted>
          </div>
        </div>
        <div className="basis-2/5 flex gap-4 justify-end">
          <form className="ml-auto flex gap-3 md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search OASP.."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Button className="rounded-full">filter</Button>
          </form>
        </div>
      </div>
      <PlaceOrderCheckList
        items={oaspItems}
        setSelectedItems={setSelectedOasps}
        disabledLength={selectedOasps.length >= 2}
      />
      <Muted className="leading-5">
        Note: lf you want to change the OASP recommended by the platform, please
        uncheck it first and replace with your choice.
      </Muted> */}
      <Separator className="my-10" />
      <H3 className="font-bold  mb-4">Assessment Service Pricing</H3>
      <div className="w-3/4 flex flex-col gap-2">
        <div className="flex justify-between">
          <Paragraph>Initial Assessment</Paragraph>{" "}
          <span>₹{total_service_amount}</span>
        </div>
        <div className="pl-4 flex flex-col gap-2">
          {selectedServices.map((selectedService) => (
            <div key={selectedService.id} className="flex gap-2">
              <Paragraph className="basis-[49%]">
                {selectedService.name}
              </Paragraph>{" "}
              <span>₹{selectedService.price}</span>
            </div>
          ))}
        </div>
        {/* {selectedOasps.map((selectedOasp) => (
          <div key={selectedOasp.id} className="flex justify-between">
            <Label>{selectedOasp.name}</Label> <span>₹
              {selectedOasp.qty}
            </span>
          </div>
        ))} */}
        <Separator className="my-4 relative before:content-['+'] before:absolute before:-right-5 before:-top-4 before:text-black before:text-2xl" />

        <div className="flex justify-between">
          <Label>Total of Payment</Label>{" "}
          <span className="font-bold">₹{total_payment_amount}</span>
        </div>
      </div>
    </Card>
  );
};

export default AssessmentServicePricing;
