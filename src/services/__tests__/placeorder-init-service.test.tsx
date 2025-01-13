import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, vi } from "vitest";
import { usePlaceOrderInit } from "../placeorder-init-service";
import { httpService } from "../http-service";
import { api } from "../apis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../http-service");

describe("usePlaceOrderInit", () => {
  const mockProvider = { id: "provider-1" };
  const mockItems = [{ id: "item-1" }];

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

  const mockBilling = {
    name: "John Doe",
    address: "123 Main St",
    state: { name: "State" },
    city: { name: "City" },
    email: "john.doe@example.com",
    phone: "1234567890",
  };


  const queryClient = new QueryClient();

  it("should call getPlaceOrderInit with correct parameters", async () => {
    const mockResponse = [{ context: {}, message: {} }];
    (httpService.post as vi.Mock).mockResolvedValueOnce(mockResponse);

    const { result, waitForNextUpdate } = renderHook(
      () =>
        usePlaceOrderInit({
          provider: mockProvider,
          items: mockItems,
          billing: mockBilling,
          context: mockContext
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitForNextUpdate();

    expect(httpService.post).toHaveBeenCalledWith(
      api.placeorder.init,
      expect.objectContaining({
        initRequestDto: expect.any(Array),
      }),
    );
    expect(result.current.data).toEqual(mockResponse);
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Failed to initialize order");
    (httpService.post as vi.Mock).mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(
      () =>
        usePlaceOrderInit({
          provider: mockProvider,
          items: mockItems,
          billing: mockBilling,
          context: mockContext
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual(mockError);
  });
});
