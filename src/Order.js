const urls = require('./urls');
const httpJson = require('./http-json');
const PaymentObject = require('./PaymentObject');

class Order {
  constructor(parameters = {}) {
    //default order
    this.Address = '';
    this.Coupons = [];
    this.CustomerID = '';
    this.Email = '';
    this.Extension = '';
    this.FirstName = '';
    this.LastName = '';
    this.LanguageCode = 'en';
    this.OrderChannel = 'OLO';
    this.OrderID = '';
    this.OrderMethod = 'Web';
    this.OrderTaker = null;
    this.Payments = [];
    this.Phone = '';
    this.Products = [];
    this.Market = '';
    this.Currency = '';
    this.ServiceMethod = parameters.deliveryMethod || 'Delivery';
    this.SourceOrganizationURI = urls.sourceUri;
    this.StoreID = parameters.storeID||'';
    this.Tags = {};
    this.Version = '1.0';
    this.NoCombine = true;
    this.Partners = {};
    this.NewUser = true;
    this.metaData = {};
    this.Amounts = {};
    this.BusinessDate = '';
    this.EstimatedWaitMinutes = '';
    this.PriceOrderTime = '';
    this.AmountsBreakdown;

    if (parameters.customer) {
      const Customer = parameters.customer;

      this.Address = Customer.address;
      this.CustomerID = Customer.ID;
      this.Email = Customer.email;
      this.FirstName = Customer.firstName;
      this.LastName = Customer.lastName;
      this.Phone = Customer.phone;

      return this;
    }

    if (parameters.Order || parameters.order) { 
      //Used to initialize order object from Dominos results (Also handy for initializing from DB)
      const previousOrder = parameters.Order;
      const Customer = parameters.customer;

      this.Address = getField(Customer, previousOrder, 'address', 'Address');
      this.CustomerID = getField(Customer, previousOrder, 'ID', 'CustomerID');
      this.Email = getField(Customer, previousOrder, 'email', 'Email');
      this.FirstName = getField(Customer, previousOrder, 'firstName', 'FirstName');
      this.LastName = getField(Customer, previousOrder, 'lastName', 'LastName');

      this.OrderID = previousOrder.OrderID;
      this.Products = previousOrder.Products;
      this.Market = previousOrder.Market;
      this.Currency = previousOrder.Currency;
      this.StoreID = previousOrder.StoreID;
      this.Amounts = previousOrder.Amounts || {};
      this.BusinessDate = previousOrder.BusinessDate || '';
      this.EstimatedWaitMinutes = previousOrder.EstimatedWaitMinutes || '';
      this.PriceOrderTime = previousOrder.PriceOrderTime || '';
      this.AmountsBreakdown = previousOrder.AmountsBreakdown || {};

      return this;
    }
  }

  addCoupon(Coupon) {
    this.Coupons.push(Coupon)
  }

  removeCoupon(Coupon) {
    const index = this.Coupons.indexOf(Coupon);

    if (index !== -1) {
      this.Coupons.splice(index, 1);
    }
  }

  // Add product to Order
  addItem(product) {
    this.Products.push(product)
  }

  // Remove product from Order 
  removeItem(item) {
    const index = this.Products.indexOf(item);

    if(index !== -1) {
      this.Products.splice(index, 1);
    }
  }

  async validate() {
    if(!this.Products) {
      return {
        success: false,
        message: 'At least one Item must be added!'
      };
    }

    //Blame Dominos, this isn't my doing.
    const stringified = JSON.stringify({
      'Order' : this
    });

    const response = await httpJson.post(urls.order.validate, stringified);
    return this._mergeResponse(response);
  }

  async price() {
    if(!this.Products) {
      return {
        success: false,
        message: 'At least one Item must be added!'
      };
    }

    const stringified = JSON.stringify({
      'Order' : this
    });

    const response = await httpJson.post(urls.order.price, stringified);
    return this._mergeResponse(response);
  }

  async place() {
    if(!this.Products) {
      return {
        success: false,
        message: 'At least one product must be added!'
      };
    }

    const stringified = JSON.stringify({
      'Order' : this
    });

    return httpJson.post(urls.order.place, stringified);
  }

  _mergeResponse(response) {
    for(var key in response.result.Order){
      if (Array.isArray(response.result.Order[key]) && !response.result.Order[key].length) {
        continue;
      }

      this[key] = response.result.Order[key];
    }

    return response;
  }

  addPaymentInformation({
    amount,
    cardNumber,
    expiration,
    securityCode,
    postalCode
  } = {}) {
    const paymentObject = new PaymentObject();

    paymentObject.Amount = amount || 0;
    paymentObject.Number = cardNumber || "";
    paymentObject.Expiration = expiration || "";
    paymentObject.SecurityCode = securityCode || "";
    paymentObject.PostalCode = postalCode || "";

    this.Payments.push(paymentObject);
  }
}

const getField = (customer, previousOrder, customerKey, orderKey) => {
  if (customer)  {
    return customer[customerKey]
      ? customer[customerKey]
      : previousOrder[orderKey];
  }

  return previousOrder[orderKey];
}


module.exports = Order;
