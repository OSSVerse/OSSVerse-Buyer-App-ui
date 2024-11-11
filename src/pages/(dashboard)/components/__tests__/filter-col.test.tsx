import { describe, it, expect, vi, beforeEach } from 'vitest';
import FilterCol, { setFilterKeyData } from '../filter-col';
import { DEFAULT_CATEGORY_IDS, DEFAULT_PRODUCT_SUB_CATEOGRY_1 } from '../../../../lib/constant';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


// Mock the constants for testing purposes

describe('setFilterKeyData', () => {
  it('should return DEFAULT_CATEGORY_IDS for category_id', () => {
    const result = setFilterKeyData("category_id");
    expect(result).toEqual(DEFAULT_CATEGORY_IDS);
  });

  it('should return DEFAULT_PRODUCT_SUB_CATEOGRY_1 for productSubcategory1', () => {
    const result = setFilterKeyData("productSubcategory1");
    expect(result).toEqual(DEFAULT_PRODUCT_SUB_CATEOGRY_1);
  });

  it('should throw an error for an invalid filterKey', () => {
    expect(() => setFilterKeyData("invalidKey")).toThrowError("No such filter Key, please correct it");
  });
});


// Mock data
const mockFilterSortPager = {
  category_id: DEFAULT_CATEGORY_IDS,
  productSubcategory1: DEFAULT_PRODUCT_SUB_CATEOGRY_1,
  price: [],
};

const mockSetFilterSortPager = vi.fn();

// Clear mock function before each test
beforeEach(() => {
  mockSetFilterSortPager.mockClear();
});

describe("FilterCol Component", () => {
  it("should render FilterCol and display filter options", () => {
    render(
      <FilterCol
        filterSortPager={mockFilterSortPager}
        setFilterSortPager={mockSetFilterSortPager}
      />
    );

    // Check if the filter options are rendered
    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Service Order")).toBeInTheDocument();
  });

  it.skip("should call setFilterSortPager when a filter is selected", async() => {
    const user = userEvent.setup();
    render(
      <FilterCol
        filterSortPager={mockFilterSortPager}
        setFilterSortPager={mockSetFilterSortPager}
      />
    );

    // Simulate selecting a filter
    const checkbox = screen.getByLabelText(DEFAULT_CATEGORY_IDS[0]);
    user.click(checkbox);

    // Check if setFilterSortPager was called with the expected parameters
    await waitFor(() => {

      expect(mockSetFilterSortPager).toHaveBeenCalledWith(expect.objectContaining({
        category_id: expect.arrayContaining([DEFAULT_CATEGORY_IDS[0]]),
      }));
    })
  });

  it("should 'Reset' button is disabled", () => {
    render(
      <FilterCol
        filterSortPager={mockFilterSortPager}
        setFilterSortPager={mockSetFilterSortPager}
      />
    );

    // Simulate clicking the reset button
    const resetButton = screen.getByText("Reset");
    expect(resetButton).toBeDisabled();
  });

  it.skip("should reset filters when 'Reset' button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <FilterCol
        filterSortPager={mockFilterSortPager}
        setFilterSortPager={mockSetFilterSortPager}
      />
    );

    // Simulate clicking the reset button
    const resetButton = screen.getByText("Reset");
    const allTypeButton = screen.getByTestId('All Type');

    // Assert the initial state (aria-checked should be "true" if it's checked)
    expect(allTypeButton).toHaveAttribute("aria-checked", "true");

    // Simulate a click to toggle the button state
    await user.click(allTypeButton);

    // Assert the new state after the click (aria-checked should be "false" if it's unchecked)
    expect(allTypeButton).toHaveAttribute("aria-checked", "false");

    // Simulate another click to toggle it back
    await userEvent.click(allTypeButton);
    expect(allTypeButton).toHaveAttribute("aria-checked", "true");
    expect(resetButton).not.toBeDisabled();

    // Check if setFilterSortPager was called to reset filters
    expect(mockSetFilterSortPager).toHaveBeenCalledWith(expect.objectContaining({
      category_id: DEFAULT_CATEGORY_IDS,
      productSubcategory1: DEFAULT_PRODUCT_SUB_CATEOGRY_1,
    }));
  });

  it("should filter search term", () => {
    render(
      <FilterCol
        filterSortPager={mockFilterSortPager}
        setFilterSortPager={mockSetFilterSortPager}
      />
    );

    // Simulate typing in the search input
    const searchInput = screen.getByPlaceholderText("Search service Offer...");
    fireEvent.change(searchInput, { target: { value: "example" } });

    // Assert that the search term state was updated (you may want to check specific behavior here)
    expect(screen.getByPlaceholderText("Search service Offer...")).toHaveValue("example");
  });

  it.skip("should call setFilterSortPager with 'All' selected", () => {
    render(
      <FilterCol
        filterSortPager={mockFilterSortPager}
        setFilterSortPager={mockSetFilterSortPager}
      />
    );

    // Simulate selecting the 'All Type' checkbox
    const allTypeCheckbox = screen.getByLabelText("All Type");
    fireEvent.click(allTypeCheckbox);

    // Check if setFilterSortPager was called to set all category ids
    expect(mockSetFilterSortPager).toHaveBeenCalledWith(expect.objectContaining({
      category_id: DEFAULT_CATEGORY_IDS,
    }));
  });
});
