const MenuItem = require('./MenuItem');
const MenuCategory = require('./MenuCategory');

class Menu {
  constructor(menuData) {
    if(!menuData) {
      menuData = {};
    } else {
      this.parseMenu(menuData);
    }

    this.menuData = menuData;
  }

  getRaw() {
    return this.menuData;
  }

  buildCategories(categoryData,parent) {
    const category = new MenuCategory(categoryData,parent);

    for (const subIndex in categoryData.Categories) {
      category.getSubcategories().push(this.buildCategories(categoryData.Categories[subIndex],category));
    }

    categoryData.Products.forEach((productCode) => {
      //link up products and categories
      const product = this.menuByCode[productCode];

      if (!product) {
        console.log("PRODUCT NOT FOUND: "+productCode,category.getCode());
        return;
      }

      category.getProducts().push(product);
      product.getCategories().push(category);
    });

    return category;
  }

  parseItems(parentMenuData) {
    Object.values(parentMenuData).forEach((menuData) => {
      const menuItem = new MenuItem(menuData);
      this.menuByCode[menuItem.getCode()] = menuItem;
    });
  }

  parseMenu(menuData) {
    this.menuByCode = {};

    this.parseItems(menuData.result.Products);
    this.parseItems(menuData.result.Coupons);
    this.parseItems(menuData.result.PreconfiguredProducts);

    this.rootCategories = {}; //generate category tree using MenuCategory objects

    for (const categoryType in menuData.result.Categorization) {
      const categoryData = menuData.result.Categorization[categoryType];
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
