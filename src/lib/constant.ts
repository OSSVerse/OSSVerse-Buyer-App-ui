import type { CategoryId, IFilterSortPager } from "@/store/data-store";

export const AUTH_STORAGE_KEY = "OSS_AUTH_USER";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PRODUCT_TYPE = {
  "ml-models": "ML Model",
  projects: "OSS Project",
};

export const LOCALE_EN_IN = "en-IN";
export const CURRENCY_INR = "INR";

// filter, sort, order, pagination
export type SortOption = "Newest" | "Due Date" | "Last Update";
export enum SortOrder {
  Ascending = 1,
  Descending = -1,
}

export type VariantTypes =
  | "default"
  | "success"
  | "progress"
  | "pending"
  | "destructive"
  | null
  | undefined;

export const pageSizes = [5, 10, 15] as const;
export type PageSize = (typeof pageSizes)[number];

export const SORT_MENUS: SortOption[] = ["Newest", "Due Date", "Last Update"];
export const DEFAULT_CATEGORY_IDS: CategoryId[] = [];
export const DEFAULT_PRODUCT_SUB_CATEOGRY_1: string[] = [];
export const DEFAULT_PROVIDER: string[] = ["Openfort"];
// export type ProductSubcategory1 = typeof DEFAULT_PRODUCT_SUB_CATEOGRY_1[number]

export const DEFAULT_PAGE_SIZE: PageSize = 5;

export const DEFAULT_SORT_OPTION: SortOption = "Newest";
export const DEFAULT_SORT_ORDER: SortOrder = SortOrder.Descending;

export type FilterKey = "category_id" | "productSubcategory1";

export const DEFAULT_FILTER_SORT_PAGER: IFilterSortPager = {
  order: DEFAULT_SORT_ORDER,
  sort: DEFAULT_SORT_OPTION,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 0,
  search: "",
  price: {
    from: 0,
    to: 10000,
  },
  category_id: DEFAULT_CATEGORY_IDS,
  productSubcategory1: DEFAULT_PRODUCT_SUB_CATEOGRY_1,
};

export const DEFAULT_FILTER_SORT_PAGER_MARKETPLACE: IFilterSortPager = {
  order: DEFAULT_SORT_ORDER,
  sort: DEFAULT_SORT_OPTION,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 0,
  search: "",
  price: {
    from: 0,
    to: 10000,
  },
  category_id: DEFAULT_CATEGORY_IDS,
  productSubcategory1: DEFAULT_PRODUCT_SUB_CATEOGRY_1,
  provider: DEFAULT_PROVIDER,
};
