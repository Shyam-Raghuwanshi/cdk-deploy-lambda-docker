// @ts-nocheck
import { scrapeWebsite, scrapeTextFromUrls } from "@shyamraghuonec/rust-lib";
export const handler = async (event) => {
  console.log("Full Event:", JSON.stringify(event, null, 2));
  
  try {
    console.log("Attempting to scrape website");
    const scrapeResult = await Promise.race([
      // scrapeWebsite("https://hono.dev"),
      scrapeTextFromUrls(["https://hono.dev"]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Scrape timeout")), 2000)
      ),
    ]);

    console.log("Scrape Result:", scrapeResult);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: scrapeResult }),
    };
  } catch (error: any) {
    console.error("Scraping Error:", {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
