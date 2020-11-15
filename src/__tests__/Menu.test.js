const fetchMock = require('fetch-mock');
const Store = require('../Store');
const response = require('./fixtures/menu8386.json');

const storeID = 8386;

describe('Menu', () => {
  describe('ParseMenu', () => {
    beforeEach(() => {
      fetchMock.get(/order\.dominos\.com\/power\/store\/8386\/menu/, response);
    });

    it('should parse menu', async () => {
      expect.hasAssertions();

      const store = new Store({ID: storeID});

      await store.getMenu((menu) => {
        expect(fetchMock.called()).toBe(true);
        expect(menu).not.toBeNull();

        expect(menu.getFoodCategory()).not.toBeNull();
        expect(menu.getCouponCategory()).not.toBeNull();
        expect(menu.getPreconfiguredCategory()).not.toBeNull();

        const pizzaItem = menu.getItemByCode("S_PIZZA");
        expect(pizzaItem).not.toBeNull();

        expect(pizzaItem.getName()).toBe("Pizza");
      });
    });
  });
});
