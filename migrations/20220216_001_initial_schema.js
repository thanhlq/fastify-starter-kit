// @ts-ignore
exports.up = (knex) => {
  return knex.schema
    // @ts-ignore
    .createTable('organizations', (table) => {
      table.string('id', 21).primary()
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
      table.string('id', 21).primary()
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
      table.string('activatedAt')
      table.string('lastLoginAt')
      table.string('deletedAt')
      table.json('address')
    })
    // @ts-ignore
    .createTable('groups', (table) => {
      table.string('id', 21).primary()
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
      table.string('id', 21).primary()

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