const { Store } = require('../../index');

async function main() {
  const store = new Store({ ID: '9760' });

  const storeData = await store.getInfo();

  console.log(storeData);
}

main();
