import Cart from '../models/Cart.js';
import purchaseRecord from '../models/purchaseRecord.js';
import Product from '../models/Product.js';

const shipMethod = {
  0:{
    name: 'cash on delivery',
    amount: 60
  },
  1: {
    name: "in-store pickup",
    amount: 0
  }
}

export const getShoppingCart = (req, res) => {
  Cart.find({userId: res.locals.user._id}).lean().then((carts) => {
    res.render('shoppingCart', {cartItems: carts})
  })
}

export const deleteShoppingCart = (req, res) => {
  Cart.deleteOne({userId: req.body.userId, productId: req.params.id}).then((item) =>{
    res.redirect('/shoppingCart');
  }).catch((err) => {
    console.log(err);
  })
}



export const postShoppingCart = (req, res) => {
  const { productName, qty, totalPrice, userName, userAddress, shipMethod, finalAmount, productId } = req.body;
  let newFinalAmount = Number(finalAmount) + Number(shipMethod);
  new purchaseRecord({
    userId: res.locals.user._id,
    userName: userName,
    userAddress: userAddress,
    productId: productId,
    qty: qty,
    price: totalPrice,
    shipMethod: shipMethod,
    finalFee: newFinalAmount,
    productName: productName
  }).save().then((item) => {
    if (item) {
      Cart.deleteMany({userId: res.locals.user._id}).then((QAQ) => {
        res.redirect("/shoppingCart")
      })
    }
  })
  
  if (productId.length <= 1) {
    Product.findOne({productId: productId}).then((item) => {
      item.qty = item.qty - qty
      item.save().then(() => {
        console.log('sucess')
        return
      })
    })
    return
  }
  
console.log("hi", typeof productId)
console.log("hi2", productId)

if (productId !== "string"){
    productId.forEach(element => {
      qty.forEach((amount) => {
        Product.findOne({productId: element}).then((item) => {
          item.qty = item.qty - amount
          item.save().then(() => {
            console.log('sucess')
          })
        })
      })
    })
  }
  
}



export const getConfirmCart = (req, res) => {
  Cart.find({userId: res.locals.user._id}).lean().then((item) => {
    let totalPrice = 0;
    let totalAmount = 0;

    if (item.length) {
      for(let i = 0; i< item.length; i++) {
        totalAmount = totalAmount + Number(item[i].price);
        item[i].totalPrice = totalPrice
      }

      res.render('confirm', {allRecord: item, name: res.locals.user.name, shipMethod: shipMethod, address: res.locals.user.address, totalAmount: totalAmount});
    } else {
      req.flash("You don't have any record")
      res.redirect('/products')
    }
  })
}

export const updateCarts = (req, res) => {
  const { productId, productNum, buy } = req.body;
  let newCartItem;
  let totalPrice;
  if (!productNum) {
    req.flash("error_msg","Please Input Amount");
    res.redirect('/products')
  }
  if (buy) {
    Product.findOne({productId: buy}).then((item) => {
      totalPrice = item.price * productNum;
      newCartItem = [{
        userId: res.locals.user?._id,
        productId: item.productId,
        qty:productNum,
        price: totalPrice,
        type:item.type,
        productNum: item.productName,
        productName: item.productName
      }]
      
      res.render('buyConfirm', {items: newCartItem, name: res.locals.user.name, shipMethod: shipMethod, address: res.locals.user.address, totalAmount: totalPrice})
  })
  return
  }
 
  if (!productNum) {
    req.flash("error_msg","Please Input Amount");
    res.redirect('/products')
    return
  }
  Product.findOne({productId: productId}).then((item) => {
    totalPrice = item.price * productNum;
    newCartItem = {
      userId: res.locals.user?._id,
      productId: item.productId,
      qty:productNum,
      price: totalPrice,
      type:item.type,
      productNum: item.productName,
      productName: item.productName
    }
  
    Cart.findOne({productId: productId, userId: res.locals.user?._id}).then((item) => {
      if (item) {
        item.price = item.price + totalPrice
        item.qty = item.qty + Number(productNum);
        Cart(item).save().then(() => {
          req.flash("success_msg", "added to carts!");
          res.redirect('/products')
        })
      }  else {
        new Cart(newCartItem).save().then(() => {
          req.flash("success_msg", "added to carts!");
          res.redirect('/products')
      })
      }
    })
  })
}
