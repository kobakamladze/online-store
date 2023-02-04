import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
});

const CartDevice = sequelize.define("cart_device", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
});

const Device = sequelize.define("device", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING },
  info: { type: DataTypes.JSON },
});

const Type = sequelize.define("type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: { type: DataTypes.STRING },
});

const Brand = sequelize.define("brand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
});

const Rating = sequelize.define("rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartDevice);
CartDevice.belongsTo(Cart);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasOne(CartDevice);
CartDevice.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export { User, Cart, CartDevice, Rating, Device, Type, Brand, TypeBrand };
