const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize("ananas", "root", "Panda2905@", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    acc_name: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    acc_pass: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: true,
    tableName: "users",
    hooks: {
      afterCreate: (product) => {
        // Generate slug from the product's id
        product.slug = product.id;
        return product.save();
      },
    },
  }
);

// Băm và mã hóa password trước khi lưu vào database
User.beforeCreate(async (user) => {
  if (user.acc_pass) {
    // Tạo vòng mã hóa
    const saltRounds = 10; // 10 vòng mã hóa
    const hashedPassword = await bcrypt.hash(user.acc_pass, saltRounds);
    user.acc_pass = hashedPassword;
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("User đã được đồng bộ hóa thành công.");
  })
  .catch((err) => {
    console.error("Đồng bộ hóa User thất bại:", err);
  });

module.exports = User;
