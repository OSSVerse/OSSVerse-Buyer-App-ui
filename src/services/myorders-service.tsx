import { useQuery } from "@tanstack/react-query";
import { api } from "./apis";
import { httpService } from "./http-service";

export type OrderResponse = {
    orders: Order[];
};

export type Order = {
    id: string;
    userId: string;
    parentOrderId: string;
    orders: SubOrder[];
};

export type SubOrder = {
    context: Context;
    message: SubOrderMessage;
};

export type Context = {
    ttl: string;
    action: string;
    timestamp: string;
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
    country: Country;
    city: City;
};

export type Country = {
    name: string;
    code: string;
};

export type City = {
    name: string;
    code: string;
};

export type SubOrderMessage = {
    context: Context;
    responses: Response[];
};

export type Response = {
    context: Context;
    message: ResponseMessage;
};

export type ResponseMessage = {
    order: OrderDetails;
};

export type OrderDetails = {
    provider: Provider;
    state: string;
    items: Item[];
    billing: Billing;
    fulfillments: Fulfillment[] | null;
    quote: Quote;
    payment: Payment;
    id: string;
    created_at: string;
    updated_at: string;
    type: string;
};

export type Provider = {
    id: string;
    locations: Location[];
};

export type Item = {
    descriptor: Descriptor;
    price: Price;
    category_id: string;
    quantity: Quantity;
    description: string
    longDescription: string
    productSubcategory1?: string
};

export type Descriptor = {
    name: string;
};

export type Price = {
    currency: string;
    value: string;
};

export type Quantity = {
    count: number;
    measure: Measure;
};

export type Measure = {
    unit: string;
    value: number;
};

export type Billing = {
    tax_number: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
};

export type Fulfillment = {
    id: string;
    type: string;
    // Add properties based on actual structure
};

export type Quote = {
    ttl: string;
    price: Price;
    breakup: Breakup[];
};

export type Breakup = {
    item: Price;
    price: Price;
    title: string;
    '@ondc/org/item_id': string;
    '@ondc/org/title_type': string;
    '@ondc/org/item_quantity': ItemQuantity;
};

export type ItemQuantity = {
    count: number;
};

export type Payment = {
    '@ondc/org/settlement_details': SettlementDetails[];
    '@ondc/org/buyer_app_finder_fee_type': string;
    '@ondc/org/buyer_app_finder_fee_amount': string;
};

export type SettlementDetails = {
    bank_name: string;
    branch_name: string;
    settlement_type: string;
    beneficiary_name: string;
    settlement_phase: string;
    settlement_ifsc_code: string;
    settlement_counterparty: string;
    settlement_bank_account_no: string;
};


export const getMyOrders = async () => {
    return await httpService.get<OrderResponse>(
        `${api.myorders.get}?userId=1235`,
    );
};

export const useMyOrders = () => useQuery({
    queryKey: [api.myorders.get],
    queryFn: getMyOrders,
    select: (data) => data.orders,
});
