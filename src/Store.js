const Menu = require('./Menu.js');
const fs = require('fs');
const httpJson = require('./http-json');
const urls = require('./urls');

class Store {
  constructor({ ID } = {}) {
    this.ID = ID;
  }

  async getInfo() {
    if(!this.ID) {
      return {
        success: false,
        message: 'A callback is required to get store info'
      };
    }

    return await httpJson.get(urls.store.info.replace('${storeID}', this.ID));
  }

  async getMenu(lang, noCache) {
    if (this.cachedMenu && !noCache) {
        return this.cachedMenu; //TODO as below, break compatibility by removing first parameter
    }

    if (!this.ID) {
      return {
        success: false,
        message: 'A callback is required to get a store menu'
      };
    }

    const url = urls.store.menu
      .replace('${storeID}', this.ID)
      .replace('${lang}', lang || 'en');

    const jsonObj = await httpJson.get(url);
    this.cachedMenu = new Menu(jsonObj);
    return this.cachedMenu;
  }

  async getFriendlyNames(lang) {
    if (!this.ID) {
      return {
        success: false,
        message: 'A callback is required to get a store menu'
      };
    }

    const url = urls.store.menu.replace('${storeID}', this.ID)
      .replace('${lang}', lang || 'en');

    const result = await httpJson.get(url);
    const itemMapping = [];
    const keys = Object.keys(result.result.Variants);

    keys.forEach((key) => {
      const json = {};
      json[result.result.Variants[key].Name] = key
      itemMapping.push(json);
    });

    return {
      success: true,
      result: itemMapping,
    };
  }
}

module.exports = Store;
