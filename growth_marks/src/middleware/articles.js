import Article from '../models/articles';
import articles from '../resolvers/articles';
import { ForbiddenError } from 'apollo-server';

const article = {

checkIfExists: async(data) => {
    const articleExists = await Article.findOne({where: data});
    if(articleExists){
        return true
        };
  return false
},

isArticleOwner: async(articleId, userId) => {
  const article = await Article.findOne({where: {id: articleId, userId: userId}});
  if(article){
    return true
  }
  throw new ForbiddenError('You cannot perform this action on an article you did not create');
}
};  

export default article;