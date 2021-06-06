export type CustomerSeed = {
  first_name: string;
  last_name: string;
  email: string;
};

export type AddressSeed = {
  customer_id: string;
  street: string;
  apartment: string;
  zipcode: string;
  city: string;
  country: string;
};
