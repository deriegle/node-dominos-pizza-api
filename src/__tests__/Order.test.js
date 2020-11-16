const Order = require('../Order');
const Item = require('../Item');
const Coupon = require('../Coupon');

describe('Order', () => {
  describe('addCoupon', () => {
    it('adds a new coupon', () => {
      const order = new Order();

      expect(order.Coupons).toHaveLength(0);

      order.addCoupon(new Coupon({ code: '1234' }));

      expect(order.Coupons).toHaveLength(1);
    });
  });

  describe('removeCoupon', () => {
    it('removes an existing coupon', () => {
      const order = new Order();
      const coupon = new Coupon({ code: '1234' });

      order.addCoupon(coupon);
      expect(order.Coupons).toHaveLength(1);

      order.removeCoupon(coupon);
      expect(order.Coupons).toHaveLength(0);
    });
  });

  describe('addItem', () => {
    it('adds a new item', () => {
      const order = new Order();

      expect(order.Products).toHaveLength(0);

      const twoLargePizzas = new Item({ code: 'L_PIZZA', quantity: 2 })

      order.addItem(twoLargePizzas);

      expect(order.Products).toHaveLength(1);
    });
  });

  describe('removeItem', () => {
    it('removes an item', () => {
      const order = new Order();
      const twoLargePizzas = new Item({ code: 'L_PIZZA', quantity: 2 })

      order.addItem(twoLargePizzas);

      expect(order.Products).toHaveLength(1);

      order.removeItem(twoLargePizzas);

      expect(order.Products).toHaveLength(0);
    });
  });

  describe('validate', () => {
  });

  describe('price', () => {
  });

  describe('place', () => {
  });

  describe('addPaymentInformation', () => {
    it('adds a new payment object', () => {
      const order = new Order();

      expect(order.Payments).toHaveLength(0);

      order.addPaymentInformation();

      expect(order.Payments).toHaveLength(1);
    });
  });
});
