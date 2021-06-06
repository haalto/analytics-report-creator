import {
  generateAddresses,
  generateCustomers,
  generatePairingForCustomerAndAddressIds,
} from "../utils/generate-seeds";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("shop.customer").del();
  await knex("shop.address").del();

  // Inserts seed entries
  const customers = await knex("shop.customer")
    .insert(generateCustomers(1000))
    .returning("id");
  const addresses = await knex("shop.address")
    .insert(generateAddresses(customers))
    .returning("id");
}
