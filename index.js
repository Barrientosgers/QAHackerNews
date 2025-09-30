// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: true }); //changed it true because I use MacOS, and Playwright and Chromium GUI has issues
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  await page.waitForLoadState("domcontentloaded");
  // wait for page to load
  await page.waitForSelector(".age");

  // timestaps from the "age" elements
  const timestamps = await page.$$eval(".age", (elements) => {
    return elements.map((el) => {
      // Hacker News uses title attribute for exact time
      const raw = el.getAttribute("title");
    });  
  });

  // take first 100
  const first100 = timestamps.slice(0, 100);

  // check count
  if (first100.length != 100) {
    console.error(`Expected 100 articles, but found ${first100.length}`);
    await browser.close();
    return;
  }

  // validate newest to olderst
  const isSorted = first100.every((time, i) => i === 0 || time <= first100[i - 1]);

  if (!isSorted) {
    console.error("Articles are not sorted from newest to oldest");
  } else {
    console.log("Exactly 100 articles sorted from newest to oldest");
  }

  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
