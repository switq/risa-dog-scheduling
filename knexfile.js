// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: 'mysql2',
    connection: {
      database: 'risadb',
      user:     'root',
      password: 'Lele102003@$'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
