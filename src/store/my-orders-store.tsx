import { create } from "zustand";

export interface Filters {
  search?: string;
  sort?: string;
  order?: number;
  page?: number;
  limit?: number;
}

interface State {
  filters: Filters;
}

interface Action {
  setFilters: (newFilter: Filters) => void;
}

export const useMyOrdersStore = create<State & Action>((set) => ({
  filters: {
    sort: "Due Date",
    order: -1,
    page: 1,
    limit: 10,
  },
  setFilters: (newFilters: Filters) =>
    set((state) => {
      const { sort, order } = state.filters;
      const newSort = newFilters.sort;
      if (newSort === sort) {
        const newOrder = order === 1 ? 0 : order === -1 ? 1 : -1;
        return {
          filters: {
            ...state.filters,
            order: newOrder,
          },
        };
      }
      return {
        filters: {
          ...state.filters,
          ...newFilters,
          order: -1,
        },
      };
    }),
}));
