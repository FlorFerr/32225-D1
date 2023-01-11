const express = require('express')
const handlebars = require("express-handlebars");
const { Server: IOServer } = require('socket.io')

const productManager = require('./Class/ProductManager')
const products = new productManager('./Data/products.json')



const app = express()

const productsRoute = require('./Route/productRoute')
const cartRoute = require('./Route/cartRoute')
const viewsRoute = require('./Route/viewsRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api/products', productsRoute)
app.use('/api/carts', cartRoute)
app.use('/', viewsRoute)

const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const io = new IOServer(httpServer)


app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

app.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts')
})

io.on('connection', async (socket) => {
	let historial = await products.getProducts()
	console.log("Se ha conectado el socket con id:", socket.id)
	socket.emit("arrayProductos", historial)

	socket.on("newProduct", async (data) => {
		await products.addProduct(data)
		io.emit("arrayProductos", historial)
		console.log("Se ha agregado un producto")
	})

	socket.on("eliminarProducto", id => {
		products.deleteProduct(id)
		io.emit("arrayProductos", historial)
		console.log("Se ha eliminado un producto")
	})
})


