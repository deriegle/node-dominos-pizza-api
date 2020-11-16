const PaymentObject = require('../PaymentObject');

describe('PaymentObject', () => {
  it('works', () => {
    const payment = new PaymentObject();
    expect(payment.Amount).toBe(0);
    expect(payment.Number).toBe("");
    expect(payment.CardType).toBe("");
    expect(payment.Expiration).toBe("");
    expect(payment.SecurityCode).toBe("");
    expect(payment.PostalCode).toBe("");
    expect(payment.Type).toBe('CreditCard');
  });

  describe('CardType', () => {
    it('works for Visa cards', () => {
      const payment = new PaymentObject();

      payment.Number = 4100123422343234;

      expect(payment.CardType).toBe('VISA');
    });

    it('works for Mastercard cards', () => {
      const payment = new PaymentObject();

      payment.Number = 5199999999999999;

      expect(payment.CardType).toBe('MASTERCARD');
    });

    it('works for American Express cards', () => {
      const payment = new PaymentObject();

      payment.Number = 347029399398971;

      expect(payment.CardType).toBe('AMEX');
    });

    it('works for Diners cards', () => {
      const payment = new PaymentObject();

      payment.Number = 30500000000000;

      expect(payment.CardType).toBe('DINERS');
    });

    it('works for Discover cards', () => {
      const payment = new PaymentObject();

      payment.Number = 6011990000000000;

      expect(payment.CardType).toBe('DISCOVER');
    });

    it('works for JCB cards', () => {
      const payment = new PaymentObject();

      payment.Number = 213199909393939;

      expect(payment.CardType).toBe('JCB');
    });

    it('works for second type of JCB cards', () => {
      const payment = new PaymentObject();

      payment.Number = 201492929293933;

      expect(payment.CardType).toBe('JCB');
    });
  });
});
