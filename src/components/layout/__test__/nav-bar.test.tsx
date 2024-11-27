import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import NavBar from "../nav-bar";
import useAuthStore from "@/store/auth-store";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import { useModal } from "@/store/modal-store";

vi.mock("@/store/modal-store"); // Mock useModal
// Mocking auth-store to simulate authenticated state changes
vi.mock("@/store/auth-store", () => {
  return {
    __esModule: true,
    default: vi.fn(() => ({
      formType: undefined,
      user: null,
      isAuthenticated: false,
      openLoginNavbar: false,
      login: vi.fn(),
      logout: vi.fn(),
      setOpenLoginNavbar: vi.fn(),
    })),
  };
});

describe("NavBar", () => {
  beforeEach(() => {
    (useModal as vi.Mock).mockReturnValue({
      onOpen: vi.fn(), // Mock onOpen function
    });
  });
  it("renders LoginNavbar when openLoginNavbar is true", () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: false,
      openLoginNavbar: true,
      setOpenLoginNavbar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    // Check that LoginNavbar renders
    expect(screen.getByText(/remember me/i)).toBeInTheDocument();

    // Click to close LoginNavbar
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    expect(useAuthStore().setOpenLoginNavbar).toHaveBeenCalledWith(false);
  });

  it("shows user menu with logout confirmation when authenticated", async () => {
    const { onOpen } = useModal();
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
    });
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    const toggleUserMenu = screen.getByRole("button", {
      name: /Toggle user menu/i,
    });
    expect(toggleUserMenu).toBeInTheDocument();

    await user.click(toggleUserMenu);
    const menu = screen.getByRole('menu');

    const logoutItem = await within(menu).getByText(/logout/i);
    expect(logoutItem).toBeInTheDocument();

    await user.click(logoutItem);

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledWith("confirmationDialog", expect.any(Object));
    });
  });

  it("shows login options when not authenticated", () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: false,
      setOpenLoginNavbar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    // Check that "Book A Demo" and "Get Started" buttons are visible
    expect(screen.getByText("Book A Demo")).toBeInTheDocument();
    // expect(screen.getByText("Get Started")).toBeInTheDocument();

    // Click login button and check for setOpenLoginNavbar call
    const loginBtn = screen.getByRole("button", { name: "LogIn" });
    fireEvent.click(loginBtn);
    expect(useAuthStore().setOpenLoginNavbar).toHaveBeenCalledWith(true);
  });
});
