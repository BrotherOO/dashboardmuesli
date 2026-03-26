const fs = require('fs');
try {
  fs.copyFileSync('C:\\Users\\ddubi\\.gemini\\antigravity\\brain\\038b5d33-7656-4651-8427-55fa8a47b36d\\media__1774558729396.png', './public/cart-mockup.png');
  console.log('Success');
} catch(e) {
  console.error(e);
}
