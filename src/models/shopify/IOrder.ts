export interface IGOrder {
  orders: IEdgesOrder<INodesOrder[]>;
}

export interface IEdgesOrder<T> {
  edges: T;
  pageInfo: IPageInfo;
}

export interface IPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface INodesOrder {
  node: IOrder;
}

export interface IOrder {
  id: string;
  name: string;
  createdAt: string;
  currencyCode: string;
  lineItems: INodes<INodesLineItems[]>;
  customer: ICustomerOrder;
  totalPriceSet: IMonetarySet;
  currentTotalTaxSet: IMonetarySet;
  totalShippingPriceSet: IMonetarySet;
  currentTotalDutiesSet?: IMonetarySet;
  currentTotalAdditionalFeesSet?: IMonetarySet;
  currentTotalDiscountsSet?: IMonetarySet;
  totalRefundedSet?: IMonetarySet;
  totalPrice: string;
  refunds: IRefund[];
}

export interface IRefund {
  totalRefundedSet: IMonetarySet;
}

export interface IProductOrder {
  id: string;
  title: string;
  variants: INodes<IVariantProduct[]>;
}

export interface IVariantProduct {
  id: string;
}
export interface INodes<T> {
  nodes: T;
}

export interface INodesLineItems {
  customAttributes: IAttributes[];
  name: string;
  title: string;
  image: IImageOrder;
  product: IProductOrder;
}

export interface IImageOrder {
  altText: string;
  height: number;
  url: string;
  width: number;
  src: string;
}

export interface IAttributes {
  key: string;
  value: string;
}

export interface ICustomerOrder {
  email: string;
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  addressesV2: INodes<IAddressesV2[]>;
}

export interface IAddressesV2 {
  address1: string;
  address2: string;
  city: string;
  countryCodeV2: string;
  latitude: number;
  longitude: number;
  id: string;
  province: string;
  zip: string;
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  country: string;
}

export interface IMonetarySet {
  shopMoney: {
    amount: string;
  };
}
