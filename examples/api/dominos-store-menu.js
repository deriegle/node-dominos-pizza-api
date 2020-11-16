const { Store } = require('../../index');

function printCategory(category,depth) {
  if (!depth) depth = 0;

  const indent = Array(depth+1).join("  ");

  console.log(indent+category.getName());

  for (var subIndex in category.getSubcategories()) {
      printCategory(category.getSubcategories()[subIndex],depth+1);
  }

  category.getProducts().forEach(function(product) {
      console.log(indent+"  ["+product.getCode()+"] "+product.getName());
  });
}

async function main() {
  const store = new Store({ ID: 9760 });

  const menu = await store.getMenu();

  console.log("************ Coupon Menu ************");
  printCategory(menu.getCouponCategory(),1);
  console.log("\n\n************ Preconfigured Menu ************");
  printCategory(menu.getPreconfiguredCategory(),1);
  console.log("\n\n************ Regular Menu ************");
  printCategory(menu.getFoodCategory(),1);
}

main();
