import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CURRENCY_INR,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_OPTION,
  DEFAULT_SORT_ORDER,
  LOCALE_EN_IN,
  type SortOption,
  type SortOrder,
  type VariantTypes,
} from "./constant";
import type { Item } from "@/services/myorders-service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat(LOCALE_EN_IN, {
  style: "currency",
  currency: CURRENCY_INR,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Maps various status strings to their corresponding UI variant.
 *
 * This map provides a quick lookup for transforming status names (e.g., from an API or database)
 * into specific UI variants that can be used to style components.
 * Add new status-variant mappings here as needed.
 */
export const statusToVariantMap: Record<string, VariantTypes> = {
  Created: "pending",
  "Deliverable Uploaded": "progress",
  "Completed Order": "success",
  // more status mapping
};

/**
 * Returns the UI variant associated with a given status.
 *
 * @param {string} status - The status string to lookup (e.g., "Created", "Deliverable Uploaded").
 * @returns {"default" | "success" | "progress" | "pending" | "destructive" | null | undefined} - The corresponding UI variant for the provided status.
 * If the status is not found in `statusToVariantMap`, returns "default" as a fallback.
 *
 * @example
 * const variant = getSpanVariant("Created"); // returns "pending"
 * const variant = getSpanVariant("Unknown Status"); // returns "default"
 */
export const getSpanVariant = (status: string) => {
  return statusToVariantMap[status] || "default";
};

// this is my order page deriveData shape
export interface FinalProduct {
  state: string;
  id: string;
  item: Item;
  created_at: string;
  dueDate: string;
  updated_at: string;
}

/**
 * Paginate an array of data, returning the items for a specified page.
 *
 * @template T - The type of items in the data array.
 * @param {T[]} data - The array of data items to paginate.
 * @param {number} page - The current page number, 1-based index.
 * @param {number} pageSize - The number of items per page.
 * @returns {T[]} - A new array containing the items for the specified page.
 *
 * @example
 * // Given an array of 12 items, display 5 items per page
 * const pageData = paginate(items, 2, 5);
 * // Returns the items for page 2, which are items at index 5 to 9.
 */
export const paginate = <T>(
  data: T[],
  page = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
) => {
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, data.length);
  return data.slice(start, end);
};

/**
 * Filters an array of `FinalProduct` objects based on specified criteria, including price range, category, subcategory, and search keyword.
 *
 * @param {FinalProduct[]} data - The array of product objects to be filtered.
 * @param {number} priceFrom - The minimum price for filtering.
 * @param {number} priceTo - The maximum price for filtering.
 * @param {string[]} category_id - Array of category IDs to match against each product's `category_id`.
 * @param {string[]} productSubcategory1 - Array of subcategory IDs to match against each product's `productSubcategory1`.
 * @param {number} total - The initial total count of products, used to adjust the final count.
 * @param {string} [search=""] - A keyword to filter products by name; matches are case-insensitive.
 * @returns {{ finalData: FinalProduct[], finalTotalCount: number }} - An object containing the filtered array of `FinalProduct` objects and the updated total count.
 *
 * @example
 * const result = filterData(products, 10, 100, ["electronics"], ["smartphones"], 50, "Galaxy");
 * console.log(result.finalData); // Filtered products
 * console.log(result.finalTotalCount); // Updated count of filtered products
 */
export const filterData = (
  data: FinalProduct[],
  _priceFrom: number,
  _priceTo: number,
  category_id: string[],
  productSubcategory1: string[],
  total: number,
  search = "",
) => {
  const finalData = data.filter((d) => {
    let hasFilterCatId = false;
    let hasFilterProductSubCat1 = false;
    let hasSearch = false;
    // if(d.price.value >= filters.price.from && d.price.value <= filters.price.to) filterPrice = true
    if (category_id.includes(d.item.category_id)) hasFilterCatId = true;
    if (Array.isArray(productSubcategory1) && typeof d.item.productSubcategory1 === 'string') {
      if (productSubcategory1.includes(d.item.productSubcategory1 ?? '')) {
        hasFilterProductSubCat1 = true;
      }
    }
    if (
      d.item.descriptor.name.toLowerCase().includes(search?.toLowerCase()) && search.trim().length !== 0
    )
      hasSearch = true;
    if (hasSearch) return hasSearch
    if (category_id.length === 0 && productSubcategory1.length === 0 && search.trim().length === 0) return true;
    return (hasFilterCatId || hasFilterProductSubCat1) && search.trim().length === 0;
  });

  // filter need to update the total
  const finalTotalCount = total !== finalData.length ? finalData.length : total;
  return { finalData, finalTotalCount };
};

