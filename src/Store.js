const Menu = require('./Menu.js');
const fs = require('fs');
const httpJson = require('./http-json');
const urls = require('../urls.json');

class Store {
  constructor({ ID }) {
    this.ID = ID;
  }

  async getInfo(callback) {
    if(!this.ID || !callback) {
      if(callback) {
        callback(
          {
            success: false,
            message: 'A callback is required to get store info'
          }
        );
      }

      return;
    }

    callback(await httpJson.get(urls.store.info.replace('${storeID}', this.ID)));
  }

  async getMenu(callback, lang, noCache) {
    if (this.cachedMenu && !noCache) {
        callback(this.cachedMenu); //TODO as below, break compatibility by removing first parameter
        return;
    }

    if( !this.ID || !callback) {
      if(callback) {
        callback({
            success: false,
            message: 'A callback is required to get a store menu'
        });
      }

      return;
    }

    const url = urls.store.menu.replace('${storeID}', this.ID)
        .replace('${lang}', lang || 'en');

    const jsonObj = await httpJson.get(url);
    this.cachedMenu = new Menu(jsonObj);
    callback(this.cachedMenu);
  }

  async getFriendlyNames(callback, lang) {
    if(!this.ID || !callback) {
      if(callback) {
        callback({
          success: false,
          message: 'A callback is required to get a store menu'
        });
      }

      return;
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

    callback({ success: true, result: itemMapping });
  }
}

module.exports = Store;
