import { useQuery } from "@tanstack/react-query";
import { httpService } from "./http-service";
import { api } from "./apis";
import { VITE_BAP_ID } from "./env";

export interface ProductListItem {
  totalPrice: number
  id: string
  descriptor: Descriptor
  items: Item[]
  fulfillments: Fulfillment[]
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  tags: any[]
  "@ondc/org/fssai_license_no": string
  type: string
  provider: string
}

export interface Descriptor {
  name: string
  short_desc: string
  long_desc: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  images: any[]
}

export interface Item {
  id: string
  descriptor: Descriptor2
  price: Price
  code: string
  category_id: string
  sub_category_id: string
  description: string
  longDescription: string
  totalPrice: number
  type: string
  services?: {
    id: string
    name: string
    price: number
  }[]
  provider?: Descriptor & { id: string }
  context: CatalogContext
}

export interface Descriptor2 {
  name: string
  short_desc?: string
  long_desc?: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  images: any[]
}

export interface Price {
  currency: string
  value: string
  maximum_value: string
}

export interface Fulfillment {
  contact: Contact
}

export interface Contact {
  phone: string
  email: string
}

export type MarketplaceProduct = {
  context: MarketplaceProductContext;
  message: MarketplaceProductMessage;
};

export type MarketplaceProductContext = {
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
};

export type Location = {
  country: City;
  city: City;
};

export type City = {
  name: string;
  code: string;
};

export type MarketplaceProductMessage = {
  catalogs: CatalogElement[];
};

export type CatalogElement = {
  context: CatalogContext;
  message: CatalogMessage;
};

export type CatalogContext = {
  domain: string;
  action: string;
  version: string;
  bpp_id: string;
  bpp_uri: string;
  country?: string;
  city?: string;
  location: Location;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: Date;
};

export type CatalogMessage = {
  catalog: PurpleCatalog;
};

export type PurpleCatalog = {
  "bpp/fulfillments": BppFulfillment[];
  "bpp/descriptor": BppDescriptorClass;
  "bpp/providers": BppProvider[];
};

export type BppDescriptorClass = {
  name: string;
  short_desc: string;
  long_desc: string;
  images: null[];
};

export type BppFulfillment = {
  id: string;
  type: string;
};

export type BppProvider = {
  id: string;
  descriptor: BppDescriptorClass;
  items: Item[];
  fulfillments: Fulfillment[];
  tags: string[];
  "@ondc/org/fssai_license_no": string;
};



export type ItemDescriptor = {
  name: string;
  images: string[];
  short_desc: string;
  long_desc: string;
};



const getData = (searchString: string, categoryName: string) => ({
  context: {
    domain: "Software Assurance",
    action: "search",
    version: "1.1.0",
    transaction_id: "ead489b8-81de-49a4-baf6-8d8de7eabf32",
    bap_id: VITE_BAP_ID,
    bap_uri: `http://${VITE_BAP_ID}`,
    message_id: "1d07c819-695c-44ab-bd47-c21678a6ba4e",
    timestamp: "2023-10-09T04:46:28.012Z",
  },
  message: {
    criteria: {
      searchString: searchString,
      categoryName: categoryName,
    },
  },
});

export const getMarketPlaceProducts = async (
  searchString: string,
  categoryName: string,
) =>
  await httpService.post<MarketplaceProduct>(
    api.marketplace.search,
    getData(searchString, categoryName),
  );

export type Product = {
  id: string;
  name: string;
  description: string;
  countryCode: string;
  cityCode: string;
  country: string;
  city: string;
  totalPrice: number;
  type: string;
  creator: string;
  services: {
    id: string;
    name: string;
    serviceName: string;
    price: number;
    currency: string;
    images: string[];
  }[];
}

