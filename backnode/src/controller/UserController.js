class UserController{
    async index(req,res){
            const data=[{
                "id":1,
                "username":"admin",
                "password":'123456'
            }]
            return res.status(400).json(data);
        }
}

export default UserController;