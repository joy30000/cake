

const productModel = require('./models/product');

let productsCache = [];

// Function to get the cache
const getProductsCache = () => productsCache;

// Function to set the cache
const setProductsCache = (products) => {
    productsCache = products;
};

// Function to fetch products from the database and update the cache
const fetchProducts = async () => {
    try {
        productsCache = await productModel.find().exec();
        //console.log('Products fetched and cached');
    } catch (err) {
        console.error('Error fetching products:', err);
    }
};

// Fetch products initially when the server starts
fetchProducts();

// Export functions to access and manage the cache
module.exports = {
    getProductsCache,
    setProductsCache,
    fetchProducts,
};
