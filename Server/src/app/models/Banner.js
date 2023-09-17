const Sequelize = require("sequelize");
const sequelize = new Sequelize("ananas", "root", "Panda2905@", {
  host: "localhost",
  dialect: "mysql",
});

const BannerModel = (sequelize) => {
  return sequelize.define(
    "Banner",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      banner: {
        type: Sequelize.STRING(255),
      },
      slug: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: true,
      tableName: "banners",
    }
  );
};

const Banner = BannerModel(sequelize);
Banner.sync().then(() => {
  console.log("Bảng 'banners' đã được đồng bộ hóa thành công.");
});

module.exports = Banner;
