import express from "express"
const exp= express();

exp.get('/',(req,res)=>{
    res.send("hello world");
})

exp.listen(8000,()=>{
    console.log("Server running at port 8000");
})


