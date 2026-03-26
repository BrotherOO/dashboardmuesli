const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const src = 'C:\\Users\\ddubi\\.gemini\\antigravity\\brain\\038b5d33-7656-4651-8427-55fa8a47b36d\\media__1774559291593.png';
const dest = path.join(publicDir, 'cart-mockup.png');

try {
  fs.copyFileSync(src, dest);
  console.log('Copied ' + dest);
} catch (e) {
  console.error('Failed to copy to ' + dest, e);
}
