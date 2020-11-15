const Store = require('../Store');
const fetchMock = require('fetch-mock');
const response = require('./fixtures/menu8386.json');

describe('Store', () => {
  it('should create store', () => {
    const newStore = new Store({ID: 8386});

    expect(newStore.ID).toBe(8386);
  });

  describe('getInfo', () => {
    beforeEach(() => {
      fetchMock.get(/order\.dominos\.com\/power\/store\/8386\/profile/, {
        StoreID: '8386',
      });
    });

    it('should work', async () => {
      expect.hasAssertions();

      const newStore = new Store({ID: 8386});

      await newStore.getInfo((info) => {
        expect(fetchMock.called()).toBe(true);
        expect(info).toBeDefined();
        expect(info.result).toBeDefined();
        expect(info.result.StoreID).toBe('8386');
      });
    });
  });

  describe('getMenu', () => {
    beforeEach(() => {
      fetchMock.get(/order\.dominos\.com\/power\/store\/8386\/menu/, response);
    });

    it('should work', async () => {
      expect.hasAssertions();

      const newStore = new Store({ID: 8386});

      await newStore.getMenu((menu) => {
        expect(menu).toBeDefined();
        expect(menu.getRaw().result).toBeDefined();
        expect(menu.getRaw().result.Misc.StoreID).toBe('8386');
      });
    });
  });

  describe('getFriendlyNames', () => {
    beforeEach(() => {
      fetchMock.get(/order\.dominos\.com\/power\/store\/8386\/menu/, response);
    });

    it('should get all friendly item names from menu', async () => {
      expect.hasAssertions();

      const newStore = new Store({ID: 8386}); 

      await newStore.getFriendlyNames((mapping) => {
        expect(mapping).toBeDefined();
        expect(mapping.result).toBeDefined();
        expect(mapping.result.length).toBeGreaterThan(1);
      });
    });
  });
})
