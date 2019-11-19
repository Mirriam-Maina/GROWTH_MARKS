import Article from '../models/articles';
import article from '../middleware/articles';
import User from '../models/users';


const articleController = {

    createArticle: async(data) => {
        const { title, body, user } = data;
        const articleExists = await article.checkIfExists({title});
        if(!articleExists){

            const author = await User.findOne({where: {id: user.data.id}});
            const createdArticle = await Article.create({title, body, userId: user.data.id})
            console.log(createdArticle);
            return createdArticle;
        }
        throw new Error('Article with that title already exists', 409)
    },

    listArticles: async()=>{
        const articles = await Article.findAll();
        return articles;
    },

    updateArticle: async(data)=>{
        const { id, title, body} = data;
        const articleExists = await article.checkIfExists({id})
        if(articleExists){
            if(title && await article.checkIfExists({title})){
                throw Error('Article with that title already exists');
            }
            if(!title){
                const updatedArticle = await Article.update({body},{where: {id}, returning : true});
                return updatedArticle[1][0];
            }
            if(!body){
                const updatedArticle = await Article.update({title},{where: {id}, returning : true});
                return updatedArticle[1][0];
            }
            const updatedArticle = await Article.update({title:title, body:body},{where: {id}, returning : true});
            return updatedArticle[1][0];
        }
        throw new Error('That article does not exist');
    },

    deleteArticle: async(data) => {
        const { id } = data;
        const articleExists = await article.checkIfExists({id});
        if(articleExists){
            const deleteArticle = Article.destroy({where: {id}});
            return deleteArticle;
        }
        throw new Error('That article does not exist');
    }
}

export default articleController;