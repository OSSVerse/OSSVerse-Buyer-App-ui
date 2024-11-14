import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi } from "vitest";
import { useMyOrders } from "../myorders-service"; // Adjust the import path accordingly
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "../apis";
import { httpService } from "../http-service";

// Mock the httpService
vi.mock("../http-service", () => ({
    httpService: {
        get: vi.fn(),
    },
}));

describe("useMyOrders hook", () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it("should return orders data on successful fetch", async () => {
        const mockData = {
            orders: [
                {
                    id: "order1",
                    userId: "1235",
                    parentOrderId: "parent1",
                    orders: [],
                },
            ],
        };

        // Mock the API response
        (httpService.get as any).mockResolvedValueOnce({ data: mockData });

        const { result, waitFor } = renderHook(() => useMyOrders(), { wrapper });

        // Wait for the hook to finish loading
        await waitFor(() => result.current.isSuccess);

        // expect(result.current.data).toBeInstanceOf(Array);
        expect(httpService.get).toHaveBeenCalledWith(`${api.myorders.get}?userId=1235`);
    });


});
