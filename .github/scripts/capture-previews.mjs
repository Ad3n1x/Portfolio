import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const targets = [
  { name: 'adverse', url: 'https://adverse-web.onrender.com/' },
  { name: 'unitrack', url: 'https://unitrack-app.vercel.app/' },
  { name: 'quickcart', url: 'https://quick-cart-three-chi.vercel.app/' }
];

await mkdir('multimedia/previews', { recursive: true });
const browser = await chromium.launch({ headless: true });
let captured = 0;
try {
  for (const target of targets) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    try {
      const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      if (!response || !response.ok()) throw new Error('HTTP ' + (response?.status() ?? 'no response'));
      await page.waitForTimeout(7000);
      await page.screenshot({ path: 'multimedia/previews/' + target.name + '.png', type: 'png', fullPage: false, animations: 'disabled' });
      captured++;
      console.log('Captured ' + target.name + ' (' + response.status() + ')');
    } catch (error) {
      console.error('Could not capture ' + target.name + ': ' + error.message);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
if (!captured) throw new Error('No project previews could be captured; existing previews were not intentionally replaced.');
console.log('Captured ' + captured + ' of ' + targets.length + ' live project previews.');