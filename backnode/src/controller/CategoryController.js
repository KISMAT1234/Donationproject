import Post from "../model/Post.js";
import Handler from "../logger/ResponseHandler.js";
const responseInstance = new Handler();

class CategoryController{
  async category(req,res){
    try{
      const categoryName= req.query.categoryName;
      console.log(categoryName,'category name')
      // const categoryData = await Post.find({category: categoryName})
      // if(data){
      //   return responseInstance.responseHandler(res,200,'data fetch success',categoryData)
      // }else{
      //   return responseInstance.responseHandler(res,400,'there is no any  data')
      // }
      res.status(200).json({categoryName});
    }
    catch{
        return responseInstance.responseHandler(res,500,'server error')
    }
  }
}

export default CategoryController;