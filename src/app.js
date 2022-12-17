const express = require('express')
const app = express()
const productManager = require('./ProductManager')

const PORT = 8080
const products =  new productManager('./products.json')

app.use(express.urlencoded({ extended: true}))

app.get('/products', async (req, res) =>{
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

app.get('/products/:pid', async (req, res) =>{
    try{
        const { pid } = req.params
        res.send(await products.getProductById(Number(pid)))
    }catch(error){
        console.log(error)
    }
})

app.get('*',(req, res) =>{
        res.send(
            { error : -2, descripcion: `Ruta: ${req.url} - Método: ${req.method} no implementados`}
        )
    })

const server = app.listen(PORT, ()=> {
    console.log(`Puerto: ${server.address().port}`)
})

server.on('error', err => {console.log(err)})