import { useMutation } from "@tanstack/react-query";
import { httpService } from "./http-service";
import { api } from "./apis";

// Response export type
export type PlaceOrderInit = {
  context: PlaceOrderInitContext;
  message: PlaceOrderInitMessage;
};
export type PlaceOrderInitContext = {
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
  country?: string;
  city?: string;
};

export type Location = {
  country: City;
  city: City;
};

export type City = {
  name: string;
  code: string;
};

export type PlaceOrderInitMessage = {
  catalogs: Catalogs;
};
export type Catalogs = {
  context: PlaceOrderInitContext;
  responses: Response[];
};

export type Response = {
  context: ResponseContext;
  message: Message;
};
export type Message = {
  order: Order;
};
export type Order = {
  provider: Provider;
  provider_location: Providerlocation;
  items: Provider[];
  billing: Billing;
  fulfillments: Fulfillment[];
  quote: Quote;
  payment: Payment;
  type: string;
};

// TODO: the swagger/postman example data does not show the data type, any for placeholder
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Fulfillment = any;
export type Payment = {
  "@ondc/org/buyer_app_finder_fee_type": string;
  "@ondc/org/buyer_app_finder_fee_amount": string;
  "@ondc/org/settlement_details": Ondcorgsettlementdetail[];
};
export type Ondcorgsettlementdetail = {
  settlement_counterparty: string;
  settlement_phase: string;
  settlement_type: string;
  settlement_bank_account_no: string;
  settlement_ifsc_code: string;
  beneficiary_name: string;
  bank_name: string;
  branch_name: string;
};
export type Quote = {
  price: Price;
  breakup: Breakup[];
  ttl: string;
};
export type Breakup = {
  "@ondc/org/item_id": string;
  "@ondc/org/item_quantity"?: Ondcorgitemquantity;
  title: string;
  "@ondc/org/title_type": string;
  price: Price;
  item?: Item;
};
export type Item = {
  price: Price;
};
export type Ondcorgitemquantity = {
  count: number;
};
export type Price = {
  value: string;
  currency: string;
};
export type Billing = {
  name: string;
  address: string;
  state: State;
  city: State;
  email: string;
  phone: string;
};
export type State = {
  name: string;
};

// TODO: the swagger/postman example data does not show the data type, any for placeholder
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Providerlocation = any;
export type Provider = {
  id: string;
};
export type ResponseContext = {
  domain: string;
  action: string;
  version: string;
  bpp_id: string;
  bpp_uri: string;
  country: string;
  city: string;
  location: Location;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: string;
};

// body export type
export type QuoteMessageBodyItem = {
  id: string;
};

export const getData = (
  provider: Provider,
  items: QuoteMessageBodyItem[],
  billing: Billing,
  context: PlaceOrderInitContext
) => {
  context.action = 'init';
  // biome-ignore lint/performance/noDelete: <explanation>
  delete context?.city;
  // biome-ignore lint/performance/noDelete: <explanation>
  delete context?.country
  return {
    initRequestDto: [
      {
        context,
        message: {
          order: {
            provider,
            items,
            billing,
          },
        },
      },
    ],
  }
};

export const getPlaceOrderInit = async (
  provider: Provider,
  items: QuoteMessageBodyItem[],
  billing: Billing,
  context: PlaceOrderInitContext
) => {
  return await httpService.post<PlaceOrderInit[]>(
    api.placeorder.init,
    getData(provider, items, billing, context),
  );
};

export const usePlaceOrderInit = ({
  provider,
  items,
  billing,
  context
}: {
  provider: Provider;
  items: QuoteMessageBodyItem[];
  billing: Billing;
  context: PlaceOrderInitContext
}) => {
  return useMutation({
    mutationKey: [api.placeorder.init, provider, items, billing, context],
    mutationFn: () => getPlaceOrderInit(provider, items, billing, context),
  });
};
