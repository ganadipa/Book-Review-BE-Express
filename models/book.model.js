import database from "../config/db.js";
import { DataTypes, Model } from "@sequelize/core";

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: database.getSequelize(),
    modelName: "Book",
    tableName: "books",
    timestamps: true,
  }
);

export default Book;
