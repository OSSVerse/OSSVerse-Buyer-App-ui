import type { PageSize, SortOption, SortOrder } from "@/lib/constant";

export interface sortItem {
    createdAt: string;
    dueDate: string;
    updateAt: string;
}

export interface IInitialSearchFilterPagination {
    page: number;
    pageSize: PageSize;
    search: string;
    sort: SortOption;
    order: SortOrder;
}

// TODO: this should be cal from response data
export type CategoryId = string;
// export type ProductSubcategory1 = 'TAVOSS Version & Certification Service' | 'Assurance & Assessment Service'

export interface IInitialFilter {
    price: {
        from: number;
        to: number;
    };
    category_id: CategoryId[];
    productSubcategory1: string[];
    provider?: string[];
}

export interface IFilterSortPager
    extends IInitialFilter,
    IInitialSearchFilterPagination {
    total: number;
}

// interface State {
//   pages: {
//     [key: string]: PageState;
//   };
// }

// interface Action {
//   setPage: (pageName: string, category: string, data: any) => void;
//   setSortOrder: (
//     pageName: string,
//     category: string,
//     newSort: SortOption,
//   ) => void;
//   setPager: (
//     pageName: string,
//     category: string,
//     newPage: number,
//     newPageSize: PageSize,
//   ) => void;
//   setTotal: (pageName: string, category: string, total: number) => void;
// }

// const initialSearchFilterPagination: IInitialSearchFilterPagination = {
//   page: 1,
//   pageSize: 5,
//   search: "",
//   sort: "Newest",
//   order: SortOrder.Ascending,
// };

// export const initialFilters: IInitialFilter = {
//   price: {
//     from: 0,
//     to: 10000,
//   },
//   category_id: ["ML Model", "OSS Project"],
//   productSubcategory1: [
//     "TAVOSS Version & Certification Service",
//     "Assurance & Assessment Service",
//   ],
// };

// export const useDataStore = create<State & Action>((set) => ({
//   pages: {
//     [ROUTE_PATH.MYORDERS]: {
//       categories: {
//         All: { total: 0, ...initialSearchFilterPagination, ...initialFilters },
//         Created: {
//           total: 0,
//           ...initialSearchFilterPagination,
//           ...initialFilters,
//         },
//         "Deliverable Uploaded": {
//           total: 0,
//           ...initialSearchFilterPagination,
//           ...initialFilters,
//         },
//         "Completed Order": {
//           total: 0,
//           ...initialSearchFilterPagination,
//           ...initialFilters,
//         },
//       },
//     },
//   },

//   setTotal: (pageName, category, total) =>
//     set((state) => ({
//       pages: {
//         ...state.pages,
//         [pageName]: {
//           ...state.pages[pageName],
//           categories: {
//             ...state.pages[pageName].categories,
//             [category]: {
//               ...state.pages[pageName].categories[category],
//               total,
//             },
//           },
//         },
//       },
//     })),

//   setPage: (pageName, category, data) =>
//     set((state) => ({
//       pages: {
//         ...state.pages,
//         [pageName]: {
//           ...state.pages[pageName],
//           categories: {
//             ...state.pages[pageName].categories,
//             [category]: {
//               ...state.pages[pageName].categories[category],
//               ...data,
//             },
//           },
//         },
//       },
//     })),
//   setPager: (pageName, category, newPage, newPageSize) =>
//     set((state) => {
//       const { total } = state.pages[pageName].categories[category];
//       /**
//        * predefind: data= [1,2,3,4,5,6,7]
//        * Edge caseA:
//        * init:   page=3 pageSize=3 showData = 1,2,3   | 4,5,6 | 7  pagers = 3
//        * action: page=3 newPageSize=4 showData = 1,2,3,4 | 5,6,7   pagers = 2
//        * expected: finalPage should change to 2
//        *
//        * Edge caseB:
//        * init:   page=2 pageSize=4 showData = 1,2,3,4 | 5,6,7        pagers = 2
//        * action: page=2 newPageSize=3 showData = 1,2,3   | 4,5,6 | 7 pagers = 3
//        * expected: finalPage should stay at 2
//        *
//        * So we need to check
//        */
//       const pagers = Math.ceil(total / newPageSize);
//       const finalPage = Math.min(newPage, pagers);

//       return {
//         pages: {
//           ...state.pages,
//           [pageName]: {
//             ...state.pages[pageName],
//             categories: {
//               ...state.pages[pageName].categories,
//               [category]: {
//                 ...state.pages[pageName].categories[category],
//                 page: finalPage,
//                 pageSize: newPageSize,
//               },
//             },
//           },
//         },
//       };
//     }),
//   setSortOrder: (pageName: string, category: string, newSort: SortOption) =>
//     set((state) => {
//       const { sort, order } = state.pages[pageName].categories[category];

//       /**
//        * Edge CaseA:
//        * init: current sort = "Newest", current order = -1
//        *
//        * action: newOrder = 1
//        *
//        * expected: sort = "Newest", order = 1
//        *
//        * Edge CaseB:
//        * init: current sort = "Newest", current order = -1
//        *
//        * action: newOrder = 1
//        * result: sort = "Newest", order = 1
//        * action: newSort = "Due Date"
//        *
//        * expected: sort = "Due Date", order = -1
//        * New Sort always reset the order to decending
//        */
//       const isSameSort = newSort === sort;
//       const finalOrder = isSameSort
//         ? order === SortOrder.Ascending
//           ? SortOrder.Descending
//           : SortOrder.Ascending
//         : SortOrder.Descending;

//       return {
//         pages: {
//           ...state.pages,
//           [pageName]: {
//             ...state.pages[pageName],
//             categories: {
//               ...state.pages[pageName].categories,
//               [category]: {
//                 ...state.pages[pageName].categories[category],
//                 order: finalOrder ? finalOrder : SortOrder.Descending,
//                 sort: newSort,
//               },
//             },
//           },
//         },
//       };
//     }),
// }));