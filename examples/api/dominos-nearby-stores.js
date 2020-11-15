const { Utilities } = require('../../index');

//Get stores by postal code, distance is not as accurate this way
Utilities.findNearbyStores('43202', 'all').then((result) => {
  console.log('\n\n##################\nNearby Stores\n##################\n\n');
  console.log(result.result.Stores);
})
.catch((err) => {
  console.log(err);
});
