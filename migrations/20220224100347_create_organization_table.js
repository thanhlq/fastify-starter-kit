import { nanoid } from 'nanoid';

function defineRequiredColumns(knex, table) {
  table.string('id', 21).defaultTo(nanoid()).primary()
  table.timestamp('created_at').defaultTo(knex.fn.now()).index()
  table.timestamp('updated_at').defaultTo(knex.fn.now()).index()
  table.timestamp('deleted_at').index()
  table.string('created_by', 21).index()
  table.string('updated_by', 21).index()
  table.string('deleted_by', 21).index()
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
  return knex.schema
    .createTable('organizations', (table) => {
      defineRequiredColumns(knex, table)
      table
        .string('parent_id',)
        .references('id')
        .inTable('organizations')
        .onDelete('SET NULL')
        .index()
      table.string('name')
      table.string('code')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
  return knex.schema
    .dropTableIfExists('organizations')
};

export { up, down }
