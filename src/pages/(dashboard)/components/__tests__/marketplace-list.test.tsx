import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MarketplaceList from '../marketplace-list';
import type { Item } from '@/services/marketplace-service';
import { describe, it, expect } from 'vitest';

const mockProducts: Item[] = [
    { id: '1', description: 'Description 1', price: { currency: 'INR', value: '100', maximum_value: '100' }, category_id: '1', sub_category_id: '1', code: '1', descriptor: { name: 'Product 1', images: [] }, longDescription: 'Long Description 1', totalPrice: 100, type: 'Product' },
    { id: '2', description: 'Description 2', price: { currency: 'INR', value: '200', maximum_value: '200' }, category_id: '1', sub_category_id: '1', code: '1', descriptor: { name: 'Product 2', images: [] }, longDescription: 'Long Description 2', totalPrice: 200, type: 'Product' },
];

describe('MarketplaceList', () => {
    it('should render the marketplace list with filters', () => {
        render(
            <BrowserRouter>
                <MarketplaceList showFilter={true} products={mockProducts} />
            </BrowserRouter>
        );

        const itemList = screen.getByTestId('product-list');
        expect(screen.getByText('Filter')).toBeInTheDocument();
        expect(itemList.childNodes.length).toBe(mockProducts.length);



    });

    it('should render the marketplace list without filters', () => {
        render(
            <BrowserRouter>
                <MarketplaceList showFilter={false} products={mockProducts} />
            </BrowserRouter>
        );

        expect(screen.queryByTestId('filter-container')).not.toBeInTheDocument();
    });

    // it('should reset filters when reset button is clicked', () => {
    //     render(
    //         <BrowserRouter>
    //             <MarketplaceList showFilter={true} products={mockProducts} />
    //         </BrowserRouter>
    //     );
    //     userEvent.click(screen.getByText('Reset'));

    //     screen.debug(screen.getByText('OSAP', { selector: 'button' })?.parentElement?.parentElement);

    //     //open OSSAP filter
    //     userEvent.click(screen.getByText('OSAP', { selector: 'button' })?.parentElement?.parentElement);
    //     // //open Service Offered filter
    //     // userEvent.click(screen.getByText('Service Offered', { selector: 'button' })?.parentElement);
    //     // //open TAVOSS Version filter
    //     // userEvent.click(screen.getByText('TAVOSS Version', { selector: 'button' })?.parentElement);
    //     screen.debug(screen.getByText('OSAP', { selector: 'button' }));




    //     expect(screen.getByRole('checkbox', { name: 'All OSAP' })).toBeChecked();
    //     expect(screen.getByRole('checkbox', { name: 'All Service Offered' })).toBeChecked();
    //     expect(screen.getByRole('checkbox', { name: 'All TAVOSS Version' })).toBeChecked();
    // });

    // it('should apply filters correctly', () => {
    //     render(
    //         <BrowserRouter>
    //             <MarketplaceList showFilter={true} products={mockProducts} />
    //         </BrowserRouter>
    //     );

    //     fireEvent.click(screen.getByText('OSAP Acme A'));
    //     expect(screen.getByText('OSAP')).toBeInTheDocument();
    //     expect(screen.getByText('OSAP Acme A')).toBeInTheDocument();
    // });

    // it('should render products correctly', () => {
    //     render(
    //         <BrowserRouter>
    //             <MarketplaceList showFilter={false} products={mockProducts} />
    //         </BrowserRouter>
    //     );

    //     expect(screen.getByText('Product 1')).toBeInTheDocument();
    //     expect(screen.getByText('Product 2')).toBeInTheDocument();
    // });

    // it('should render pagination correctly', () => {
    //     render(
    //         <BrowserRouter>
    //             <MarketplaceList showFilter={false} products={mockProducts} />
    //         </BrowserRouter>
    //     );

    //     expect(screen.getByText('Showing 1-20 of 100')).toBeInTheDocument();
    //     expect(screen.getByText('10 per page')).toBeInTheDocument();
    //     expect(screen.getByText('1')).toBeInTheDocument();
    //     expect(screen.getByText('2')).toBeInTheDocument();
    //     expect(screen.getByText('3')).toBeInTheDocument();
    // });
});
