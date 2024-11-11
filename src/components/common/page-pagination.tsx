import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Pagination, PaginationLink } from "../ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PagePagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const createPageArray = (): (number | string)[] => {
        let pages: (number | string)[] = [];

        if (totalPages <= 3) {
            // Show all pages if there are 3 or fewer total
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 2) {
                // If on page 1 or 2, show the first three pages
                pages = [1, 2, 3, '...', totalPages];
            } else if (currentPage >= totalPages - 1) {
                // If on the last or second-to-last page, show the last three pages
                pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else {
                // Show the current page, one page before, and one page after
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages;
    };

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <Pagination >
            <Button data-testid="pagination-previous" variant="ghost" onClick={handlePrevious} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            {createPageArray().map((page) => (
                <PaginationLink data-testid={`pagination-${page}`} key={page} onClick={() => typeof page === 'number' && onPageChange(page)} isActive={page === currentPage}
                    type="button"
                >
                    {page}
                </PaginationLink>
            ))}
            <Button data-testid="pagination-next" variant="ghost" onClick={handleNext} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </Pagination>
    );
};

export default PagePagination;
