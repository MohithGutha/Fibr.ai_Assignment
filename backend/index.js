const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))

const products = [
    {
      "id": 1,
      "name": "Wireless Mouse",
      "image": "https://example.com/images/wireless-mouse.jpg",
      "price": 25.99,
      "category": "Electronics"
    },
    {
      "id": 2,
      "name": "Bluetooth Headphones",
      "image": "https://example.com/images/bluetooth-headphones.jpg",
      "price": 59.99,
      "category": "Electronics"
    },
    {
      "id": 3,
      "name": "Coffee Maker",
      "image": "https://example.com/images/coffee-maker.jpg",
      "price": 89.99,
      "category": "Home Appliances"
    },
    {
      "id": 4,
      "name": "Electric Kettle",
      "image": "https://example.com/images/electric-kettle.jpg",
      "price": 45.99,
      "category": "Home Appliances"
    },
    {
      "id": 5,
      "name": "Yoga Mat",
      "image": "https://example.com/images/yoga-mat.jpg",
      "price": 20.99,
      "category": "Fitness"
    },
    {
      "id": 6,
      "name": "Dumbbell Set",
      "image": "https://example.com/images/dumbbell-set.jpg",
      "price": 150.00,
      "category": "Fitness"
    },
    {
      "id": 7,
      "name": "Running Shoes",
      "image": "https://example.com/images/running-shoes.jpg",
      "price": 120.00,
      "category": "Footwear"
    },
    {
      "id": 8,
      "name": "Leather Wallet",
      "image": "https://example.com/images/leather-wallet.jpg",
      "price": 35.00,
      "category": "Accessories"
    },
    {
      "id": 9,
      "name": "Sunglasses",
      "image": "https://example.com/images/sunglasses.jpg",
      "price": 75.00,
      "category": "Accessories"
    },
    {
      "id": 10,
      "name": "Wrist Watch",
      "image": "https://example.com/images/wrist-watch.jpg",
      "price": 250.00,
      "category": "Accessories"
    },
    {
      "id": 11,
      "name": "Backpack",
      "image": "https://example.com/images/backpack.jpg",
      "price": 60.00,
      "category": "Bags"
    },
    {
      "id": 12,
      "name": "Laptop Sleeve",
      "image": "https://example.com/images/laptop-sleeve.jpg",
      "price": 30.00,
      "category": "Bags"
    },
    {
      "id": 13,
      "name": "Smartphone",
      "image": "https://example.com/images/smartphone.jpg",
      "price": 699.99,
      "category": "Electronics"
    },
    {
      "id": 14,
      "name": "Tablet",
      "image": "https://example.com/images/tablet.jpg",
      "price": 329.99,
      "category": "Electronics"
    },
    {
      "id": 15,
      "name": "Desk Lamp",
      "image": "https://example.com/images/desk-lamp.jpg",
      "price": 40.00,
      "category": "Home Decor"
    },
    {
      "id": 16,
      "name": "Wall Art",
      "image": "https://example.com/images/wall-art.jpg",
      "price": 120.00,
      "category": "Home Decor"
    },
    {
      "id": 17,
      "name": "Office Chair",
      "image": "https://example.com/images/office-chair.jpg",
      "price": 199.99,
      "category": "Furniture"
    },
    {
      "id": 18,
      "name": "Standing Desk",
      "image": "https://example.com/images/standing-desk.jpg",
      "price": 350.00,
      "category": "Furniture"
    },
    {
      "id": 19,
      "name": "Gaming Console",
      "image": "https://example.com/images/gaming-console.jpg",
      "price": 499.99,
      "category": "Electronics"
    },
    {
      "id": 20,
      "name": "Action Camera",
      "image": "https://example.com/images/action-camera.jpg",
      "price": 299.99,
      "category": "Electronics"
    },
    {
      "id": 21,
      "name": "Blender",
      "image": "https://example.com/images/blender.jpg",
      "price": 99.99,
      "category": "Home Appliances"
    },
    {
      "id": 22,
      "name": "Air Fryer",
      "image": "https://example.com/images/air-fryer.jpg",
      "price": 129.99,
      "category": "Home Appliances"
    },
    {
      "id": 23,
      "name": "Electric Toothbrush",
      "image": "https://example.com/images/electric-toothbrush.jpg",
      "price": 59.99,
      "category": "Personal Care"
    },
    {
      "id": 24,
      "name": "Hair Dryer",
      "image": "https://example.com/images/hair-dryer.jpg",
      "price": 49.99,
      "category": "Personal Care"
    },
    {
      "id": 25,
      "name": "Cookware Set",
      "image": "https://example.com/images/cookware-set.jpg",
      "price": 200.00,
      "category": "Kitchen"
    }
]

app.get('/products', (req, res) => {
    const { page=1, category, search, per_page=10 } = req.query;

    let filteredProducts = [...products];

    if(category) {
        filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase())
    }

    if(search && search!=="") {
        filteredProducts = filteredProducts.filter(
            product => product.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / per_page);
    const startIndex = per_page * (page-1);
    const endIndex = startIndex + per_page;

    res.json({
        products: filteredProducts.slice(startIndex, endIndex),
        totalPages,
        currentPage: parseInt(page),
        totalProducts: totalProducts
    })

});

app.listen(5000, ()=>{
    console.log(`Server running on port 5000`);
})