/**
 * Sorts an array of `FinalProduct` objects based on the specified field and order.
 *
 * @param {FinalProduct[]} data - The array of product objects to be sorted.
 * @param {SortOption} [sort=DEFAULT_SORT_OPTION] - The field by which to sort the data.
 *   Options are:
 *   - `"Newest"`: Sort by creation date (`created_at`).
 *   - `"Due Date"`: Sort by due date (`dueDate`).
 *   - `"Last Update"`: Sort by last update date (`updated_at`).
 * @param {SortOrder} [order=DEFAULT_SORT_ORDER] - The sorting order, where 1 represents ascending and -1 represents descending.
 * @returns {FinalProduct[]} - The sorted array of `FinalProduct` objects.
 *
 * @example
 * const sortedData = sortData(products, "Last Update", -1);
 */
export const sortData = (
  data: FinalProduct[],
  sort: SortOption = DEFAULT_SORT_OPTION,
  order: SortOrder = DEFAULT_SORT_ORDER,
) => {
  return data.sort((a, b) => {
    let fieldA: Date
    let fieldB: Date;
    switch (sort) {
      case "Newest":
        fieldA = new Date(a.created_at);
        fieldB = new Date(b.created_at);
        break;
      case "Due Date":
        fieldA = new Date(a.dueDate);
        fieldB = new Date(b.dueDate);
        break;
      case "Last Update":
        fieldA = new Date(a.updated_at);
        fieldB = new Date(b.updated_at);
        break;
      default:
        // default neweset
        fieldA = new Date(a.created_at);
        fieldB = new Date(b.created_at);
    }
    return (fieldA > fieldB ? 1 : -1) * order;
  });
};

/**
 * Processes an array of `FinalProduct` objects by filtering, sorting, and paginating the data based on specified criteria.
 *
 * @param {FinalProduct[]} data - The array of product objects to be processed.
 * @param {number} total - The initial total count of products, used to adjust the final count after filtering.
 * @param {number} [page=1] - The current page number for pagination.
 * @param {number} [pageSize=DEFAULT_PAGE_SIZE] - The number of items per page for pagination.
 * @param {SortOption} [sort=DEFAULT_SORT_OPTION] - The field by which to sort the data, e.g., `"Newest"`, `"Due Date"`, or `"Last Update"`.
 * @param {SortOrder} [order=DEFAULT_SORT_ORDER] - The sorting order, where 1 represents ascending and -1 represents descending.
 * @param {number} priceFrom - The minimum price for filtering.
 * @param {number} priceTo - The maximum price for filtering.
 * @param {string[]} category_id - Array of category IDs to match against each product's `category_id`.
 * @param {string[]} productSubcategory1 - Array of subcategory IDs to match against each product's `productSubcategory1`.
 * @param {string} [search=""] - A keyword to filter products by name; matches are case-insensitive.
 * @returns {{ currentData: FinalProduct[], finalTotalCount: number }} - An object containing the processed array of `FinalProduct` objects and the final count after filtering.
 *
 * @example
 * const result = deriveData(products, 100, 1, 10, "Last Update", -1, 10, 100, ["electronics"], ["smartphones"], "Galaxy");
 * console.log(result.currentData); // Processed products for the current page
 * console.log(result.finalTotalCount); // Updated count of filtered products
 */
export const deriveData = (
  data: FinalProduct[],
  total: number,
  page = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
  sort: SortOption = DEFAULT_SORT_OPTION,
  order: SortOrder = DEFAULT_SORT_ORDER,
  priceFrom?: number,
  priceTo?: number,
  category_id?: string[],
  productSubcategory1?: string[],
  search = "",
) => {
  let currentData = data;

  // filter
  const { finalData, finalTotalCount } = filterData(
    currentData,
    priceFrom ?? 0,
    priceTo ?? 0,
    category_id ?? [],
    productSubcategory1 ?? [],
    total,
    search,
  );
  currentData = finalData;
  // sort
  currentData = sortData(currentData, sort, order);

  // pager
  currentData = paginate(currentData, page, pageSize);
  return { currentData, finalTotalCount };
};