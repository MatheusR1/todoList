'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterTodoAddColumTimestampsSchema extends Schema {
  up() {
    this.table('todos', (table) => {
      table.timestamps()
    })
  }

  down() {
    this.table('todos', (table) => {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    })
  }
}

module.exports = AlterTodoAddColumTimestampsSchema
