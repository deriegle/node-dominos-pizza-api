const Address = require('../Address');

describe('Address', () => {
  it('should create Address object from JSON', () => {
    const json = {
      Street: "123 Easy Street",
      City: "St. Louis",
      Region: "MO",
      PostalCode: "63105",
      Type: "House"
    };

    const address = new Address(json);

    expect(address).not.toBeNull();
    expect(address.Street).toBe(json.Street);
    expect(address.City).toBe(json.City);
    expect(address.Region).toBe(json.Region);
  });

  it('should create Address object from string', () => {
    const address = new Address("123 Easy Street, St. Louis, MO, 63105");

    expect(address).not.toBeNull();
    expect(address.Street).toBe("123 Easy Street");
    expect(address.City).toBe("St. Louis");
    expect(address.Region).toBe("MO");
    expect(address.PostalCode).toBe("63105");
  })

  it('should return full address to pass to findNearbyStores', () => {
    var address = new Address("123 Easy Street, St.Louis, MO, 63105");
    var addressLines = address.getAddressLines();

    expect(addressLines).toHaveLength(2);
    expect(addressLines[0]).toBe("123 Easy Street");
    expect(addressLines[1].trim()).toBe(address.City + "," + address.Region + "," + address.PostalCode);
  });

  it('should return zip code to pass to findNearbyStores', () => {
    var address = new Address("63105");
    var addressLines = address.getAddressLines();

    expect(addressLines).toHaveLength(2);
    expect(addressLines[0]).toBe('');
    expect(addressLines[1]).toBe(address.PostalCode);
  })

  it('should return city, state, zip to pass to findNearbyStores', () => {
    var address = new Address("St. Louis, MO, 63105");
    var addressLines = address.getAddressLines();

    expect(addressLines).toHaveLength(2);
    expect(addressLines[0]).toBe('');
    expect(addressLines[1]).toBe(address.City + "," + address.Region + "," + address.PostalCode);
  });

  it('should create Address object from array', () => {
    var address = new Address(["123 Easy Street", "St. Louis", "MO", "63105"]);
    expect(address).not.toBeNull();
    expect(address.Street).toBe("123 Easy Street");
    expect(address.City).toBe("St. Louis");
    expect(address.Region).toBe("MO");
    expect(address.PostalCode).toBe("63105");
  })
});
