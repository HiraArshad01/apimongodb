var express = require('express');
const validateProduct = require("../../middelwares/validate");
var router = express.Router();
var {Product} = require('../../models/products');


router.get("/", async (req,res) => {
     let page = Number( req.query.page ?  req.query.page: 1);
     let perPage = Number (req.query.perPage ?  req.query.perPage: 10);
     let skipRecords = (perPage*(page-1));
    let products = await Product.find().skip(skipRecords).limit(perPage);
    return res.send(products);
});



router.get("/:id", async (req,res) => {
   try {
     let product = await Product.findById(req.params.id);
     if(!product) return res.status(400).send("Product is not present");
     return res.send(product);
   } catch (error) {
        return res.status(400).send("Invalid Id");
   }
});



router.put("/:id", validateProduct,  async (req,res) => {

     let product = await Product.findById(req.params.id);
     product.name = req.body.name;
     product.price = req.body.price;
     await product.save();
     return res.send(product);
});


router.delete("/:id", async (req,res) => {

     let product = await Product.findByIdAndDelete(req.params.id);
     return res.send(product);
});


router.post("/", validateProduct, async (req,res) => {

      let product = await new Product();
      product.name = req.body.name;
      product.price = req.body.price;
      await product.save();
      return res.send(product);
});


module.exports = router;

