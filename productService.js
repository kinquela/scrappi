'use strict';
const request = require('axios');
const product = require('./product');

const retrieveRappiCategoryProducts = (storeId, categoryId, nextId) => {
	let url = 'https://services.rappi.com.ar/api/subcorridor_sections/products?subcorridor_id=' + categoryId + '&store_id=' + storeId + '&include_stock_out=false&limit=20';
	if(nextId != undefined && nextId)
	{
		url += '&next_id=' . nextId;
	}
	request.get(url)
		.then((data) => {
			if(data.next_id)
			{
				retrieveRappiCategoryProducts(storeId, categoryId, data.next_id);
			}
			if(data.results && data.results[0].products){
				product.setProducts(storeId, categoryId, data.results[0].products, nextId);
			}
		});
};

const getProductsByCategory = (storeId, categoryId) => {
	return product.getProductsByCategory(storeId, categoryId).then(data => {
		return retrieveRappiCategoryProducts(storeId, categoryId);
		return data;
	})
}

const getProduct = (productId) => {
	return product.getProduct(productId).then(data => {
		return data;
	});
}

module.exports = {
	getProductsByCategory,
	getProduct
};
