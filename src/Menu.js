'use strict';

const MenuItem = require('./MenuItem');
const MenuCategory = require('./MenuCategory');

class Menu {
  constructor(menuData) {
    if(!menuData) {
        menuData={};
    } else {
        this.parseMenu(menuData);
    }

    this.menuData = menuData;
  }

  getRaw() {
    return this.menuData;
  }

  buildCategories(categoryData,parent) {
    var category = new MenuCategory(categoryData,parent);
    for (var subIndex in categoryData.Categories) {
        category.getSubcategories().push(this.buildCategories(categoryData.Categories[subIndex],category));
    }
    categoryData.Products.forEach((function(productCode) { //link up products and categories
        var product = this.menuByCode[productCode];
        if (!product) {
            console.log("PRODUCT NOT FOUND: "+productCode,category.getCode());
            return;
        }
        category.getProducts().push(product);
        product.getCategories().push(category);
    }).bind(this));
    return category;
  }

  parseItems(parentMenuData,ParseClass) {
    var items = [];
    Object.keys(parentMenuData).forEach((function(code) {
        var menuData = parentMenuData[code];
        var obj = new ParseClass(menuData);
        this.menuByCode[obj.getCode()] = obj;
        items.push(obj);
    }).bind(this));
    return items;
  }

  parseMenu(menuData) {
    this.menuByCode = {};
    var products = this.parseItems(menuData.result.Products,MenuItem);
    var coupons = this.parseItems(menuData.result.Coupons,MenuItem);
    var preconfigured = this.parseItems(menuData.result.PreconfiguredProducts,MenuItem);

    this.rootCategories = {}; //generate category tree using MenuCategory objects
    for (var categoryType in menuData.result.Categorization) {
        var categoryData = menuData.result.Categorization[categoryType];
        this.rootCategories[categoryType] = this.buildCategories(categoryData);
    }
  }

  getFoodCategory() {
    return this.rootCategories["Food"];
  }

  getCouponCategory() {
    return this.rootCategories["Coupons"];
  }

  getPreconfiguredCategory() {
    return this.rootCategories["PreconfiguredProducts"];
  }

  getItemByCode(code) {
    return this.menuByCode[code];
  }
}

module.exports = Menu;
