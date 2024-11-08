import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../page-pagination';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Pagination', () => {
    const onPageChange = vi.fn();

    afterEach(() => {
        onPageChange.mockClear();
    });

    it('renders the correct page numbers when on page 1', () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

        // Expect buttons for pages 1, 2, 3, "..." and 5
        expect(screen.getByTestId('pagination-1')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-2')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-3')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-...')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-5')).toBeInTheDocument();
    });

    it('renders the correct page numbers when on a middle page', () => {
        render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

        // Expect buttons for pages 1, "...", 2, 3, 4, "..." and 5
        expect(screen.getByTestId('pagination-1')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-2')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-3')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-4')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-5')).toBeInTheDocument();
    });

    it('disables "Previous" button on the first page', () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
        expect(screen.getByTestId('pagination-previous')).toBeDisabled();
    });

    it('disables "Next" button on the last page', () => {
        render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
        expect(screen.getByTestId('pagination-next')).toBeDisabled();
    });

    it('calls onPageChange with the correct page number when a page button is clicked', () => {
        render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

        // Click on page 4
        fireEvent.click(screen.getByTestId('pagination-4'));
        expect(onPageChange).toHaveBeenCalledWith(4);

        // Click on page 1
        fireEvent.click(screen.getByTestId('pagination-1'));
        expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('calls onPageChange with the correct page number when "Next" and "Previous" are clicked', () => {
        render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

        // Click "Next" button
        fireEvent.click(screen.getByTestId('pagination-next'));
        expect(onPageChange).toHaveBeenCalledWith(4);

        // Click "Previous" button
        fireEvent.click(screen.getByTestId('pagination-previous'));
        expect(onPageChange).toHaveBeenCalledWith(2);
    });
});
