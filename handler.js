'use strict';

const request = require('axios');
const { differenceWith, isEqual } = require('lodash');
const categoryService = require('./categoryService');
const productService = require('./productService');


const getprices = (event, context, callback) => {
	const rootCategoryId = 1;
	categoryService.getCategory(rootCategoryId).then(rootCategory => {
		if(!rootCategory){
			console.log('No match');
			return null;
		}
		rootCategory.suboptions.forEach(mkt => {
			mkt.stores.forEach(store => {
				categoryService.getCategory(store.store_id).then(categories => {
					console.log("+ " + mkt.name + " store_id: " + store.store_id);
					if(categories)
					{
						categories.forEach(cat => {
							console.log("--- " + cat.name + " - index:" + cat.index);
							cat.sub_corridors.forEach(corridor => {
								console.log("----- " +  corridor.name + " - subcorridor_id:" + corridor.subcorridor_id);
								productService.getProductsByCategory(store.store_id, corridor.subcorridor_id);

							})
						});
					}
				});

			});
		});
	});
};

const setprices = (event, context, callback) => {
	productService.getProductsByCategory(112241, 104);
};

module.exports = {
	getprices : getprices,
	setprices : setprices
};
