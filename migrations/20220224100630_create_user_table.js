import { nanoid } from 'nanoid';

const idLength = 21

function defineRequiredColumns(knex, table) {
  table.string('id', idLength).defaultTo(nanoid()).primary()
  table.timestamp('created_at').defaultTo(knex.fn.now()).index()
  table.timestamp('updated_at').defaultTo(knex.fn.now()).index()
  table.timestamp('deleted_at').index()
  table.string('created_by', idLength).index()
  table.string('updated_by', idLength).index()
  table.string('deleted_by', idLength).index()
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }c
 */
const up = function(knex) {
  return knex.schema
  .createTable('users', (table) => {
    defineRequiredColumns(knex, table)
    table
      .string('org_id', idLength)
      .references('id')
      .inTable('organizations')
      .onDelete('SET NULL')
      .index()
    table.string('first_name')
    table.string('last_name')
    table.string('email')
    table.string('password')
    table.string('opt_code_sms')
    table.string('opt_code_token')
    table.integer('age')
    table.json('profile')
    table.json('address')
    table.string('activated_at')
    table.string('last_login_at')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
};

export {up, down}
