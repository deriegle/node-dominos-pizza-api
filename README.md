Domino's Pizza API
====
This is a node.js API for integrating with the Domino's pizza APIs.
[See the pretty Domino's Pizza API documentation](http://riaevangelist.github.io/node-dominos-pizza-api/)

[![Join the chat at https://gitter.im/RIAEvangelist/node-dominos-pizza-api](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/RIAEvangelist/node-dominos-pizza-api?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

__PAYMENT-SUPPORTED-MODULE__
This module will pass payment information directly from the customer to Domino's Pizza for Domino's Pizza to process.

npm dominos info :  [See npm trends and stats for dominos](http://npm-stat.com/charts.html?package=dominos&author=&from=&to=)  
[![Package Quality](http://npm.packagequality.com/badge/dominos.png)](http://packagequality.com/#?package=dominos)  
![dominos npm version](https://img.shields.io/npm/v/dominos.svg) ![supported node version for dominos api](https://img.shields.io/node/v/dominos.svg) ![total npm downloads for dominos](https://img.shields.io/npm/dt/dominos.svg) ![monthly npm downloads for dominos](https://img.shields.io/npm/dm/dominos.svg) ![npm licence for dominos](https://img.shields.io/npm/l/dominos.svg)

[![RIAEvangelist](https://avatars3.githubusercontent.com/u/369041?v=3&s=100)](https://github.com/RIAEvangelist)

GitHub info :
[![node-dominos-pizza-api GitHub Release](https://img.shields.io/github/release/RIAEvangelist/node-dominos-pizza-api.svg) ![GitHub license node-dominos-pizza-api license](https://img.shields.io/github/license/RIAEvangelist/node-dominos-pizza-api.svg) ![open issues for node-dominos-pizza-api on GitHub](https://img.shields.io/github/issues/RIAEvangelist/node-dominos-pizza-api.svg)](http://riaevangelist.github.io/node-dominos-pizza-api/)

---

Special thanks to : [@madelinecameron](https://github.com/madelinecameron), a major contributor to this repo.

---

This work is licenced via the [DBAD Public Licence](http://www.dbad-license.org/). It is a derivative work from Dominos API.

Install the [Dominos](https://www.npmjs.com/package/dominos) pizza api
====

` npm i dominos ` or ` npm i --save dominos `


Contributing
====

1. Pull or Fork code.
2. from the cloned directory run ` npm install ` (this will install required dependancies, depending on your system may require)
3. be awesome!


Examples
====

You can run the domino's pizza command line interface from your terminal just by running ` npm start `! See the example in the examples directory.

See the examples directory for simple apps and demonstrations on using the basic functionality.


Testing
====

Simply run ` npm test ` OR `yarn test`

---

For Canada
====

Run the script using CANADA=true

For example:

```bash
CANADA=true node index.js
```

Finding Stores
====

|argument|type|default|required|
|--------|----|-------|--------|
|address|full or partial address string|null|true|
|type|Delivery, Carryout, all| all | true|
|callback|function to pass the api result to|null|true|

Note: the 'address' parameter is passed to the Address class. This means any formatting that works for Address will work being passed here. This means you can pass JSON, array or string.

### By Postal Code
***this yields the least accurate information***

```javascript
const { Utilities }  = require('dominos');

const storeData = await Utilities.findNearbyStores('63102');
console.log(storeData);
```

### By City and Postal Code
***this yields less accurate information but is better than just using the postal code***

```javascript
const { Utilities } = require('dominos');

const storeData = await Utilities.findNearbyStores('St. Louis, MO, 63102', 'Carryout');
console.log(storeData);
```

### Using Full or Nearly Full Address
***this yields the best information and sorts stores by actual distance***

```javascript
const { Utilities } = require('dominos'); 

const storeData = await Utilities.findNearbyStores('700 Clark Ave, St. Louis, MO, 63102');
console.log(storeData);
```
---

Store
====

|argument|type|default|required|
|--------|----|-------|--------|
|ID      |Integer|null|true    |

```javascript
//Get Store Info for Store #4336
const { Store } = require('dominos');

const store = new Store();
store.ID = 4336;

const result = await store.getInfo();
console.log(result);
```

### Store menu

|argument|type|default|required|
|--------|----|-------|--------|
|callback|function|null|true   |

```javascript
//Get Menu for Store #4336
const { Store } = require('dominos'); 
const store = new Store({ ID: 4336 });

const result = await myStore.getMenu();
console.log(result);
```

### Store info
|argument|type|default|required|
|--------|----|-------|--------|
|callback|function|null|true   |

```javascript
const { Store } = require('dominos');
const store = new Store({ ID: 4336 });

const result = await store.getInfo();
console.log(result);
```

### Friendly menu list
|argument|type|default|required|
|--------|----|-------|--------|
|callback|function|null|true   |

Returns a list of all items the store offers in an JSON array, formatted {Code: Friendly Name}

```javascript
//Get friendly name menu for Store #4336
const { Store } = require('dominos'); 

const store = new Store({ ID: 4336 });

const result = await store.getFriendlyNames(

if (result.success) {
  console.log(result);
} else {
  console.error(result.message);
}
```

---

Address
====
When creating a new Address object, there are many ways to instantiate the object!

The following are examples of the methods:

#### From string *note the commas*

```javascript

const fullAddress = new Address('900 Clark Ave, St. Louis, MO, 63102');

  //or

const partAddress = new Address('St. Louis, MO, 63102');

  //or

const stateAndZip = new Address('St. Louis, 63102');

//or
const cityAndZip = new Address('St. Louis, 63102');

//only zip
const onlyZip = new Address('63102');
```

#### From JSON

```javascript
const { Address } = require('dominos');

const address = new Address(
  {
    Street: '900 Clark Ave',
    City: 'St. Louis',
    Region: 'MO',
    PostalCode: 63102
  }
);

```

#### From array

```javascript
const address = new Address([
  '900 Clark Ave',
  'St. Louis', 'MO', '63102'
]);
```

---

Customer
===

|argument|type|default|
|--------|----|-------|
|address|Address|null|
|firstName|String|''|
|lastName|String|''|
|email|String|''|
|phone|String|''|

---

```javascript
const { Customer } = require('dominos');

const customer = new Customer(
  {
    address: someAddressObj,
    firstName: 'Barack',
    lastName: 'Obama',
    phone: '1-800-The-White-House',
    email: 'br'
  }
)

```
---

Item
====
You can get the codes from one of the menu requests.

|argument|type|default|
|--------|----|-------|
|code|String|null|
|quantity|Integer|1|
|options|Array|[]|

```javascript
const { Item } = require('dominos');

const item = new Item(
  {
    code: '14SCREEN'
  }
);
```
---

Order
====

This is the class that every other class feeds into.

|argument|type|default|
|--------|----|-------|
|code|String|null|
|quantity|Integer|1|
|options|Array|[]|

### creating an order

```javascript
const { Customer, Order } = require('dominos');

const president = new Customer(
  {
    firstName: 'Barack',
    lastName: 'Obama',
    address: '1600 Pennsylvania Avenue, Washington, DC',
    email: 'barack@whitehouse.gov'
  }
);

const order = new Order(
  {
    customer: president,
    //optional set the store ID right away
    storeID: myStore.ID,
    deliveryMethod: 'Delivery' //(or 'Carryout')
  }
);
```

**OR**

```javascript
const { Order } = require('dominos');

const order = new Order();
order.FirstName = data;
order.LastName = data;
order.Email = data;
order.Phone = data;
order.StoreID = myStore.ID;
```

### duplicating an order

```javascript

  var anotherIdenticalOrder = new pizzapi.Order(
      {
          order:order
          //or
          //Order:order
          //because domino's pizza web API returns pascal case...
      }
  );

  //or create a duplicate order WITH different customer params

  var order = new pizzapi.Order(
      {
          customer: thePresident,
          deliveryMethod: 'Delivery' //(or 'Carryout')
      }
  );

```

### Adding a product to the order :

```javascript
const { Item } = require('dominos');

order.addItem(
  new Item(
    {
      code: '14SCREEN',
      options: [],
      quantity: 1
    }
  )
);

```

### Validating an Order
This step is **Strongly** recommended

```javascript
const result = await order.validate();
console.log(result);
```

### Price an Order

```javascript
const result = await order.price();
console.log(result);
```

### Place an Order
At least one item must've been added to place an order.

#### with payment allowed
You don't have to do anything for the payment, Domino's Pizza will handle all transactions.

```javascript
const dominos = require('dominos');

const cardNumber = '4100123422343234';

const main = async () => {
  order.addPaymentInformation({
    amount: order.Amounts.Customer,
    cardNumber: cardNumber,
    expiration: '0115', // 01/15 just the numbers "01/15".replace(/\D/g, '');
    securityCode: '777', 
    postalCode: '90210', // Billing Zipcode
  });

  await order.place();

  console.log('Order placed!');
};
```

---

Tracking
====

### By Phone

|argument|type|default|required|
|--------|----|-------|--------|
|phone|Phone number string or int|null|true|
|callback|function to pass the api result to|null|true|

```javascript
const dominos = require('dominos'); 

const main = async () => {
  const result = await dominos.Track.byPhone(2024561111);

  if (result.success) {
    console.log(result);
  } else {
    console.error(result.message);
  }
}
```

### By orderKey

|argument|type|default|required|
|--------|----|-------|--------|
|orderKey|string or int|null|true|
|storeID|sting or int|null|true|
|callback|function to pass the api result to|null|true|

```javascript
  const dominos = require('dominos'); 

  const main = async () => {
    const result = await dominos.Track.byId(123456, 12345);

    if (result.success) {
      console.log(result);
    } else {
      console.error(result.message);
    }
  }

```

Code, Order, Eat, Be Happy!
