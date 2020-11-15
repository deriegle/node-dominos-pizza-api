const Customer = require('../Customer');

describe('Customer', () => {
  it('should be created', () => {
    const customerParams = {
      firstName: "Barack",
      lastName: "Obama",
      email: "barack@whitehouse.gov",
      address: "The White House",  //Address object can be passed as well, this functionality is tested in order_test.
      phone: "Secret"
    };

    const newCustomer = new Customer(customerParams);

    expect(newCustomer).not.toBeNull();
    expect(newCustomer.firstName).toBe("Barack");
    expect(newCustomer.lastName).toBe("Obama");
    expect(newCustomer.email).toBe("barack@whitehouse.gov");
    expect(newCustomer.address).toBe("The White House");
    expect(newCustomer.phone).toBe("Secret");
  })
});

