const History=require("../models/history.model")

exports.addToBuy= async(res,req,next)=>{
try{

    const userid=req.body.userid
    const itemid=req.body.itemid
    const item=await History.findById(itemid)
    const newcatgory=new History({
    user:userid,
    catagoryType: item.catagory,
    price:item.price,
    description:item.description,
    imageUrl:item.imgurl,
})
  await newcatgory.save()
  return res.render('/history',{message:"you have purchesed successully"})
}
catch{

   return res.render('/history',{message:"something went wrong"})
}

}

exports.getAllHistory= async(res,req,next)=>{
    try{
    const allhistory=await History.find()
      return res.render('/history',{catagory:allhistory})
    }
    catch{
    
        return res.render('/catagory',{message:"something went wrong"})
    
    }
    
    }
