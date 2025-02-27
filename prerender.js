const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/about',
  '/contact',
  '/quiz',
  '/quiz/odisha-special/odisha-smallest-gk-quiz-mcq-set1',
  '/quiz/odisha-special/odisha-first-gk-set1'
]; // Add your routes here

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  for (const route of routes) {
    await page.goto(`https://miku691.github.io/ixoquiz${route}`, { waitUntil: 'networkidle0' });
    const content = await page.content();
    const filePath = path.join(__dirname, 'dist', route === '/' ? 'index.html' : `${route}.html`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }
  
  await browser.close();
})();
