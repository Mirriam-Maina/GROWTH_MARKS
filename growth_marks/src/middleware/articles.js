import Article from '../models/articles';

const article = {

checkIfExists: async(data) => {
    const articleExists = await Article.findOne({where: data});
    if(articleExists){
        return true
        };
  return false
},
};

export default article;