const fs = require('fs')
class ProductManager{

    constructor(path){
        this.path = path
        fs.existsSync(this.path) ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.products = [];
    }

    addProduct = async (product) => {
        try{
            if (this.products.length === 0) {
                product["id"] = 1;
                this.products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            } else {
                product["id"] = this.products[this.products.length - 1]["id"] + 1;
                let duplicateCode = this.products.find(element => element.code === product.code)
                if(!duplicateCode){
                    this.products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
                }else{
                    console.log({error: 'Duplicate code'})
                }
            }
        }catch(err){
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }
    
    getProducts = async () => {
        try{
            this.products = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(this.products)
        }catch(err){
            console.log(err)
        }
    }

    getProductById = async (id) => {
        try{
            let products = await this.getProducts()
            let productFound = products.find(product => product.id === id)
            if(productFound){
                return productFound
            }else{
                return{error: 'Product not found'}
            }
        }catch(err){
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    updateProduct = async(id, product) => {
        try{
            let products = await this.getProducts()
            const objIndex = products.findIndex(item => item.id === id)
            if(objIndex >= 0){
                products[objIndex] =  { ...product, id }
                await fs.promises.writeFile(this.path, JSON.stringify( products, null, 2, 'utf-8'))
                return `Producto id: ${id} actualizado`
            }else{
                return {error: "Producto no encontrado"}            
            }
        }catch(err){
            throw new Error(`Error al actualizar la información: ${err}`)
        }
    }

    deleteProduct = async(id) =>{
        try{
            const products = await this.getProducts()
            const product = await this.getProductById(id)
            if(product){
            const deleteProduct = products.filter(p => p.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct, null, 2), 'utf-8')
            return "Producto eliminado"
            }
        }catch(err){
            throw new Error(`Error al eliminar la información: ${err}`)
        }
    }
}

module.exports = ProductManager;


/*Test*/
//const newProduct = new ProductManager('./products.json')
//newProduct.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail:'sin imagen', code: 'abc1234',stock: 25})
//newProduct.getProducts()
//newProduct.updateProduct(1, {title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail:'sin imagen', code: 'abc123',stock: 25})
//newProduct.getProductById(2)
//newProduct.deleteProduct(2)
