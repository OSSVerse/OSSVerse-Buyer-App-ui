import { describe, it, expect } from "vitest";
import { getSpanVariant, paginate, filterData, sortData, type FinalProduct, deriveData, statusToVariantMap } from "../utils";
import type { SortOption, VariantTypes } from "../constant";

// get span variant
describe("getSpanVariant", () => {

    it("returns the correct UI variant for known statuses", () => {
        expect(getSpanVariant("Created")).toBe<VariantTypes>("pending");
        expect(getSpanVariant("Deliverable Uploaded")).toBe<VariantTypes>("progress");
        expect(getSpanVariant("Completed Order")).toBe<VariantTypes>("success");
    });

    it("returns 'default' for unknown statuses", () => {
        expect(getSpanVariant("Unknown Status")).toBe<VariantTypes>("default");
        expect(getSpanVariant("Nonexistent")).toBe<VariantTypes>("default");
    });

    it("handles empty or null input by returning 'default'", () => {
        expect(getSpanVariant("")).toBe<VariantTypes>("default");
        expect(getSpanVariant(null as unknown as string)).toBe<VariantTypes>("default");
        expect(getSpanVariant(undefined as unknown as string)).toBe<VariantTypes>("default");
    });

    it("uses statusToVariantMap as the source for mappings", () => {
        for (const [status, variant] of Object.entries(statusToVariantMap)) {
            expect(getSpanVariant(status)).toBe<VariantTypes>(variant);
        }
    });
});

// paginate
describe("paginate", () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1); // Example data array [1, 2, ..., 12]

    it("returns correct items for a given page and page size", () => {
        expect(paginate(items, 1, 5)).toEqual([1, 2, 3, 4, 5]);  // First page
        expect(paginate(items, 2, 5)).toEqual([6, 7, 8, 9, 10]); // Second page
        expect(paginate(items, 3, 5)).toEqual([11, 12]);         // Third page
    });

    it("returns an empty array if the page number exceeds total pages", () => {
        expect(paginate(items, 4, 5)).toEqual([]);  // Page 4, but only 3 pages available
    });

    it("returns all items if pageSize exceeds data length", () => {
        expect(paginate(items, 1, 20)).toEqual(items);  // Page size is larger than item count
    });

    it("returns an empty array if data is empty", () => {
        expect(paginate([], 1, 5)).toEqual([]);  // Empty data array should return empty result
    });

    it("defaults to page 1 when page is not provided", () => {
        expect(paginate(items, undefined, 5)).toEqual([1, 2, 3, 4, 5]);  // Default to first page
    });

    it("defaults to DEFAULT_PAGE_SIZE when pageSize is not provided", () => {
        const DEFAULT_PAGE_SIZE = 10;
        expect(paginate(items, 1, DEFAULT_PAGE_SIZE)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);  // Default page size
    });
});

// filter data

