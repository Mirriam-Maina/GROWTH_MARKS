import sequelize from "./config";
import Sequelize from 'sequelize';
import User from './users';

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

Article.belongsTo(User);

sequelize.sync({force:true});

export default Article;