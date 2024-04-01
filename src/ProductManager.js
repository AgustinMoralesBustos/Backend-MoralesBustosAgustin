class ProductManager {
    constructor() {
    }

    getAllProducts(limit) {
        let allProducts = products;
        if (limit) {
            allProducts = products.slice(0, parseInt(limit));
        }
        return allProducts;
    }

    getProductById(productId) {
        const product = products.find(p => p.id === productId);
        return product;
    }
}

module.exports = ProductManager;
