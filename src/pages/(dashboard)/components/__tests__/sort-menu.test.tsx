global.ResizeObserver = class {
  observe() { }
  unobserve() { }
  disconnect() { }
};

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SortMenu from "../sort-menu";
import { SORT_MENUS, SortOrder } from "../../../../lib/constant";
import { afterEach } from "vitest";

describe("SortMenu Component", () => {
  const mockSetFilters = vi.fn();
  const filters = {
    sort: "Newest",
    order: SortOrder.Descending,
  };

  const setup = () => {
    render(
      <SortMenu
        setFilterSortPager={mockSetFilters}
        filterSortPager={filters}
      />,
    );

  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    setup();
    const triggerButton = screen.getByRole("button", { name: /newest/i });
    expect(triggerButton).toBeInTheDocument();
  });

  it("displays all sort menu options", () => {
    setup();
    const sortedText = "Newest";
    fireEvent.click(screen.getByRole("button", { name: /newest/i }));

    // biome-ignore lint/complexity/noForEach: <explanation>
    SORT_MENUS.forEach((menu) => {
      console.log(menu);
      console.log("=============================================================")
      if (menu === sortedText) {
        expect(screen.getAllByText(menu)).toHaveLength(1);
      } 
      // else {
      //   expect(screen.getByText(menu)).toBeInTheDocument();
      // }
    });
  });

  // it("calls setFilterSortPager with correct sort option", () => {
  //   setup();
  //   fireEvent.click(screen.getByRole("button", { name: /newest/i }));

  //   const dueDateOption = screen.getByText("Due Date");
  //   fireEvent.click(dueDateOption);

  //   expect(mockSetFilters).toHaveBeenCalledWith({
  //     ...filters,
  //     sort: "Due Date",
  //     order: SortOrder.Descending,
  //   });
  //   expect(mockSetFilters).toHaveBeenCalledTimes(1);
  // });

  // it("displays correct arrow icon next to selected sort option", async () => {
  //   setup();
  //   fireEvent.click(screen.getByRole("button", { name: /newest/i }));

  //   const dueDateOption = screen.getByText("Due Date");
  //   fireEvent.click(dueDateOption);

  //   const arrowDownIcon = screen
  //     .getAllByText("Due Date")[1]
  //     .parentElement?.querySelector(".lucide-arrow-up");
  //   expect(arrowDownIcon).toBeInTheDocument();
  // });
});
