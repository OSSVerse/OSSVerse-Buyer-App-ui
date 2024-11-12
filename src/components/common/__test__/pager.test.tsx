import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import Pager, { ShowPerPage } from '../pager';

const mockSetFilterSortPager = vi.fn();
const mockFilterSortPager = {
    total: 50,
    pageSize: 10,
    page: 1,
};

describe('Pager Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly and displays the correct page numbers', () => {
        render(
            <Pager
                setFilterSortPager={mockSetFilterSortPager}
                filterSortPager={mockFilterSortPager}
            />
        );

        // Assert the "Showing X-Y of Z" text is displayed correctly
        expect(screen.getByText('Showing 1-10 of 50')).toBeInTheDocument();
    });

    it.skip('navigates to the next page correctly', async () => {
        render(
            <Pager
                setFilterSortPager={mockSetFilterSortPager}
                filterSortPager={mockFilterSortPager}
            />
        );

        // Simulate a "Next" button click
        await act(async () => {
            fireEvent.click(screen.getByTestId("next"));
        });

        await waitFor(() => {
            expect(mockSetFilterSortPager).toHaveBeenCalledWith(
                expect.objectContaining({
                    page: 2,
                })
            );
        });
        // expect(screen.getByText('Showing 11-20 of 50')).toBeInTheDocument();
    });

    it.skip('navigates to the previous page correctly', () => {
        const mockFilterSortPagerPrev = { ...mockFilterSortPager, page: 2 };

        render(
            <Pager
                setFilterSortPager={mockSetFilterSortPager}
                filterSortPager={mockFilterSortPagerPrev}
            />
        );

        // Simulate a "Previous" button click
        fireEvent.click(screen.getByRole('button', { name: /previous/i }));

        // Verify that the setFilterSortPager function is called with the correct page value
        expect(mockSetFilterSortPager).toHaveBeenCalledWith(
            expect.objectContaining({
                page: 1, // It should go back to page 1
            })
        );
    });

    it.skip('updates the page number when a page link is clicked', () => {
        render(
            <Pager
                setFilterSortPager={mockSetFilterSortPager}
                filterSortPager={mockFilterSortPager}
            />
        );

        // Simulate clicking on the page number "2"
        fireEvent.click(screen.getByText('2'));

        // Verify that the setFilterSortPager function is called with the correct page value
        expect(mockSetFilterSortPager).toHaveBeenCalledWith(
            expect.objectContaining({
                page: 2, // It should go to page 2
            })
        );
    });
});

describe('ShowPerPage Component', () => {
    it('renders and displays the current page size correctly', () => {
        render(
            <ShowPerPage
                setFilterSortPager={mockSetFilterSortPager}
                filterSortPager={mockFilterSortPager}
            />
        );

        // Assert the page size is displayed correctly
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it.skip('updates the page size and adjusts the page number accordingly', () => {
        render(
            <ShowPerPage
                setFilterSortPager={mockSetFilterSortPager}
                filterSortPager={mockFilterSortPager}
            />
        );

        // Simulate selecting a new page size from the dropdown
        fireEvent.change(screen.getByDisplayValue('10'), { target: { value: '20' } });

        // Verify that the setFilterSortPager function is called with the correct page size
        expect(mockSetFilterSortPager).toHaveBeenCalledWith(
            expect.objectContaining({
                pageSize: 20, // The page size should be updated to 20
                page: 1, // The page should stay at 1 since the page size was changed
            })
        );
    });

    it.skip('keeps the page number within bounds after changing the page size', () => {
        const mockFilterSortPagerLarge = { ...mockFilterSortPager, page: 3 };

        render(
            <ShowPerPage
                setFilterSortPager={mockSetFilterSortPager}
                filterSortPager={mockFilterSortPagerLarge}
            />
        );

        // Simulate selecting a new page size from the dropdown
        fireEvent.change(screen.getByDisplayValue('10'), { target: { value: '5' } });

        // Verify that the page number is adjusted to stay within bounds
        expect(mockSetFilterSortPager).toHaveBeenCalledWith(
            expect.objectContaining({
                page: 2, // It should change to page 2 (the final valid page)
                pageSize: 5, // The page size should be updated to 5
            })
        );
    });
});
