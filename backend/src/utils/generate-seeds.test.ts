import { generateAddresses, generateCustomers } from "./generate-seeds";

describe("Generate customer data", () => {
  const customers = generateCustomers(50);
  test("Customer array has 50 entries", () => {
    expect(customers.length).toBe(50);
  });

  test("Customer entry has first_name", () => {
    expect(customers[0]).toHaveProperty("first_name");
  });

  test("Customer entry has last_name fields", () => {
    expect(customers[0]).toHaveProperty("last_name");
  });

  test("Customer entry has email field", () => {
    expect(customers[0]).toHaveProperty("email");
  });

  test("Customers email includes their first name", () => {
    expect(customers[0].email.includes(customers[0].first_name));
  });

  test("Customers email includes their last name", () => {
    expect(customers[0].email.includes(customers[0].last_name));
  });
});

describe("Generate addresses", () => {
  const customerIds = ["31321dasd", "3123123ads"];
  const addresses = generateAddresses(customerIds);
  test("Generate 2 addresses", () => {
    expect(addresses.length).toBe(2);
  });
});
