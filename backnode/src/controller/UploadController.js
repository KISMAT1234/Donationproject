// import Upload from "../model/Upload.js";

// class UploadController{

//     async index(req, res){
//         try{
//             let uploadData = await Upload.aggregate([
//                 {
//                     $lookup:{
//                         from:"categories",
//                         localField:"categories_id",
//                         foreignField: "_id",
//                         as :"categories"
//                     }
//                 },
//                 {
//                     $unwind:"$category"
//                 }
//             ]);

//             uploadData= uploadData.map((news) => {
//               if(news.image){
//                 news.image = process.env.BASE_URL + "/uploads/news" + news.image;              
//             }else{
//                 news.image = process.env.BASE_URL + "/uploads/icons/hope-hostal-about.jpg";             
               
//             }
//             console.log(uploadData)
//             return uploadData;
//         })
//             res.status(200).json(uploadData);
//         }catch(err){
//             res.send(err);
//         }
//     }

//     // async show(req, res){
//     //     try{
//     //         const news = await Upload.findById(req.params.id).populate("category_id");
//     //         if(news.image){
//     //             news.image = process.env.BASE_URL + "/uploads/news" + news.image;              
//     //         }else{
//     //             news.image = process.env.BASE_URL + "/uploads/icons/hope-hostal-about.jpg";             
               
//     //         }
//     //         res.status(200).json(news);
//     //     }catch(err){
//     //         return res.status(500).json(err);

//     //     }
//     // }

//     async store(req, res){
//         try{
//             let imageName="";
//             if(req.file){
//                 imageName= req.file.filename;
//             }
//             const post  = new Upload({...req.body,image:imageName});
//             console.log(post)
//             await post.save();
//             const sendData={
//                 "message":"News Created Successfully", 
//                 "success":true,
//             }
//             return res.status(200).json(sendData);
//         }catch(err){
//             return res.status(500).json(err);
//         }
//     }

//     // async update(req, res){
//     //     try{
          
//     //         if(req.file){
//     //            let imageName= req.file.filename;
//     //         }
//     //         const news = await Upload.findByIdAndUpdate(req.params.id, {...req.body,image:imageName});
//     //         const sendData={
//     //             "message":"News Updated Successfully",
//     //             "success":true,
//     //         }
//     //         return res.status(200).json(sendData);
//     //     }catch(err){
//     //         return res.status(500).json(err);
//     //     }
//     // }

//     // async destroy(req, res){
//     //     try{
//     //         const news = await Upload.findByIdAndDelete(req.params.id);
//     //         const sendData={
//     //             "message":"News Deleted Successfully",
//     //             "success":true,
//     //         }
//     //         return res.status(200).json(sendData);
//     //     }catch(err){
//     //         return res.status(500).json(err);
//     //     }
//     // }

// }

// export default  UploadController;