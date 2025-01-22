import { ChevronDown, CircleUser, LogIn, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationButton from "@/components/common/notification-button";
import useAuthStore from "@/store/auth-store";
import { useModal } from "@/store/modal-store";
import LoginNavbar from "./login-navbar";
import { ROUTE_PATH } from "@/routes/route-path";
import { useTheme } from "@/context/theme-context";
import DarkLogo from "../icons/Dark/logo";
import LightLogo from "../icons/Light/logo";

const items = [
  {
    name: "My Dashboard",
    href: "/dashboard",
    id: 1,
    isProtected: true,
  },
  {
    name: "My Order",
    href: "/dashboard/orders",
    id: 2,
    isProtected: true,
  },
  // {
  //   name: "My Solution",
  //   href: "/solutions",
  //   id: 3,
  //   isProtected: false,
  // },
  // {
  //   name: "Platform",
  //   href: "/platform",
  //   id: 4,
  //   isProtected: false,
  // },
  // {
  //   name: "Resources",
  //   href: "/resources",
  //   id: 5,
  //   isProtected: false,
  // },
  // {
  //   name: "Company",
  //   href: "/company",
  //   id: 6,
  //   isProtected: false,
  // },
];

const NavBar = () => {
  const { isAuthenticated, logout, openLoginNavbar, setOpenLoginNavbar } =
    useAuthStore((state) => state);
  const { onOpen, onClose } = useModal();
  const location = useLocation();
  const logo = (useTheme().theme === 'dark') ? <DarkLogo /> : <LightLogo />

  const availableRoutes = Object.values(ROUTE_PATH);

  return (
    <>
      {openLoginNavbar && (
        <LoginNavbar close={() => setOpenLoginNavbar(false)} />
      )}
      <header className="sticky top-0 z-10 flex h-16 items-center border gap-4 border-b bg-background px-4 md:px-8 py-4 mb-3">
        <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
          <Link
            to="/"
            className="p-2 flex items-center gap-2 text-lg  md:text-base"
          >
            {logo}
          </Link>

          {items.map((item) => {
            const isRouteAvailable = availableRoutes.includes(item.href);
            return (
              <Link
                to={isRouteAvailable ? item.href : "#"}
                key={item.id}
                className={`p-2 transition-colors text-foreground ${isRouteAvailable
                  ? "hover:text-accent-foreground"
                  : "text-gray-400 cursor-not-allowed"
                  } ${item.href === location.pathname ? "font-bold" : ""
                  } ${item.isProtected && !isAuthenticated ? "hidden" : ""
                  }`}
                aria-disabled={!isRouteAvailable}>
                {item.name}
              </Link>
            )
          })}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                {logo}
              </Link>
              {items.map((item) => (
                <Link
                  to={item.href}
                  key={item.id}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <Search className="h-10 w-10 p-2 text-muted-foreground xl:hidden border rounded" />

          <form className="ml-0 mr-auto hidden xl:block flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Global search..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>
          </form>


          {/* {isAuthenticated && (
            <Button variant="secondary" size="icon" className="rounded-full">
              <AddIcon className="h-5 w-5" />
            </Button>
          )} */}
          {isAuthenticated && <NotificationButton />}
          {!isAuthenticated && (
            <>
              <Button disabled>Book A Demo</Button>
              {/* <Button>Get Started</Button> */}
              {/* divider */}
              <div className="h-6 w-[1px] bg-gray-400" />
            </>
          )}
          {isAuthenticated ? (
            <DropdownMenu modal>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <CircleUser className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                  <div className="cursor-pointer">
                    <div className="flex gap-2 items-center text-sm text-gray-700 dark:text-gray-300">
                      Clark Kent
                      <span>
                        <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      BUSINESS
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    onOpen("confirmationDialog", {
                      confirmationDialog: {
                        title: "Logout",
                        content: "Are you sure you want to logout?",
                        onConfirm: () => {
                          logout();
                          onClose();
                        },
                      },
                    });
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="icon"
              onClick={() => {
                setOpenLoginNavbar(true);
              }}
            >
              <span className="sr-only">LogIn</span>
              <LogIn />
            </Button>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
