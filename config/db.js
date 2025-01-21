import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize({
        dialect: PostgresDialect,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        models: [],
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  getSequelize() {
    return this.sequelize;
  }
}

const database = new Database();
Object.freeze(database);

export default database;
