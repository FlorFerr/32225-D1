class ProductManager{

    constructor(){
        this.products = []
    }

    addProduct(product){
        if (this.products.length === 0) {
            product["id"] = 1;
            this.products.push(product)
        } else {
            product["id"] = this.products[this.products.length - 1]["id"] + 1;
            let duplicateCode = this.products.find(element => element.code === product.code)
            if(!duplicateCode){
                this.products.push(product)
            }else{
                console.log({error: 'Duplicate code'})
            }
        }
    }
    
    getProducts(){
        console.log(this.products)
        return this.products
    }

    getProductById(id){
        let productFound = this.products.find(product => product.id === id)
        if(productFound){
            console.log(productFound)
            return productFound
        }else{
            console.log({error: 'Not found'})
        }
    }
}

const newProduct = new ProductManager()
//newProduct.getProducts()
newProduct.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail:'sin imagen', code: 'abc123',stock: 25})
//newProduct.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail:'sin imagen', code: 'abc123',stock: 25})
//newProduct.getProductById(5)
