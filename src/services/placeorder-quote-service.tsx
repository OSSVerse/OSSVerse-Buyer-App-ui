import { useMutation } from "@tanstack/react-query";
import { httpService } from "./http-service";
import { api } from "./apis";

// Response interface
export type PlaceOrderQuote = {
  context: PlaceOrderQuoteContext;
  message: PlaceOrderQuoteMessage;
};

export type PlaceOrderQuoteContext = {
  ttl: string;
  action: string;
  timestamp: Date;
  message_id: string;
  transaction_id: string;
  domain: string;
  version: string;
  bap_id: string;
  bap_uri: string;
  location: Location;
  bpp_id: string;
  bpp_uri: string;
};

export type Location = {
  country: City;
  city: City;
};

export type City = {
  name: string;
  code: string;
};

export type PlaceOrderQuoteMessage = {
  catalogs: Catalogs;
};
export type Catalogs = {
  order: Order;
};

export type Order = {
  provider: Provider;
  fulfillments: Fulfillment[];
  quote: Quote;
  items: OrderItem[];
  type: string;
};
export type OrderItem = {
  id: string;
  fulfillment_id: string;
};

export type Quote = {
  price: Price;
  breakup: Breakup[];
  ttl: string;
};

export type Breakup = {
  "@ondc/org/item_id"?: string;
  "@ondc/org/item_quantity"?: Ondcorgitemquantity;
  title?: string;
  "@ondc/org/title_type"?: string;
  price?: Price;
  item?: BreakUpItem;
};

export type BreakUpItem = {
  price: Price;
  quantity: Quantity;
};

export type Quantity = {
  available: Available;
  maximum: Available;
};

export type Available = {
  count: number;
};

// TODO: the swagger/postman example data does not show the data type, any for placeholder
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Ondcorgitemquantity = any;

export type Price = {
  value: string;
  currency: string;
};

export type Fulfillment = {
  id: string;
  "@ondc/org/provider_name": string;
  tracking: boolean;
  "@ondc/org/category": string;
  "@ondc/org/TAT": string;
  provider_id: string;
  type: string;
  state: State;
  end: string;
};

export type State = {
  descriptor: Descriptor;
};

export type Descriptor = {
  code: string;
};

// body interface
// TODO: the swagger/postman example data does not show the data type, any for placeholder
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type QuoteMessageBodyFulfillment = any;

export type Provider = {
  id: string;
};

export type Item = {
  id: string;
};

export const getData = (
  provider: Provider,
  items: Item[],
  fulfillment: QuoteMessageBodyFulfillment,
  context: PlaceOrderQuoteContext
) => {
  context.action = 'select';
  return {
    selectRequestDto: [
      {
        context,
        message: {
          order: {
            provider,
            items,
            fulfillment,
          },
        },
      },
    ],
  }
};

export const getPlaceOrderQuote = async (
  provider: Provider,
  items: Item[],
  fulfillment: QuoteMessageBodyFulfillment,
  context: PlaceOrderQuoteContext
) => {
  return await httpService.post<PlaceOrderQuote[]>(
    api.placeorder.select,
    getData(provider, items, fulfillment, context),
  );
};

export const usePlaceOrderQuote = () => {
  return useMutation<PlaceOrderQuote[], unknown, {
    provider: Provider;
    items: Item[];
    fulfillment: QuoteMessageBodyFulfillment;
    context: PlaceOrderQuoteContext;
  }>({
    mutationFn: ({ provider, items, fulfillment, context }) =>
      getPlaceOrderQuote(provider, items, fulfillment, context),
  });
};
