const express = require('express')
const app = express()

const PORT = 8080
const productsRoute = require('./Route/productRoute')
const cartRoute = require('./Route/cartRoute')


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api/products', productsRoute)
app.use('/api/carts', cartRoute)

app.get('*',(req, res) =>{
        res.send(
            { error : -2, descripcion: `Ruta: ${req.url} - Método: ${req.method} no implementados`}
        )
    })

const server = app.listen(PORT, ()=> {
    console.log(`Puerto: ${server.address().port}`)
})

server.on('error', err => {console.log(err)})


