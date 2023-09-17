const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(`ananas`, "root", "Panda2905@", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log, // Bật logging
});

const ProductList = sequelize.define(
  "productlist",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pro_code: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    pro_name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    pro_type: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.JSON,
      get: function () {
        // lấy dữ liệu từ database
        // parse: chuyển từ kiểu JSON sang js
        const colorValue = this.getDataValue("color");
        if (colorValue && typeof colorValue === "string") {
          try {
            return JSON.parse(colorValue);
          } catch (error) {
            console.error("Error parsing 'color' column:", error);
          }
        }
        return colorValue;
      },
      set: function (value) {
        // set dữ liệu vào database
        // stringify: chuyển từ js sang kiểu JSON
        this.setDataValue("color", JSON.stringify(value));
      },
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },
    image4: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: "productlist", // Specify the table name as "productlist",
    hooks: {
      afterCreate: (product) => {
        // Generate slug from the product's id
        product.slug = product.id;
        return product.save();
      },
    },
  }
);

module.exports = ProductList;
