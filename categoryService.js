'use strict';

const request = require('axios');
const category = require('./category');

const retrieveRappiStoreCategories = (storeId) => {
	request.get('https://services.rappi.com.ar/windu/corridors/sub_corridors/store/' + storeId)
		.then(({data}) => {
			category.setCategory(storeId, data);
			return data;
		});
};

const getCategory = (storeId) => {
	return category.getCategoriesByStore(storeId).then(data => {
		if(!data){
			return retrieveRappiStoreCategories(storeId);
		}
		return data;
	});
}

const setRootCategory = () => {
	const rootCategory = require('./batman.json')[0];
	category.setCategory(1, rootCategory);
}
module.exports = {
	getCategory,
	setRootCategory
};
