const Store = require('../Store');
const fetchMock = require('fetch-mock');
const response = require('./fixtures/menu8386.json');
const storeInfoResponse = require('./fixtures/store-getInfo-fixture.json');

describe('Store', () => {
  it('should create store', () => {
    const newStore = new Store({ID: 8386});

    expect(newStore.ID).toBe(8386);
  });

  describe('getInfo', () => {
    beforeEach(() => {
      fetchMock.get(/order\.dominos\.com\/power\/store\/9760\/profile/, storeInfoResponse);
    });

    it('should work', async () => {
      expect.hasAssertions();

      const newStore = new Store({ID: 9760});

      const info = await newStore.getInfo();
      expect(fetchMock.called()).toBe(true);
      expect(info).toBeDefined();
      expect(info.result).toBeDefined();
      expect(info.result.StoreID).toBe('9760');
    });
  });

  describe('getMenu', () => {
    beforeEach(() => {
      fetchMock.get(/order\.dominos\.com\/power\/store\/8386\/menu/, response);
    });

    it('should work', async () => {
      expect.hasAssertions();

      const newStore = new Store({ID: 8386});

      const menu = await newStore.getMenu();
      expect(menu).toBeDefined();
      expect(menu.getRaw().result).toBeDefined();
      expect(menu.getRaw().result.Misc.StoreID).toBe('8386');
    });
  });

  describe('getFriendlyNames', () => {
    beforeEach(() => {
      fetchMock.get(/order\.dominos\.com\/power\/store\/8386\/menu/, response);
    });

    it('should get all friendly item names from menu', async () => {
      expect.hasAssertions();

      const newStore = new Store({ID: 8386}); 

      const mapping = await newStore.getFriendlyNames();
      expect(mapping).toBeDefined();
      expect(mapping.result).toBeDefined();
      expect(mapping.result.length).toBeGreaterThan(1);
    });
  });
})
