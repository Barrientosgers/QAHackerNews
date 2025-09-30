const { chromium } = require("playwright");

(async () => {
  try {
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.goto("https://example.com");
    console.log("✅ Page title is:", await page.title());
    await browser.close();
  } catch (err) {
    console.error("❌ Chromium test failed:", err);
  }
})();