import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE SCHEMA shop;

    CREATE TABLE shop.customer (
      id uuid DEFAULT uuid_generate_v4 (),
      first_name varchar(255),
      last_name varchar(255),
      email varchar(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (id)
    );

    CREATE TABLE shop.address (
      id uuid DEFAULT uuid_generate_v4 (),
      street varchar(255),
      apartment varchar(255),
      city varchar(255),
      country varchar(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (id)
    );

    CREATE TABLE shop.customer_addresses (
      customer_id uuid,
      address_id uuid,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      FOREIGN KEY (customer_id) REFERENCES shop.customer(id) ON DELETE CASCADE,
      FOREIGN KEY (address_id) REFERENCES shop.address(id) ON DELETE CASCADE
    );

    CREATE TABLE shop.order (
      id uuid DEFAULT uuid_generate_v4 (),
      customer_id uuid,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (id),
      FOREIGN KEY (customer_id) REFERENCES shop.customer(id)
    );

    CREATE TABLE shop.product_category (
      id uuid DEFAULT uuid_generate_v4 (),
      identifier varchar(255) NOT NULL,
      name varchar(255) NOT NULL,
      PRIMARY KEY(id),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE shop.product (
      id uuid DEFAULT uuid_generate_v4 (),
      name varchar(255) NOT NULL,
      description text,
      category uuid, 
      price bigint NOT NULL CHECK (price >= 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (id),
      FOREIGN KEY (category) REFERENCES shop.product_category(id)
    );

    CREATE TABLE shop.order_items (
      order_id uuid,
      product_id uuid,
      quantity integer NOT NULL CHECK (quantity > 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
      FOREIGN KEY (order_id) REFERENCES shop.order(id),
      FOREIGN KEY (product_id) REFERENCES shop.product(id)
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE shop.order_items;
    DROP TABLE shop.customer_addresses;
    DROP TABLE shop.product;
    DROP TABLE shop.product_category;
    DROP TABLE shop.order;
    DROP TABLE shop.customer;
    DROP TABLE shop.address;
    DROP SCHEMA shop;
    DROP EXTENSION "uuid-ossp";
  `);
}
