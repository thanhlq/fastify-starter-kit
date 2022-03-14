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
 * @returns { Promise<void> }
 */
const up = function(knex) {
  return knex.schema
  .createTable('groups', (table) => {
    defineRequiredColumns(knex, table)
    table.string('name')
    table.string('code')
    table
    .string('parent_id', idLength)
      .references('id')
      .inTable('groups')
      .onDelete('SET NULL')
      .index()
  })
  .createTable('users_groups', (table) => {
    defineRequiredColumns(knex, table)
    table
      .string('user_id', idLength)
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index()
    table
      .string('group_id', idLength)
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE')
      .index()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function(knex) {
  return knex.schema
  .dropTableIfExists('users_groups')
  .dropTableIfExists('groups')
};

export {up, down}
