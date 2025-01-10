import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";

class Url extends Model {
  public id!: number;
  public originalUrl!: string;
  public shortUrl!: string;
  public alias?: string;
  public expiresAt?: Date;
  public clickCount!: number;
  public createdAt!: Date;
}

Url.init(
  {
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [0, 20],
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    clickCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Url",
  }
);

export default Url;
