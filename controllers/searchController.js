import Product from "../models/Product.js";

export const getSearchProduct = (req, res) => {
  let productSearch=req.body.productSearch
  
      if (!productSearch) {
        res.redirect("/products");
      }else{
        Product.find({productName: productSearch}).lean().then(product=>{
          res.render('products', {allProduct: product});
          console.log(product)
        })
      }
      
      // {
      //   Product.find({type: productSearch}).lean().then(product=>{
      //     console.log("kk",product);
      //     res.render('products', {allProduct: product})
      //   })
      // }


        //else
        


        console.log(productSearch);    
}
//////////////////////////////////////////////////////////////////////////////////////////////////

/*export const getSearchProduct = (req, res) => {
  let productNames=req.body.productNames
        function product(){
          res.render('products', {allProduct: product})
        };
        switch (productNames){
         case (Product.find({productName: req.body.productNames}).lean()): product();
         break;
         case (Product.find({type: req.body.productNames}).lean()): product();
         break;
         default:
          result=res.redirect("/products");
        }*/
