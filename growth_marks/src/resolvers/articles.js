import auth from '../middleware/auth';
import articlesController from '../controllers/articleController';


const checkLoggedInUser = (context) => {
  const { req } = context;
  const decodedUser = auth.decodeToken(req);
  decodedUser.isLoggedIn ? true : false;
}

export default {
    Query: {
      articles: async(parent, args, context) => {
        if(checkLoggedInUser(context)){
          const articles = await articlesController.listArticles();
          return articles;
        }
      },
    },

    Mutation: {
        createArticle: async(parent, {title, body}, context) =>{
          if(checkLoggedInUser(context)){
            const createdArticle = await articlesController.createArticle({title, body});
            return createdArticle;
          }
        },
        updateArticle: async(parent, {title, body, id}, context) => {
          if(checkLoggedInUser(context)){
            const updatedArticle = await articlesController.updateArticle({title, body, id});
            return updatedArticle;
          }
        },
        deleteArticle: async(parent, {id},context) => {
          if(checkLoggedInUser(context)){
            const deleteArticle = await articlesController.deleteArticle({id});
            if(deleteArticle){
              return deleteArticle;
            }
          }
        }
    }
  };