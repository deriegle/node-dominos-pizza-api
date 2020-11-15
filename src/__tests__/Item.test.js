const Item = require('../Item');

describe('Item', () => {
  it('should create base item', () => {
    const newItem = new Item({
      code: 'Some code',
    });

    expect(newItem.Code).toBe('Some code');
    expect(newItem.Qty).toBe(1);
    expect(newItem.Options).toEqual({
      'C': {'1/1': '1'},
      'X': {'1/1': '1'},
    });
  });

  it('should create item with quantity 1', () => {
    const newItem = new Item({
      code: 'Some code',
      quantity: 1
    });

    expect(newItem.Code).toBe('Some code');
    expect(newItem.Qty).toBe(1);
    expect(newItem.Options).toEqual({
      'C': {'1/1': '1'},
      'X': {'1/1': '1'},
    });
  });

  it('should create item with one option', () => {
    const newItem = new Item({
      code: 'Some code',
      quantity: 1,
      options: ['P']
    });

    expect(newItem.Code).toBe('Some code');
    expect(newItem.Qty).toBe(1);
    expect(newItem.Options).toHaveProperty('P');
  });

  it('should create item with multiple options', () => {
    const newItem = new Item({
      code: 'Some code',
      quantity: 1,
      options: ['P', 'S']
    });

    expect(newItem.Code).toBe('Some code');
    expect(newItem.Qty).toBe(1);
    expect(newItem.Options).toHaveProperty('P');
    expect(newItem.Options).toHaveProperty('S');
  });
})
