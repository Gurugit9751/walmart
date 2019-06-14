const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Client = require('node-rest-client').Client;
const app = express();
app.use(bodyParser.json());
app.use(cors());
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
let data = require("./data");

/*This below Request to get the Data from Walmart Server*/
app.get("/walmartproducts/:pageNumber/:pageSize", (req, res) => {
    let client = new Client();
    client.get("https://mobile-tha-server.firebaseapp.com/walmartproducts/1/30", (data, response) => {
        res.send(data);
    });
});

/*This below Request to get the Data for particular product based on the user Click we have to sort the Array
in the Local Array List */
app.get("/walmartproducts/:id", (req, res) => {
    let id = req.params.id;
    let products = data.products.filter(item => {
        return item.productId === id;
    })
    res.send(products[0]);
});

/*This below Request to filter the user enter input values in the Local Array List */
app.get("/products/filter", (req, res) => {
    const { minPrice, maxPrice, minReviewRating, maxReviewRating, minReviewCount, maxReviewCount, inStock } = req.query;
    var newArray = data.products.reduce(function (final, field) {
        let filterQuery = true
        const price = parseInt(field.price.replace('$', ''), 10);
        const stockVal = inStock ? JSON.parse(inStock) : inStock;
        /*This below condition filter for the price field*/
        filterQuery = minPrice ? price >= minPrice : filterQuery;
        filterQuery = filterQuery && maxPrice ? price <= maxPrice : filterQuery;
        /*This below condition filter for the Rating field*/
        filterQuery = filterQuery && minReviewRating ? field.reviewRating >= minReviewRating : filterQuery;
        filterQuery = filterQuery && maxReviewRating ? field.reviewRating <= maxReviewRating : filterQuery;
        /*This below condition filter for the ReviewCount field*/
        filterQuery = filterQuery && minReviewCount ? field.reviewCount >= minReviewCount : filterQuery;
        filterQuery = filterQuery && maxReviewCount ? field.reviewCount <= maxReviewCount : filterQuery;
        /*This below condition filter for the Stock field*/
        filterQuery = filterQuery && stockVal != undefined ? field.inStock === stockVal : filterQuery;

        if (filterQuery) {
            final.push(field);
        }
        return final;
    }, []);
    res.send({ products: newArray });
});
app.listen(5000, () => console.log(`Server  running`));