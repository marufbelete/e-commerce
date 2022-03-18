const CatagoryPost=require("../models/catagory.model")

exports.addCatagory= async(res,req,next)=>{
try{
    const catagory=req.body.catagoryType
const newcatgory=new CatagoryPost({
    catagoryType:catagory
})
  await newcatgory.save()
  return res.render('/catagory',{message:"catagory added successully"})
}
catch{

   return res.render('/catagory',{message:"something went wrong"})

}

}

exports.editCatagory= async(res,req,next)=>{
    try{
     const catagoryid=re.body.id
     const catagory=req.body.catagory
      await CatagoryPost.findByIdAndUpdate({_id:catagoryid},{$set:{
        catagoryType:catagory
      }})
      return res.render('/catagory',{message:"catagory updated successully"})
    }

    catch{
    
       return res.render('/catagory',{message:"something went wrong"})
    
    }
    
    }

exports.getAllCatagory= async(res,req,next)=>{
    try{
        const catagory=req.body.catagoryType
    const allcatagory=await CatagoryPost.find()
      return res.render('/catagory',{catagory:allcatagory})
    }
    catch{
    
        return res.render('/catagory',{message:"something went wrong"})
    
    }
    
    }

exports.deleteCatagory= async(res,req,next)=>{
    try{
        const catagory=req.body.catagoryType
        const catagoryid=req.body.catagoryid
        await CatagoryPost.findByIdAndDelete(catagoryid)
      return res.render('/catagory',{message:"catagory deleted successully"})
    }
    catch{
    
       return res.render('/catagory',{message:"something went wrong"})
    
    }
    
    }