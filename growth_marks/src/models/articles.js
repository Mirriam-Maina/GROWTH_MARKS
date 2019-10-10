import sequelize from "./config";
import Sequelize from 'sequelize';

const Article = sequelize.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
      },
    body: {
        type: Sequelize.STRING,
        allowNull: false
      }
});

sequelize.sync({force:true});

export default Article;