const { sequelize, User } = require("./models");

(async () => {
  try {
    const targetUser = await User.findOne({ where: { id: 1 } });
    // console.log(targetUser);
    console.log(await targetUser.checkPassword("password"));
  } catch (error) {
    console.log(error);
  }
})();
