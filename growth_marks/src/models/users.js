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
        allowNull: true
      },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
    isEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      activateToken: {
        type: Sequelize.STRING,
        allowNull: true
      }
});

sequelize.sync({force: true});

export default User;