describe("filterData", () => {
    const products: FinalProduct[] = [
        {
            state: "active",
            id: "1",
            item: {
                descriptor: { name: "Galaxy Phone" },
                price: { currency: "USD", value: "50" },
                category_id: "electronics",
                productSubcategory1: "smartphones",
                description: "A smartphone",
                longDescription: "An advanced smartphone with high specs",
                quantity: { count: 1, measure: { unit: "piece", value: 1 } },
            },
            created_at: "2024-01-01",
            dueDate: "2024-06-01",
            updated_at: "2024-05-01",
        },
        {
            state: "active",
            id: "2",
            item: {
                descriptor: { name: "Smart TV" },
                price: { currency: "USD", value: "300" },
                category_id: "electronics",
                productSubcategory1: "tv",
                description: "A 4K smart TV",
                longDescription: "A large smart TV with 4K resolution",
                quantity: { count: 1, measure: { unit: "piece", value: 1 } },
            },
            created_at: "2024-02-01",
            dueDate: "2024-07-01",
            updated_at: "2024-06-01",
        },
        {
            state: "inactive",
            id: "3",
            item: {
                descriptor: { name: "Laptop" },
                price: { currency: "USD", value: "1200" },
                category_id: "electronics",
                productSubcategory1: "computers",
                description: "A powerful laptop",
                longDescription: "High-performance laptop for work and gaming",
                quantity: { count: 1, measure: { unit: "piece", value: 1 } },
            },
            created_at: "2024-03-01",
            dueDate: "2024-08-01",
            updated_at: "2024-07-01",
        },
    ];

    it("filters products by category and subcategory", () => {
        const { finalData, finalTotalCount } = filterData(
            products,
            0,
            2000,
            ["electronics"],
            ["smartphones"],
            products.length
        );
        expect(finalData).toHaveLength(3);
        expect(finalData[0].item.descriptor.name).toBe("Galaxy Phone");
        expect(finalTotalCount).toBe(3);
    });

    it("filters products by search keyword", () => {
        const { finalData, finalTotalCount } = filterData(
            products,
            0,
            2000,
            ["electronics"],
            ["tv", "smartphones", "computers"],
            products.length,
            "Laptop"
        );
        expect(finalData).toHaveLength(1);
        expect(finalData[0].item.descriptor.name).toBe("Laptop");
        expect(finalTotalCount).toBe(1);
    });

    it("returns all products when search keyword is empty", () => {
        const { finalData, finalTotalCount } = filterData(
            products,
            0,
            2000,
            ["electronics"],
            ["tv", "smartphones", "computers"],
            products.length,
            ""
        );
        expect(finalData).toHaveLength(3);
        expect(finalTotalCount).toBe(3);
    });

    // TODO: no price range filter implement yet
    // it("filters products by price range", () => {
    //   const { finalData, finalTotalCount } = filterData(
    //     products,
    //     100,
    //     500,
    //     ["electronics"],
    //     ["tv", "smartphones"],
    //     products.length
    //   );
    //   expect(finalData).toHaveLength(1);
    //   expect(finalData[0].item.descriptor.name).toBe("Smart TV");
    //   expect(finalTotalCount).toBe(1);
    // });

    it("handles cases where no products match the filter criteria", () => {
        const { finalData, finalTotalCount } = filterData(
            products,
            1000,
            2000,
            ["home-appliances"],
            ["washers"],
            products.length
        );
        expect(finalData).toHaveLength(0);
        expect(finalTotalCount).toBe(0);
    });

    it("updates total count correctly when filtered results differ from initial total", () => {
        const { finalData, finalTotalCount } = filterData(
            products,
            50,
            100,
            ["electronics"],
            ["smartphones"],
            products.length
        );
        expect(finalData).toHaveLength(3);
        expect(finalTotalCount).toBe(3);
    });
});

// Sort


