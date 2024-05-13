import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();

class SearchController {

    async postSearch(req,res){
        try{

        }
        catch(err){
           console.log(err,'error in inserting search data')
        }
    }

    async getSearch(req,res){
        try{

        }
        catch(err){
           console.log(err,'error in fetching data')
        }
    }

    async deleteSearch(req,res){
        try{

        }
        catch(err){
           console.log(err,'error in deleting data')
        }
    }

}

export default SearchController;