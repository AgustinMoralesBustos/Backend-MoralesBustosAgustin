const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    addProduct(product) {
        try {
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                throw new Error("Todos los campos son obligatorios.");
            }
            
            if (typeof product.title !== 'string' || typeof product.description !== 'string' ||
                typeof product.thumbnail !== 'string' || typeof product.code !== 'string' ||
                typeof product.price !== 'number' || typeof product.stock !== 'number') {
                throw new Error("Tipos de datos incorrectos.");
            }

            const products = this.getProducts();
            product.id = products.length + 1;
            products.push(product);
            fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            return null;
        }
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer productos:', error);
            return [];
        }
    }

    getProductById(id) {
        try {
            const products = this.getProducts();
            return products.find(product => product.id === id);
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            return null;
        }
    }

    updateProduct(id, updatedFields) {
        try {
            const products = this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...updatedFields };
                fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
                return products[index];
            }
            console.error('Producto no encontrado.');
            return null;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            return null;
        }
    }

    deleteProduct(id) {
        try {
            let products = this.getProducts();
            products = products.filter(product => product.id !== id);
            fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
            console.log('Producto eliminado exitosamente.');
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            return false;
        }
    }
}

module.exports = ProductManager;
