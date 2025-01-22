import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

/**
 * Database class to handle the connection to the database
 * and provide the Sequelize instance
 *
 * @class Database
 * Singleton class to handle the connection to the database
 */
export class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize({
        dialect: PostgresDialect,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  // Test to see if the connection is successful
  async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  // Get the Sequelize instance
  getSequelize() {
    return this.sequelize;
  }
}

// Create a new instance of the Database class
const database = new Database();

// Freeze the object to prevent modification
Object.freeze(database);

export default database;
