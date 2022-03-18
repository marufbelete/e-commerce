const ItemPost = require("../models/item.model");
const LocationPost = require("../models/location.model");
const sharp=require("sharp")
const fs=require("fs");
//for more than one file req.file will be chnaged in to req.files
exports.createPost=async (req, res, next) => {
    try {
        if(!!req.mimetypeError)
        {
            const error = new Error(req.mimetypeError)
            error.statusCode = 400
            throw error;
        }
    const imgurl=[]
    if (req.files.length > 0)
    {
        if (!fs.existsSync("../images")){
            fs.mkdirSync("../images");
        }
console.log(req.files.length)
  for(let f=0;f<req.files.length;f++)
  {
    console.log(req.files[f])
    const imagetype=(req.files[f].mimetype).split("/")[1]
    const path=Date.now()+'-'+Math.round(Math.random()*1E9)
           sharp(req.files[f].buffer)
          .resize({ width:200, fit: 'contain', })
    .toFormat(imagetype)
    .toFile(`./images/${path}`);
    imgurl.push(path)
 }
}
else{
  const error=new Error("you should have an attachment")
  error.statusCode=400
  throw error
}
 const newpost = new ItemPost({
    catagoryType: req.body.catagory,
    price:req.body.price,
    description:req.body.description,
    imageUrl:imgurl,
  })
await newpost.save()
return res.render('/additem',{message:"Item added successfully"})
}
  catch(error) {
    return res.render('/additem',{message:err.message})
  }
}
//get all post
exports.getPost = async (req, res, next) => {
    try {
        let page = !!req.query.pageno ? req.query.pageno : 0
        let pagesize = 12
        let skip = pagesize * page
        let catagoryType=!!req.body.catagorytype?req.body.catagoryType:false
        let conditions=[]
        if(catagoryType)
        {
           conditions= [{catagoryType:catagoryType}];
        }
        let price = !!req.query.price ? req.query.price : !!req.query.price;
        if (price) {
        conditions.push({ price: { $lte: price } });
        }
        let final_condition = { $and: conditions };

        const items = await ItemPost.find(final_condition).limit(pagesize).skip(skip).sort({datefield:-1})
        if (items) {
            res.render('/home',{items})
        }
    }
    catch(error) {
        res.render('/home',{message:error.message})
      }
}
// update post edit
exports.updatePost = async (req, res, next) => {
    try {
      if(!!req.mimetypeError)
      {
          const error = new Error(req.mimetypeError)
          error.statusCode = 400
          throw error;
      }
        const imgurl=[]
        const id =req.params.id
      if (req.files.length > 0)
       {
        if (!fs.existsSync("../images")){
            fs.mkdirSync("../images");
        }
  for(let f=0;f<req.files.length;f++)
  {
    console.log(req.files[f])
    const imagetype=(req.files[f].mimetype).split("/")[1]
    const path=Date.now()+'-'+Math.round(Math.random()*1E9)
           sharp(req.files[f].buffer)
          .resize({ width:200, fit: 'contain', })
    .toFormat(imagetype)
    .toFile(`./images/${path}`);
    imgurl.push(path)
 }

const updated=await ItemPost.findByIdAndUpdate(id, 
  {$set:{ 
    catagoryType: req.body.catagoryType,
    price:req.body.price,
    description:req.body.description,
  }
},{new:true})
   return res.render('/home',{message:"done successfuly"})
}
else
{
res.render("/home",{message:"pleaset attach one or more image"})
}     
}
catch(error) {
      res.render('/home',{message:error.message})
    }
}

//delete post
exports.deletePost = async (req, res, next) => {
    try {
        const id = req.params.id
        await ItemPost.findByIdAndDelete(id)
        res.render("/home",{message:"deleted successfully"})
    }
    catch(error) {
       res.render("/home",{message:error.message})
      }

}