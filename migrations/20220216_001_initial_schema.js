import { nanoId } from '../src/core/utils';

function defineRequiredColumns(knex, table) {
  table.string('id', 21).defaultTo(nanoId()).primary()
  table.timestamp('created_at').defaultTo(knex.fn.now()).index()
  table.timestamp('updated_at').index()
  table.timestamp('deleted_at').index()
  table.string('created_by', 21).index()
  table.string('updated_by', 21).index()
  table.string('deleted_by', 21).index()
}

// @ts-ignore
exports.up = (knex) => {
  return knex.schema
    // @ts-ignore
    .createTable('organizations', (table) => {
      defineRequiredColumns(knex, table)
      table
      .string('parentId', )
      .references('id')
      .inTable('organizations')
      .onDelete('SET NULL')
      .index()
      table.string('name')
      table.string('code')
    })
    // @ts-ignore
    .createTable('users', (table) => {
      defineRequiredColumns(knex, table)
      table
        .string('orgId')
        .references('id')
        .inTable('organizations')
        .onDelete('SET NULL')
        .index()
      table.string('firstName')
      table.string('lastName')
      table.string('email')
      table.string('password')
      table.string('otpCode')
      table.integer('age')
      table.json('profile')
      table.json('address')
      table.string('activated_at')
      table.string('last_login_at')
    })
    // @ts-ignore
    .createTable('groups', (table) => {
      defineRequiredColumns(knex, table)
      table.string('name')
      table.string('code')
      table
      .string('parentId')
        .references('id')
        .inTable('groups')
        .onDelete('SET NULL')
        .index()
    })

    // @ts-ignore
    .createTable('users_groups', (table) => {
      defineRequiredColumns(knex, table)

      table
        .string('userId')
        .references('id', 21)
        .inTable('users')
        .onDelete('CASCADE')
        .index()

      table
        .string('groupId')
        .references('id', 21)
        .inTable('groups')
        .onDelete('CASCADE')
        .index()
    })
}

// @ts-ignore
exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('users_groups')
    .dropTableIfExists('groups')
    .dropTableIfExists('users')
    .dropTableIfExists('organizations')
}