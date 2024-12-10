import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyOrdersList from "../my-orders-list";
import { BrowserRouter } from "react-router-dom";
import type { FinalProduct } from "../../../../lib/utils";

const mockOrders: FinalProduct[] = [
    {
        "created_at": "2024-12-10T05:17:50.118Z",
        "dueDate": "2024-11-09T02:51:23.997Z",
        "id": "order-$2a$10$35//AU.L9dgjGbGUrf.Ti.dztFIjYR/d5qQ/P8ab7RKeGu1Y2mUVm",
        "item":
        {
            "category_id": "OSS Project",
            "description": "desc",
            "descriptor": {
                "name": "Test-Ml-Model"
            },
            "longDescription": "long-desc",
            "price": {
                "currency": "INR",
                "value": "11000"
            },
            "productSubcategory1": "TAVOSS Version & Certification Service",
            "quantity": {
                count: 1,
                measure: {
                    unit: "Unit-count",
                    value: 1
                }
            },
            "state": "Created",
            "updated_at": "2024-12-10T05:17:50.118Z"
        },
        state: "",
        updated_at: ""
    },
    {
        "created_at": "2024-12-10T05:17:50.118Z",
        "dueDate": "2024-11-09T02:51:23.997Z",
        "id": "order-$2a$10$35//AU.L9dgjGbGUrf.Ti.dztFIjYR/d5qQ/P8ab7RKeGu1Y2mUVo",
        item:
        {
            "category_id": "OSS Project",
            "description": "desc",
            "descriptor": {
                "name": "RomRaider"
            },
            "longDescription": "long-desc",
            "price": {
                "currency": "INR",
                "value": "11000"
            },
            "productSubcategory1": "TAVOSS Version & Certification Service",
            "quantity": {
                count: 1,
                measure: {
                    unit: "Unit-count",
                    value: 1
                }
            },
            "state": "Created",
            "updated_at": "2024-12-10T05:17:50.118Z"
        },
        state: "",
        updated_at: ""
    }
];
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

        expect(screen.getByText("Test-Ml-Model")).toBeInTheDocument();
        expect(screen.getByText("RomRaider")).toBeInTheDocument();
    });

    // it('should render "No orders found" when orders array is empty', () => {
    //     render(<MyOrdersList orders={[]} showFilter={false} showGrid={false} />);

    //     expect(screen.getByText("No orders found")).toBeInTheDocument();
    // });
});
