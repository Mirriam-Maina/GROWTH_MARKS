import sequelize from './config';
import Sequelize from 'sequelize';

const Comment = sequelize.define('comment', {

    body: {
        type: Sequelize.STRING,
        allowNull: false
    }

    }
);

sequelize.sync({force:true});

export default Comment;