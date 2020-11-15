class PaymentObject {
  constructor() {
    this.Amount = 0;
    this.Number = "";
    this.CardType = "";
    this.Expiration = "";
    this.SecurityCode = '';
    this.PostalCode = '';
  }

  get CardType() {
    if (!this.Number) { return ''; }

    const creditCard = CREDIT_CARD_REGEX.find(({ regexp }) => {
      return !!regexp.test(this.Number);
    });

    return creditCard ? creditCard.type : '';
  }

  get Type() {
    return 'CreditCard';
  }
}

const CREDIT_CARD_REGEX = [
  {
    type: 'VISA',
    regexp: /^4[0-9]{12}(?:[0-9]{3})?$/
  },
  {
    type: 'MASTERCARD',
    regexp: /^5[1-5][0-9]{14}$/,
  },
  {
    type: 'AMEX',
    regexp: /^3[47][0-9]{13}$/,
  },
  {
    type: 'DINERS',
    regexp: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  },
  {
    type: 'DISCOVER',
    regexp: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  },
  {
    type: 'JCB',
    regexp: /^(?:2131|1800|35\d{3})\d{11}$/,
  },
  {
    type: 'JCB',
    regexp: /^(?:2014|2149)\d{11}$/
  },
];

module.exports = PaymentObject;
