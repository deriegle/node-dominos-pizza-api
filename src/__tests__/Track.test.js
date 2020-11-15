const Track = require('../Track');
const fetchMock = require('fetch-mock');

const storeId = 8386;
const orderKey = '1234';

const mockResponse = `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope/" soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding">
  <soap:Body>
    <GetTrackerDataResponse>
      <OrderStatuses />
      <OrderStatuses />
      <Query OrderKey="1234" />
    </GetTrackerDataResponse>
  </soap:Body>
</soap:Envelope>
`;

describe('Track', () => {
  describe('byId', () => {
    beforeEach(() => {
      fetchMock.get(/trkweb\.dominos\.com\/orderstorage\/GetTrackerData\?StoreID=8386&OrderKey=1234/, mockResponse);
    });

    it('works when given storeId and orderKey', async () => {
      await expect(Track.byId(storeId, orderKey)).resolves.toEqual(expect.objectContaining({
        success: true,
        orders: expect.any(Array),
        query: expect.any(Object),
      }));
    });

    it('does not work when not given orderKey', async () => {
      await expect(Track.byId(storeId)).resolves.toEqual(expect.objectContaining({
        success: false,
        message: 'StoreID and orderKey are required!',
      }));
    });

    it('does not work when not given storeId', async () => {
      await expect(Track.byId(undefined, orderKey)).resolves.toEqual(expect.objectContaining({
        success: false,
        message: 'StoreID and orderKey are required!',
      }));
    });

    it('does not work when not given storeId or orderKey', async () => {
      await expect(Track.byId()).resolves.toEqual(expect.objectContaining({
        success: false,
        message: 'StoreID and orderKey are required!',
      }));
    });
  });

  describe('byPhone', () => {
    beforeEach(() => {
      fetchMock.get(/trkweb\.dominos\.com\/orderstorage\/GetTrackerData\?Phone=6145558888/, mockResponse);
    });

    it('works when given phone', async () => {
      await expect(Track.byPhone(6145558888)).resolves.toEqual(expect.objectContaining({
        success: true,
        orders: expect.any(Array),
        query: expect.any(Object),
      }));
    });

    it('does not work when not given phone', async () => {
      await expect(Track.byPhone()).resolves.toEqual(expect.objectContaining({
        success: false,
        message: 'Phone is required!',
      }));
    });
  });
});
