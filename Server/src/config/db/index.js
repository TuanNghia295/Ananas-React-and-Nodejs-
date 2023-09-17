const mysql = require("mysql2");

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "Panda2905@",
      database: "Ananas",
    });

    console.log("Successfully connected to MySQL");
    // Do something with the connection

    connection.end(); // Đóng kết nối sau khi hoàn thành công việc
  } catch (error) {
    console.log("Connection failed", error.message);
  }
}

module.exports = { connect };
