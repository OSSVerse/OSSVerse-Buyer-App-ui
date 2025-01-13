import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, vi } from "vitest";
import { usePlaceOrderQuote } from "../placeorder-quote-service";
import { httpService } from "../http-service";
import { api } from "../apis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../http-service");

describe("usePlaceOrderQuote", () => {
  const mockProvider = { id: "provider-1" };
  const mockItems = [{ id: "item-1" }];
  const mockFulfillment: unknown = {};

  const mockContext = {
    domain: "Software Assurance",
    location: {
      city: {
        name: "Bangalore",
        code: "std:080",
      },
      country: {
        name: "India",
        code: "IND",
      },
    },
    action: "confirm",
    version: "1.1.0",
    transaction_id: "ead489b8-81de-49a4-baf6-8d8de7eabf32",
    message_id: "1d07c819-695c-44ab-bd47-c21678a6ba4e",
    timestamp: new Date("2023-10-09T04:46:28.012Z"),
    bap_id: "bap.ossverse.com",
    bap_uri: "http://bap.ossverse.com",
    bpp_id: "openfort-oasp.ossverse.com",
    bpp_uri: "http://openfort-oasp.ossverse.com",
    country: 'India',
    city: 'bengaluru',
    ttl: 'TM10'
  }

  const queryClient = new QueryClient();

  it("should call getPlaceOrderQuote with correct parameters", async () => {
    const mockResponse = [{ context: {}, message: {} }];
    (httpService.post as vi.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitForNextUpdate } = renderHook(
      () => usePlaceOrderQuote(),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate({
        provider: mockProvider,
        items: mockItems,
        fulfillment: mockFulfillment,
        context: mockContext
      });
    });

    await waitForNextUpdate();

    expect(httpService.post).toHaveBeenCalledWith(
      api.placeorder.select,
      expect.objectContaining({
        selectRequestDto: expect.any(Array),
      }),
    );
    expect(result.current.data).toEqual(mockResponse);
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Failed to fetch quote");
    (httpService.post as vi.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(
      () => usePlaceOrderQuote(),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate({
        provider: mockProvider,
        items: mockItems,
        fulfillment: mockFulfillment,
        context: mockContext
      });
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual(mockError);
  });
});
