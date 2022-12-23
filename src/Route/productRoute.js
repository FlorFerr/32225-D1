const express = require('express')
const { Router } = express
const productsRoute = Router()

const productManager = require('../Class/ProductManager')
const products = new productManager('./Data/products.json')

productsRoute.get('/', async (req, res) =>{
    const { limit } = req.query
    try{
        if (limit) {
            let productos = await products.getProducts()
            let limitedProducts = productos.slice(0, limit)
            res.send(limitedProducts)
        }else{
            res.send(await products.getProducts())
        }
    }catch(error){
        console.log(error)
    }
})

productsRoute.get('/:pid', async (req, res) =>{
    try{
        const { pid } = req.params
        res.send(await products.getProductById(Number(pid)))
    }catch(error){
        console.log(error)
    }
})

productsRoute.post('/', async (req, res) => {
    try{
        const productRequest = req.body
        res.send(await products.addProduct(productRequest))
    }catch(error){
        console.log(error)
    }
})

productsRoute.put('/:pid', async (req, res)=> {
    try{
        const { pid } = req.params
        const productRequest = req.body
        res.send(await products.updateProduct(Number(pid), productRequest))
    }catch(error){
        console.log(error)
    }
})

productsRoute.delete('/:pid', async (req, res)=>{
    try {
        const { pid } = req.params
        res.send(await products.deleteProduct(Number(pid)))
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = productsRoute;
