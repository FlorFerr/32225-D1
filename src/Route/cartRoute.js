const express = require('express')
const { Router } = express
const cartRoute = Router()

const cartManager = require('../Class/CartManager')
const cart = new cartManager('./Data/cart.json')

cartRoute.get('/:cid', (req, res) => {
	const { cid } = req.params
    cart.getCart(parseInt(cid))
    .then(response=>{
        res.send(response)
    })
    .catch(err => {
        console.log(err)
    })
})

cartRoute.post('/', async (req, res) => {
    try{
        res.send( await cart.saveCart())
    }catch(error){
        console.log(error)
    }
})

cartRoute.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        res.send( await cart.saveCartItem(Number(cid), pid))
    } catch (error) {
        console.log(error)
    }
})

module.exports = cartRoute;