export type ProductItem = {
  category_id: string;
  code: string;
  description: string;
  descriptor: {
    name: string;
    short_desc: string;
    long_desc: string;
    images: string[];
  };
  id: string;
  longDescription: string;
  price: {
    currency: string;
    value: string;
    maximum_value: string;
  },
  sub_category_id: string;
  type: string;
  provider: string;
}

// const getProducts = (product: MarketplaceProduct, type: string): Product[] => {
//   const catalogs = product.message.catalogs;
//   return catalogs.map((catalog) => {
//     let totalPrice = 0;
//     const finalData = {
//       type: type,
//       id: catalog.context.bpp_id,
//       name: catalog.context.domain,
//       creator: catalog.message.catalog["bpp/providers"][0].descriptor.name,
//       description: catalog.message.catalog["bpp/descriptor"].short_desc,
//       countryCode: catalog.context.location.country.code,
//       cityCode: catalog.context.location.city.code,
//       country: catalog.context.location.country.name,
//       city: catalog.context.location.city.name,
//       totalPrice: 0,
//       services: catalog.message.catalog["bpp/providers"][0].items.map((provider) => {
//         totalPrice += Number(provider.price.value);
//         return {
//           id: provider.id,
//           name: provider.descriptor.name,
//           serviceName: provider.category_id,
//           price: Number(provider.price.value),
//           currency: provider.price.currency,
//           images: provider.descriptor.images,
//         };
//       }),
//     };
//     finalData.totalPrice = totalPrice;
//     return finalData;
//   });
// };

// const getNewProducts: (data: MarketplaceProduct, type: string) => ProductListItem[] = (data, type) => {
//   const products: ProductListItem[] = [];

//   if (data?.message?.catalogs) {
//     for (const catalog of data.message.catalogs) {
//       // Check if the catalog has providers
//       if (catalog.message?.catalog?.["bpp/providers"]) {
//         for (const provider of catalog.message.catalog["bpp/providers"]) {

//           const totalPrice = provider.items.reduce((acc, item) => acc + Number(item.price.value), 0);
//           products.push({
//             ...provider,
//             type: type,
//             provider: provider.id,
//             totalPrice: totalPrice
//           });
//           // }


//           // // Check if the provider has items
//           // if (provider.items && provider.items.length > 0) {
//           //   for (const item of provider.items) {
//           //     products.push({
//           //       ...item,
//           //       type: type,
//           //       provider: provider.id
//           //     });
//           //   }
//           // }
//         }
//       }
//     }
//   }
//   // console.log(products)

//   return products;
// };


const aggregateProducts = (products: MarketplaceProduct, type: string) => {
  const allProducts: Item[] = []
  products.message.catalogs.forEach((catalog, _) => {
    catalog.message.catalog["bpp/providers"].forEach((provider, _) => {
      provider.items.forEach((item, _) => {
        allProducts.push({ ...item, provider: { ...provider.descriptor, id: provider.id }, context: catalog.context })
      })
    })
  })
  return allProducts.reduce((acc: Item[], item) => {
    const existingProduct = acc.find(p => p.descriptor.name === item.descriptor.name);
    if (existingProduct) {
      existingProduct.totalPrice = Number(existingProduct.totalPrice ?? 0) + Number(item.price.value);
      existingProduct.services?.push({
        id: item.id,
        name: item.sub_category_id,
        price: Number(item.price.value ?? 0)
      })
    } else {
      acc.push({
        ...item,
        type: type,
        totalPrice: Number(item.price.value ?? 0),
        services: [{
          id: item.id,
          name: item.sub_category_id,
          price: Number(item.price.value ?? 0)
        }]
      });
    }
    return acc;
  }, [])

}

export const useMarketPlaceProducts = (
  searchString: string,
  categoryName: string,
) => {
  return useQuery({
    queryKey: [api.marketplace.search, searchString, categoryName],
    queryFn: () => getMarketPlaceProducts(searchString, categoryName),
    select: (data) => {
      return aggregateProducts(data, 'PROJECT')
    },
  });
};
