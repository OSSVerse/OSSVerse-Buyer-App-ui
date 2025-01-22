import { Link } from "react-router-dom";
import Logo from "../icons/Light/logo";
import useAuthStore from "@/store/auth-store";
import LoginNavbar from "./login-navbar";
import { ROUTE_PATH } from "@/routes/route-path";
import ThemeSwitcher from "../theme-switcher";

const Footer = () => {
  const { isAuthenticated, openLoginNavbar, setOpenLoginNavbar } =
    useAuthStore((state) => state);
  return (
    <>
      {openLoginNavbar && (
        <LoginNavbar close={() => setOpenLoginNavbar(false)} />
      )}
      <footer className="mt-8 border-t pt-4 page-root bg-secondary">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-10 text-sm ">
          <div className="flex flex-col gap-10 text-muted-foreground">
            <Logo height={26 * 1.5} width={87 * 1.5} />
            <div>
              <p>© 2024 OSSVerse.</p>
              <p>Connecting Innovators with Security Experts.</p>
              <p>All rights reserved.</p>
            </div>
          </div>
          <div className="flex flex-wrap w-1/2 gap-20">
            {/* <div className="flex flex-col gap-4">
              <Link to="/platform" className="hover:underline">
                Platform
              </Link>
              <Link to="/solutions" className="hover:underline">
                Solutions
              </Link>
            </div> */}

            {/* <div className="flex flex-col gap-4">
              <Link to="/resources" className="hover:underline">
                Resources
              </Link>
              <Link to="/company" className="hover:underline">
                Company
              </Link>
            </div> */}

            <div className="flex flex-col gap-4">
              <Link to="/book-a-demo" className="hover:underline cursor-not-allowed text-gray-400 pointer-events-none" aria-disabled={true}>
                Book a Demo
              </Link>
              <Link to={ROUTE_PATH.MARKETPLACE} className="hover:underline">
                Explore Marketplace
              </Link>
            </div>
            {
              !isAuthenticated && (
                <div className="flex flex-col gap-4">
                  <Link onClick={(e) => {
                    e.preventDefault();
                    setOpenLoginNavbar(true);
                  }} className="hover:underline" to={""}>
                    Sign in
                  </Link>
                </div>
              )
            }
            <ThemeSwitcher />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
