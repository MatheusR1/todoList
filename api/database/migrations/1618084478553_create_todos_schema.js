'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTodosSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments();
      table.timestamps();
      table.boolean('status');
      table.string('nome');
      table.text('descricao');
      table.integer('user_id').unsigned().references('id').inTable('users');
    })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = CreateTodosSchema