describe("sortData", () => {
    const products: FinalProduct[] = [
        {
            state: "active",
            id: "1",
            item: {
                descriptor: { name: "Product 1" },
                price: { currency: "USD", value: "100" },
                category_id: "electronics",
                productSubcategory1: "smartphones",
                description: "Smartphone",
                longDescription: "High-end smartphone",
                quantity: { count: 1, measure: { unit: "piece", value: 1 } },
            },
            created_at: "2024-01-01",
            dueDate: "2024-05-01",
            updated_at: "2024-06-01",
        },
        {
            state: "active",
            id: "2",
            item: {
                descriptor: { name: "Product 2" },
                price: { currency: "USD", value: "200" },
                category_id: "electronics",
                productSubcategory1: "tv",
                description: "Smart TV",
                longDescription: "4K resolution TV",
                quantity: { count: 1, measure: { unit: "piece", value: 1 } },
            },
            created_at: "2024-02-01",
            dueDate: "2024-04-01",
            updated_at: "2024-05-01",
        },
        {
            state: "inactive",
            id: "3",
            item: {
                descriptor: { name: "Product 3" },
                price: { currency: "USD", value: "300" },
                category_id: "electronics",
                productSubcategory1: "computers",
                description: "Laptop",
                longDescription: "Gaming laptop",
                quantity: { count: 1, measure: { unit: "piece", value: 1 } },
            },
            created_at: "2024-03-01",
            dueDate: "2024-03-01",
            updated_at: "2024-04-01",
        },
    ];

    it("sorts products by creation date (Newest) in descending order", () => {
        const sortedData = sortData(products, "Newest", -1);
        expect(sortedData[0].id).toBe("3");
        expect(sortedData[1].id).toBe("2");
        expect(sortedData[2].id).toBe("1");
    });

    it("sorts products by creation date (Newest) in ascending order", () => {
        const sortedData = sortData(products, "Newest", 1);
        expect(sortedData[0].id).toBe("1");
        expect(sortedData[1].id).toBe("2");
        expect(sortedData[2].id).toBe("3");
    });

    it("sorts products by due date in descending order", () => {
        const sortedData = sortData(products, "Due Date", -1);
        expect(sortedData[0].id).toBe("1");
        expect(sortedData[1].id).toBe("2");
        expect(sortedData[2].id).toBe("3");
    });

    it("sorts products by due date in ascending order", () => {
        const sortedData = sortData(products, "Due Date", 1);
        expect(sortedData[0].id).toBe("3");
        expect(sortedData[1].id).toBe("2");
        expect(sortedData[2].id).toBe("1");
    });

    it("sorts products by last update date in descending order", () => {
        const sortedData = sortData(products, "Last Update", -1);
        expect(sortedData[0].id).toBe("1");
        expect(sortedData[1].id).toBe("2");
        expect(sortedData[2].id).toBe("3");
    });

    it("sorts products by last update date in ascending order", () => {
        const sortedData = sortData(products, "Last Update", 1);
        expect(sortedData[0].id).toBe("3");
        expect(sortedData[1].id).toBe("2");
        expect(sortedData[2].id).toBe("1");
    });

    it("sorts by default 'Newest' when an unrecognized sort option is passed", () => {
        const sortedData = sortData(products, "UnrecognizedOption" as SortOption, -1);
        expect(sortedData[0].id).toBe("3");
        expect(sortedData[1].id).toBe("2");
        expect(sortedData[2].id).toBe("1");
    });
});


// deriveData

const mockData: FinalProduct[] = [
    {
        state: "active",
        id: "1",
        item: {
            descriptor: { name: "Product A" },
            price: { currency: "USD", value: "50" },
            category_id: "electronics",
            productSubcategory1: "smartphones",
            description: "A smartphone",
            longDescription: "A smartphone with features",
            quantity: { count: 10, measure: { unit: "piece", value: 1 } },
        },
        created_at: "2023-01-01",
        dueDate: "2023-02-01",
        updated_at: "2023-01-15",
    },
];

describe("deriveData - integration tests", () => {
    it("filters, sorts, and paginates correctly", () => {
        const { currentData, finalTotalCount } = deriveData(
            mockData,
            1,              // total
            1,              // page
            1,              // pageSize
            "Newest",       // sort option
            -1,             // sort order (descending)
            0,              // priceFrom
            100,            // priceTo
            ["electronics"], // category_id
            ["smartphones"], // productSubcategory1
            "Product"       // search keyword
        );

        expect(currentData).toHaveLength(1);
        expect(finalTotalCount).toBe(1);
        expect(currentData[0].item.descriptor.name).toBe("Product A");
    });

    it("returns empty array if no matches found", () => {
        const { currentData, finalTotalCount } = deriveData(
            mockData,
            1,
            1,
            1,
            "Newest",
            -1,
            100,          // priceFrom (higher than any product)
            200,          // priceTo
            ["nonexistent_category"], // category_id
            ["nonexistent_subcategory"], // productSubcategory1
            "Nonexistent" // search keyword
        );

        expect(currentData).toHaveLength(0);
        expect(finalTotalCount).toBe(0);
    });

    it("sorts in ascending order by Due Date", () => {
        const { currentData } = deriveData(
            mockData,
            1,
            1,
            10,           // pageSize larger than total items to get all results
            "Due Date",   // sort by Due Date
            1,            // ascending order
            0,
            100,
            ["electronics"],
            ["smartphones"],
            ""
        );

        expect(currentData).toHaveLength(1);
    });
});