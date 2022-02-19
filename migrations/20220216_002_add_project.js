// @ts-ignore
exports.up = (knex) => {
  return knex.schema
    // @ts-ignore
    .createTable('projects', (table) => {
      table.string('id', 21).primary()
      table
      .string('parentId', )
      .references('id')
      .inTable('projects')
      .onDelete('SET NULL')
      .index()
      table.string('name')
      table.string('code')
    })
}

// @ts-ignore
exports.down = (knex) => {
}