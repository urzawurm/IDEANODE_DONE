import read from "body-parser/lib/read.js";
import Product from "../models/Product.js";
import Idea from"../models/Idea.js"
export const getProduct = (req, res) => {
    Product.find({}).lean().then((product) => {
      if (res.locals.user) {
        Idea.aggregate([
          {$lookup:{
              from:"users",
              localField:"user",
              foreignField:"_id",
              as:"userInfo",
           },
          },
          {$unwind:{
              path: "$userInfo",
              preserveNullAndEmptyArrays:true,
           },
          },
          {
           $sort:{
              "date":-1,
           },
          },
      ]).then(recordsDB=>{
        res.render('products', {records:recordsDB,allProduct: product})
          
      });
        
      } else {
        Idea.aggregate([
          {$lookup:{
              from:"users",
              localField:"user",
              foreignField:"_id",
              as:"userInfo",
           },
          },
          {$unwind:{
              path: "$userInfo",
              preserveNullAndEmptyArrays:true,
           },
          },
          {
           $sort:{
              "date":-1,
           },
          },
      ]).then(recordsDB=>{
        
        res.render('products', {records:recordsDB,allProduct: product})
          
      });
        /*console.log("not authorisex");
        res.render('noAuthProduct', {allProduct: product})*/
      }

    })
} 

// code written by Alan
export const postSearchProduct = (req, res) => {

 const query =
  {
    $or:[{
      productName:{
      $regex:req.body.searchProd,'$options':'i'
    }},{
      type:{
        $regex:req.body.searchProd,'$options':'i'
      }}
    ]}

Product.find(query).lean().then((product)=>{
  res.render('products',{allProduct: product})
 })
}
export const getRecords= (req,res)=>{
  Idea.aggregate([
      {$lookup:{
          from:"users",
          localField:"user",
          foreignField:"_id",
          as:"userInfo",
       },
      },
      {$unwind:{
          path: "$userInfo",
          preserveNullAndEmptyArrays:true,
       },
      },
      {
       $sort:{
          "date":-1,
       },
      },
  ]).then(recordsDB=>{
      res.render("ideas/records",{records:recordsDB});
      
  });
};
