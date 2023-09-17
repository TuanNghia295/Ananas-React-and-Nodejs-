module.exports = {
  // multipleSQLToObject: function (sqlResult) {
  //   return sqlResult.map((row) => {
  //     return {
  //       ...row,
  //     };
  //   });
  // },

  // Nếu bạn chỉ muốn lấy giá trị hiện tại của bản ghi
  multipleSQLToObject: (data) => {
    return data.map((item) => item.dataValues);
  },

  sqlToObject: (sqlResult) => {
    return sqlResult ? { ...sqlResult } : sqlResult;
  },
};
