'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const helpers = require('./helpers');

const getCategoriesByStore = (storeId) => {
	var params = {
		TableName: "rappiprices",
		Key:{
			"listingId": storeId.toString()
		}
	};
	return dynamo.get(params).promise().then((data) => {
		if(data.Item){
			return data.Item.categories;
		}
		return null;
	});
};

const setCategory = (categoryId, data) => {
	const params = {
		TableName: 'rappiprices',
		Item: {
			listingId: categoryId.toString(),
			type: 'category',
			categories: helpers.removeEmptyStringElements(data)
		}
	};
	return dynamo.put(params).promise();
};

module.exports = {
	getCategoriesByStore,
	setCategory
};
