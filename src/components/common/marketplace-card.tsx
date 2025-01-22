import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Item } from "@/services/marketplace-service";
import useAuthStore from "@/store/auth-store";
import { useModal } from "@/store/modal-store";
import { ExternalLink } from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const MarketplaceCard = ({
  product,
}: {
  product: Item;
}) => {
  const { isAuthenticated, setOpenLoginNavbar } = useAuthStore();
  const { onOpen, onClose } = useModal();

  return (
    <Link
      data-testid="marketplace-card"
      onClick={() => {
        !isAuthenticated &&
          onOpen("infoDialog", {
            infoDialog: {
              isLoading: false,
              title: "You Need to Sign in First",
              content:
                "Before viewing the details, please Sign In to your account. If you don't have an account yet, select Sign Up.",
              onConfirm: () => {
                onClose();
              },
              footerContent: (
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={() => {
                      setOpenLoginNavbar(true);
                      onClose();
                    }}
                  >
                    Sign In
                  </Button>
                  <Button>Sign Up</Button>
                </div>
              ),
            },
          });
      }}
      to={
        isAuthenticated
          ? `/dashboard/placeorder/${product?.descriptor?.name}`
          : "#"
      }
    >
      <Card className="max-w-full bg-gray-100 dark:bg-gray-900 border shadow-none rounded-lg overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="space-y-2">
            <Badge
              variant={"secondary"}
              className="h-16 w-16 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-full"
            >
              {product.type === "PROJECT" ? (
                <ProjectIcon className="h-8 w-8 text-gray-800 dark:text-gray-200" />
              ) : (
                <MLModelIcon className="h-8 w-8 text-gray-800 dark:text-gray-200" />
              )}
            </Badge>
            <h3 className="text-lg font-semibold flex gap-1 items-center text-gray-900 dark:text-gray-100">
              {product.descriptor.name}{" "}
              <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500 text-sm" />
            </h3>
            <p className="text-xs opacity-50 text-gray-700 dark:text-gray-400">
              by {product.provider?.name}
            </p>
          </CardTitle>
        </CardHeader>

        <CardDescription className="text-xs mt-2 px-6 pb-4 text-gray-700 dark:text-gray-300">
          {product.descriptor.short_desc}
        </CardDescription>

        <CardContent className="space-y-2">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Service Offered
          </div>
          <div className="flex flex-wrap gap-1">
            {product.services?.slice(0, 3).map((service) => (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                key={service.name}
              >
                {service.name}
              </Badge>
            ))}
            {product.services && product.services?.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      +{product.services.length - 3}
                    </TooltipTrigger>
                    <TooltipContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow w-60 flex gap-2 flex-wrap p-3">
                      {product.services?.slice(3).map((service) => (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          key={service.name}
                        >
                          {service.name}
                        </Badge>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-6 mt-auto">
          <div className="text-lg text-gray-900 dark:text-gray-100">
            ₹{Number(product.totalPrice).toLocaleString("en-IN")}
          </div>
          <div className="text-xs font-medium capitalize text-gray-600 dark:text-gray-400">
            {product?.category_id}
          </div>
        </CardFooter>
      </Card>

    </Link>
  );
};
