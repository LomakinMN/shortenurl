// src/models/Click.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";

class Click extends Model {
  public id!: number;
  public urlId!: number;
  public ipAddress!: string;
  public createdAt!: Date;
}

Click.init(
  {
    urlId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Click",
  }
);

export default Click;
