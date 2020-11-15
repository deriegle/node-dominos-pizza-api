'use strict';

class MenuCategory {
  constructor(menuData,parentCategory) {
    if(!menuData) menuData={};

    this.menuData = menuData;
    this.subcategories = [];
    this.products = [];
    this.parent = parentCategory;
  }

  getSubcategories() {
    return this.subcategories;
  }

  getName() {
    return this.menuData.Name;
  }

  getDescription() {
    return this.menuData.Description;
  }

  getCode() {
    return this.menuData.Code;
  }

  getCategoryPath() {
    return this.parent !== undefined
      ? this.parent.getCategoryPath().concat([this.menuData.Code])
      : [this.menuData.Code];
  }

  getProducts() {
    return this.products;
  }
}

module.exports = MenuCategory;
