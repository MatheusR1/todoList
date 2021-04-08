'use strict'

const { makePlain } = require('../../Models/Todo');

const Todo = use('App/Models/Todo');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response, auth }) {
    try {
      const todos = await Todo.query().where('user_id', auth.user.id).fetch();
      return todos;

    } catch (error) {
      return response.status(500).send(`${error}`);
    }
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {

      const req = request.only(['nome', 'descricao', 'status']);

      const todo = await Todo.create({ ...req, user_id: auth.user.id });

      return todo;

    } catch (error) {
      return response.status(500).send(`${error}`);
    }

  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response, auth }) {
    try {

      const todo = await Todo
        .query()
        .where('id', params.id)
        .whereHas('user', (builder) => { builder.where('user_id', auth.user.id) })
        .first();

      return todo ?? response.noContent();

    } catch (error) {
      return response.status(500).send(`${error}`);
    }
  }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {

    try {
      const req = request.only(['nome', 'descricao', 'status']);

      const data = await Todo
        .query()
        .where('id', params.id)
        .whereHas('user', (builder) => { builder.where('user_id', auth.user.id) })
        .first();

      for (const [key, value] of Object.entries(req)) {
        data[key] = value;
      }

      if (!data) return response.noContent();

      return data.save()

    } catch (error) {
      return response.status(500).send(`${error}`);
    }
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    try {
      const todo = await Todo
        .query()
        .where('id', params.id)
        .whereHas('user', (builder) => { builder.where('user_id', auth.user.id) })
        .first();

      if (!todo) return response.noContent();

      todo.delete()
      return response.ok('todo deleted')

    } catch (error) {
      return response.status(500).send(`${error}`);
    }
  }
}

module.exports = TodoController
