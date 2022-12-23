const { Console } = require('console')
const fs = require('fs')

const Product = require('../Class/ProductManager')
const  productManager = new Product('./Data/products.json')



class CartManager{
    constructor(path){
        this.path = path
    }

    getAllCarts = async() => {
        try{
            const cart = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(cart)
        }catch(err){
            throw new Error(`Hubo un error al obtener los carritos: ${err.message}`)
        }
    }

    getCart = async(id) => {
        try{
            const carts = await this.getAllCarts()
            const cart = carts.find(c => c.id === id)
            if(cart){
                return cart
            }else{
                return {error: "Carrito no encontrado"}
            }
        }catch(err){
            throw new Error(`Hubo un error obtener el carrito: ${err.message}`)
        }
    }

    saveCart = async () => {
        try{
            const carts = await this.getAllCarts()
            const savedIds = []
            if(carts.length > 0){
                carts.forEach(i => {savedIds.push(i.id)})
                const queryId = Math.max.apply(null, savedIds)
                await fs.promises.writeFile(this.path, JSON.stringify([...carts, {id: queryId +1, products: []}], null, 2), 'utf-8')
            }else{
                await fs.promises.writeFile(this.path, JSON.stringify([{id: 1, products: []}], null, 2),'utf-8')
            }
            return `Carrito creado`
        }catch(err){
            throw new Error(`Hubo un error al guardar el carrito: ${err.message}`)
        }
    }

    saveCartItem = async(id, productId)=>{
        try{
            let carts = await this.getAllCarts()
            const objIndex = carts.findIndex(item => item.id === id)
            const productFound = await productManager.getProductById(parseInt(productId))
            if(carts[objIndex]){
                if(productFound){
                    const duplicateProduct = carts[objIndex].products.findIndex(e => e.id === productId)
                    if(duplicateProduct != -1){
                        console.log(duplicateProduct)

                        carts[objIndex].products[duplicateProduct] = {id: productId, quantity: carts[objIndex].products[duplicateProduct].quantity +  1}
                        await fs.promises.writeFile(this.path, JSON.stringify( carts, null, 2, 'utf-8'))
                    }else{
                        carts[objIndex].products.push({id: productId, quantity: 1})
                        await fs.promises.writeFile(this.path, JSON.stringify( carts, null, 2, 'utf-8'))
                    }
                    return carts[objIndex]
                }else{
                    return {error: "Producto no encontrado"}
                }
            }else{
                return {error: "Carrito no encontrado"}
            }
        }catch(err){
            throw new Error(`Hubo un error al agregar el producto: ${err.message}`)
        }
    }
}

module.exports = CartManager;