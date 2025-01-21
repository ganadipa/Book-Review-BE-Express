import database from "../config/db.js";
import { DataTypes, Model } from "@sequelize/core";
import Book from "./book.model.js";

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize: database.getSequelize(),
    modelName: "Review",
    tableName: "reviews",
    timestamps: true,
  }
);

// Define associations
Book.hasMany(Review, {
  foreignKey: {
    name: "book_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  as: "reviews",
});

Review.belongsTo(Book, {
  foreignKey: {
    name: "book_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  as: "book",
});

export default Review;
