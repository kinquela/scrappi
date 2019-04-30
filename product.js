'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const helpers = require('./helpers');

const getProductsByCategory = (storeId, categoryId) => {
	var params = {
		TableName: "rappiprices",
		Key:{
			"listingId": storeId.toString() + "-" + categoryId.toString()
		}
	};
	return dynamo.get(params).promise().then(data => {
		if(data.Item){
			return data.Item.products;
		}
		return null;
	});
};

const getProduct = (productId) => {
	var params = {
		TableName: "rappiprices",
		Key:{
			"listingId": productId.toString()
		}
	};
	return dynamo.get(params).promise().then((data) => {
		if(data){
			return data;
		}
		return null;
	});
}

const setProducts = (storeId, categoryId, data, nextId) => {
	if(nextId == undefined)
	{
		nextId = "0";
	}
	let d = new Date(date);
	let indexDate = d.getFullYear() + "-" d.getMonth() + "-" + d.getDate();
	const params = {
		TableName: 'rappiprices',
		Item: {
			listingId: storeId.toString() + "-" + categoryId.toString() + "-" + nextId + "-" + indexDate,
			type: 'productList',
			products: helpers.removeEmptyStringElements(data)
		}
	};
	return dynamo.put(params).promise();
};

module.exports = {
	getProductsByCategory,
	setProducts,
	getProduct
};
