class Item {
  constructor(parameters) {
    if (!parameters) {
      parameters = {};
    }

    this.AutoRemove=false;

    this.Code = parameters.code || null;
    this.Qty = parameters.quantity || 1;
    this.ID = 1;
    
    this.isNew = true;
    this.Options = {
      'C': {'1/1': '1'},
      'X': {'1/1': '1'},
    };

    if (parameters.options) {
      Object.values(parameters.options).forEach((value) => {
        this.Options[value] = { '1/1': '1' };
      });
    }
  }
}

module.exports = Item;
