const Utilities = require('../Utilities');
const fetchMock = require('fetch-mock');

describe('Utilities', () => {
  describe('FindStores', () => {
    it('should find nearby stores that deliver', async () => {
      expect.hasAssertions();

      fetchMock.get(/order\.dominos\.com\/power\/store\-locator\?s=900%20Clark%20Ave&c=St.%20Louis,MO,63102&type=Delivery/, {
        Stores: [{}]
      });

      const result = await Utilities.findNearbyStores('900 Clark Ave, St. Louis, MO, 63102', 'Delivery');

      expect(result).toBeDefined();
      expect(result.result.Stores.length).toBeGreaterThan(0);
    });

    it('should find nearby stores that carryout', async () => {
      expect.hasAssertions();

      fetchMock.get(/order\.dominos\.com\/power\/store\-locator\?s=900%20Clark%20Ave&c=St.%20Louis,MO,63102&type=Carryout/, {
        Stores: [{}]
      });

      const result = await Utilities.findNearbyStores('900 Clark Ave, St. Louis, MO, 63102', 'Carryout');

      expect(result).toBeDefined();
      expect(result.result.Stores.length).toBeGreaterThan(0);
    });
  });
});
