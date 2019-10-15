import auth from '../middleware/auth';
import article from '../middleware/articles';
import articlesController from '../controllers/articleController';


const checkLoggedInUser = async(context) => {
  const { req } = context;
  const decodedUser = await auth.decodeToken(req);
  return decodedUser;
}

export default {
    Query: {
      articles: async(parent, args, context) => {
        const decodedUser = await checkLoggedInUser(context);
        if(decodedUser.isLoggedIn){
          const articles = await articlesController.listArticles();
          return articles;
        }
      },
    },

    Mutation: {
        createArticle: async(parent, {title, body}, context) =>{
          const decodedUser =  await checkLoggedInUser(context);
          if(decodedUser.isLoggedIn){
            const createdArticle = await articlesController.createArticle({title, body, user: decodedUser.user});
            return createdArticle;
          }
        },
        updateArticle: async(parent, {title, body, id}, context) => {
          const decodedUser =  await checkLoggedInUser(context);
          if(decodedUser.isLoggedIn){
            const isArticleOwner = await article.isArticleOwner(id, decodedUser.user.data.id);
            if(isArticleOwner){
              const updatedArticle = await articlesController.updateArticle({title, body, id});
              return updatedArticle
            };
          }
        },
        deleteArticle: async(parent, {id},context) => {
          const decodedUser = await checkLoggedInUser(context);
          if(decodedUser.isLoggedIn){
            const isArticleOwner = await article.isArticleOwner(id, decodedUser.user.data.id);
            if(isArticleOwner){
              const deleteArticle = await articlesController.deleteArticle({id});
              if(deleteArticle){
                return deleteArticle;
              }
            }
          }
        }
    }
  };