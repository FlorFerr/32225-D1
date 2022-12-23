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
        throw new Error(err)
    })
})

cartRoute.post('/', async (req, res) => {
    try{
        res.send( await cart.saveCart())
    }catch(error){
        throw new Error(error)
    }
})

cartRoute.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        res.send( await cart.saveCartItem(Number(cid), pid))
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = cartRoute;