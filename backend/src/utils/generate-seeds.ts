import { config } from "../config";
import faker from "faker";
faker.locale = config.data_locale;
import { pipe, times } from "ramda";
import { AddressSeed, CustomerSeed } from "../types";
import { generateRandomLetter, jsToDb } from "./helpers";

export const generateCustomers = (amount: number): CustomerSeed[] => {
  return times(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${faker.internet.domainName()}`;
    return jsToDb({ firstName, lastName, email }) as CustomerSeed;
  }, amount);
};

export const generateAddresses = (customerIds: string[]): AddressSeed[] => {
  const addresses = customerIds.map((customerId) => {
    const street = faker.address.streetName();
    const apartment = `${generateRandomLetter()} ${Math.floor(
      Math.random() * 100
    )}`;
    const zipcode = faker.address.zipCode();
    const city = faker.address.cityName();
    const country = faker.address.country();
    return jsToDb({
      customerId,
      street,
      apartment,
      zipcode,
      city,
      country,
    }) as AddressSeed;
  });
  return addresses;
};

export const generatePairingForCustomerAndAddressIds = (
  customerIds: string[],
  addressIds: string[]
) => {
  const rows = customerIds.map((customerId) =>
    jsToDb({
      customerId,
      addressId: addressIds[Math.floor(Math.random() * addressIds.length)],
    })
  );
  return rows;
};
