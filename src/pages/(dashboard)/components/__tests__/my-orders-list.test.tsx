import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyOrdersList from "../my-orders-list";
import { BrowserRouter } from "react-router-dom";
import type { FinalProduct } from "@/lib/utils";

const mockOrders: FinalProduct[] = [
    {
        state: "available",
        id: "prod12345",
        item: {
            descriptor: { name: "Premium Coffee Beans" },
            price: { currency: "USD", value: "12.99" },
            category_id: "beverages",
            productSubcategory1: "coffee",
            description: "High-quality, freshly roasted coffee beans.",
            longDescription: "These coffee beans are sourced from the finest farms and freshly roasted to deliver a rich, aromatic flavor.",
            quantity: {
                count: 100,
                measure: { unit: "grams", value: 500 }
            }
        },
        created_at: "2024-11-10T08:30:00Z",
        dueDate: "2024-12-15T00:00:00Z",
        updated_at: "2024-11-11T10:00:00Z"
    },
    {
        state: "out_of_stock",
        id: "prod67890",
        item: {
            descriptor: { name: "Organic Green Tea" },
            price: { currency: "USD", value: "8.49" },
            category_id: "beverages",
            productSubcategory1: "tea",
            description: "Organic green tea leaves with a fresh, earthy flavor.",
            longDescription: "Hand-picked and minimally processed to retain antioxidants and nutrients.",
            quantity: {
                count: 0,
                measure: { unit: "grams", value: 250 }
            }
        },
        created_at: "2024-10-05T10:45:00Z",
        dueDate: "2024-11-20T00:00:00Z",
        updated_at: "2024-11-01T14:30:00Z"
    },
    {
        state: "discontinued",
        id: "prod54321",
        item: {
            descriptor: { name: "Espresso Maker" },
            price: { currency: "USD", value: "99.99" },
            category_id: "appliances",
            productSubcategory1: "coffee_machines",
            description: "Compact espresso maker for coffee enthusiasts.",
            longDescription: "A convenient, portable espresso machine that delivers barista-quality espresso at home.",
            quantity: {
                count: 10,
                measure: { unit: "pieces", value: 1 }
            }
        },
        created_at: "2024-08-15T07:20:00Z",
        dueDate: "2024-10-01T00:00:00Z",
        updated_at: "2024-09-20T15:00:00Z"
    }
];;
describe("MyOrdersList", () => {
    it("should render the orders list", () => {
        render(
            <BrowserRouter>
                <MyOrdersList
                    orders={mockOrders}
                    setFilterSortPager={() => {
                        return { category_id: [], productSubcategory1: [], price: 0 };
                    }}
                    filterSortPager={{
                        category_id: [],
                        productSubcategory1: [],
                        price: 0,
                        total: 0,
                        page: 1,
                        pageSize: 10,
                        sort: "Last Update",
                        order: -1,
                    }}
                    showFilter={false}
                    showGrid={false}
                />
            </BrowserRouter>,
        );

        expect(screen.getByText("Premium Coffee Beans")).toBeInTheDocument();
        expect(screen.getByText("Organic Green Tea")).toBeInTheDocument();
    });

    // it('should render "No orders found" when orders array is empty', () => {
    //     render(<MyOrdersList orders={[]} showFilter={false} showGrid={false} />);

    //     expect(screen.getByText("No orders found")).toBeInTheDocument();
    // });
});
