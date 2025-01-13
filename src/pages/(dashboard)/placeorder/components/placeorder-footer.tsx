import { Button } from "@/components/ui/button";
// import PlaceOrderConfirm from "./placeorder-comfirm";
import { Paragraph } from "@/components/ui/typography";
import { useModal } from "@/store/modal-store";

import stripeLock from "../../../../assets/stripe-lock.png";
import poweredByStripeLogo from "../../../../assets/powered-by-stripe-logo.png";
import { usePlaceOrderInit } from "@/services/placeorder-init-service";
import PlaceOrderConfirm from "./placeorder-comfirm";
import { LoaderCircle } from "lucide-react";
import { usePlaceOrderConfirm } from "@/services/placeorder-confirm-service";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Item } from "@/services/placeorder-quote-service";
import type { ICheckItem } from "@/components/common/check-item";
import type { CatalogContext } from "@/services/marketplace-service";
interface FooterProps {
  title: string;
  id: string;
  items: Item[];
  selectedServices: ICheckItem[];
  total_payment_amount: number | string;
  isGetQuotePending: boolean;
  context: CatalogContext
}


const Footer = ({ title, id, items, selectedServices, total_payment_amount, isGetQuotePending, context }: FooterProps) => {
  // Place Order-Confirmation
  const { onOpen, setLoading, onClose } = useModal();
  const { isPending, mutateAsync } = usePlaceOrderInit(
    {
      billing: {
        "name": "Name",
        "address": "address",
        "state": {
          "name": "Name"
        },
        "city": {
          "name": "Name"
        },
        "email": "example@gmail.com",
        "phone": "123456789"
      },
      items: items.map((item) => ({ id: item.id })),
      provider: {
        id: id,
      },
      context
    }
  )
  const { mutateAsync: confirmMutateAsync, isPending: isConfirmPending } = usePlaceOrderConfirm();
  useEffect(() => {
    setLoading(isConfirmPending);
  }, [isConfirmPending, setLoading]);
  const navigate = useNavigate();
  return (
    <footer className="flex justify-between items-center pl-5 pr-20 pt-5">
      {/* confirm dialog */}
      <Button
        variant="success"
        onClick={async () => {
          const res = await mutateAsync();
          if (res) {
            onOpen("confirmationDialog", {
              confirmationDialog: {
                title: "Confirmation Page",
                content: (
                  <PlaceOrderConfirm
                    name={title}
                    services={selectedServices}
                    // osaps={selectedOasps}
                    total_payment_amount={total_payment_amount}
                  />
                ),
                onConfirm: async () => {
                  const response = await confirmMutateAsync({
                    provider: {
                      id: id,
                    },
                    items: items.map((item) => ({ id: item.id })),
                    billing: res[0]?.message?.catalogs?.responses[0]?.message.order.billing,
                    fulfillments: [],
                    context
                  });
                  if (response) {
                    toast({
                      title: "Order placed successfully",
                      description: "Your order has been placed successfully",
                    });
                  }
                  onClose();
                  navigate("/dashboard/orders");
                },
              },
            });
          }
        }}
        disabled={isPending || isGetQuotePending}
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : 'Place Order'}
      </Button>
      <div className="flex gap-1 items-end">
        <img src={stripeLock} className="h-[28px]" alt="stripe lock" />
        <Paragraph>
          Guaranteed <span className="font-bold">safe & secure</span> checkout
        </Paragraph>
        <img
          src={poweredByStripeLogo}
          className="h-[28px]"
          alt="powered by stripe"
        />
      </div>
    </footer>
  );
};

export default Footer;
