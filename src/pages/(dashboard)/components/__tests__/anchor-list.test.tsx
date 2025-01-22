import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AnchorLists, { isLessThanCurrentAnchor } from "../anchor-list";
import { ThemeProvider } from "../../../../context/theme-context";

describe('isLessThanCurrentAnchor', () => {
  it('should return true when anchorIndex is less than currentAnchor', () => {
    expect(isLessThanCurrentAnchor(2, 5)).toBe(true)
  })

  it('should return false when anchorIndex is equal to currentAnchor', () => {
    expect(isLessThanCurrentAnchor(5, 5)).toBe(false)
  })

  it('should return false when anchorIndex is greater than currentAnchor', () => {
    expect(isLessThanCurrentAnchor(7, 5)).toBe(false)
  })

  it('should return true for negative anchorIndex values less than currentAnchor', () => {
    expect(isLessThanCurrentAnchor(-1, 0)).toBe(true)
  })

  it('should return false for negative anchorIndex values greater than currentAnchor', () => {
    expect(isLessThanCurrentAnchor(0, -1)).toBe(false)
  })
})

describe("AnchorLists Component", () => {
  const mockSetCurrentAnchor = vi.fn();
  const anchroLists = [
    "Description Details",
    "Assessment Service Pricing",
    "Payment",
  ];

  it("renders all anchor list items", () => {
    render(
      <AnchorLists
        currentAnchor={0}
        setCurrentAnchor={mockSetCurrentAnchor}
        anchroLists={anchroLists}
      />,
    );

    // biome-ignore lint/complexity/noForEach: <explanation>
    anchroLists.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("sets current anchor when a button is clicked", () => {
    render(
      <AnchorLists
        currentAnchor={0}
        setCurrentAnchor={mockSetCurrentAnchor}
        anchroLists={anchroLists}
      />,
    );

    const button = screen.getByText("Assessment Service Pricing");
    fireEvent.click(button);

    expect(mockSetCurrentAnchor).toHaveBeenCalledWith(1);
  });

  it("highlights the current anchor button", () => {
    render(

      <ThemeProvider>
        <AnchorLists
          currentAnchor={1}
          setCurrentAnchor={mockSetCurrentAnchor}
          anchroLists={anchroLists}
        />
      </ThemeProvider>
    );

    const currentButton = screen.getByText("Assessment Service Pricing");
    expect(currentButton).toHaveClass("px-4 py-3 w-full text-left rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 bg-gray-300 dark:bg-gray-700"); // The class should match the one applied for selected items
  });
});
