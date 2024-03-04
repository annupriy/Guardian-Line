const puppeteer = require("puppeteer");

// Function to perform TinEye search
async function performTinEyeSearch(imageUrl) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://tineye.com/search");
    await page.waitForSelector('input[type="file"]');

    // Upload image
    const inputUploadHandle = await page.$('input[type="file"]');
    await inputUploadHandle.uploadFile(imageUrl);
    await page.waitForTimeout(5000); // Wait for TinEye to process image

    // Get search results
    const searchResults = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll(".match").forEach((match) => {
        console.log("Match:", match);
        results.push({
          url: match.querySelector(".matchinfo a").href,
          imageUrl: match.querySelector("img").src,
        });
      });
      return results;
    });

    await browser.close();
    return searchResults;
  } catch (error) {
    console.error("Error performing TinEye search:", error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    // Fetch image URL from S3
    const imageUrl = "https://guardianline.s3.eu-north-1.amazonaws.com/guardianline/WhatsApp%20Image%202024-02-17%20at%2001.36.03_1708865642987_1709413153591.jpeg";

    // Perform TinEye search
    const searchResults = await performTinEyeSearch(imageUrl);
    console.log("TinEye Search Results:", searchResults);
  } catch (error) {
    console.error("Error:", error);
  }
})();
