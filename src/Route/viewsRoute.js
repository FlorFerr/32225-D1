const express = require('express')
const { Router } = express
const viewsRoute = Router()

const productManager = require('../Class/ProductManager')
const products = new productManager('./Data/products.json')

viewsRoute.get('/', async (req, res) =>{
    try{
        let listProducts = await products.getProducts()
        res.render('index', {listProducts: listProducts})
    }catch(error){
        throw new Error(error)
    }
})

module.exports = viewsRoute;