class MenuItem {
  constructor(menuData) {
    this.menuData = menuData || {};
    this.categories = [];
  }

  setCategories(categories) {
    return this.categories = categories;
  }

  getCategories() {
    return this.categories;
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
}

module.exports = MenuItem;
