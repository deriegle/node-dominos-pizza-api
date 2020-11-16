const Coupon = require('../Coupon');

describe('Coupon', () => {
  it('has the correct values', () => {
    const coupon = new Coupon({code: '1234'});

    expect(coupon.Code).toBe('1234');
    expect(coupon.Qty).toBe(1);
    expect(coupon.ID).toBe(1);
    expect(coupon.isNew).toBe(true);
  });

  it('sets the custom quantity when given', () => {
    const coupon = new Coupon({code: '1234', quantity: 2});

    expect(coupon.Code).toBe('1234');
    expect(coupon.Qty).toBe(2);
    expect(coupon.ID).toBe(1);
    expect(coupon.isNew).toBe(true);
  });
});
