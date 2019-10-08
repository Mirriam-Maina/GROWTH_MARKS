import sequelize from "./config";
import Sequelize from 'sequelize';

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
    email: {
        type: Sequelize.STRING,
        allowNull: false
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      }
});

sequelize.sync({force: true});

export default User;