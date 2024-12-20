// @ts-nocheck

// export const handler = async (event) => {
//   console.log("Full Event:", JSON.stringify(event, null, 2));
//   try {
//     console.log("Attempting to scrape website");
//     const scrapeResult = await Promise.race([
//       await generateEmbeddings(["hi"], ModelTypes.AllMiniLML12V2),
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error("Scrape timeout")), 2000)
//       ),
//     ]);

//     console.log("Scrape Result:", scrapeResult);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ data: scrapeResult }),
//     };
//   } catch (error: any) {
//     console.error("Scraping Error:", {
//       errorName: error.name,
//       errorMessage: error.message,
//       errorStack: error.stack,
//     });

//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.toString() }),
//     };
//   }
// };

import { Hono } from 'hono'
import { generateEmbeddings, ModelTypes, scrapeWebsite, scrapeTextFromUrls, scrapeTextFromUrlPlaywright } from "@shyamraghuonec/rust-lib";
import { handle } from 'hono/aws-lambda'
const app = new Hono()

app.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ data: body });
});

// app.get('/', (c) => {
//   return c.json({ message: 'Hello World!' })
// })


app.post('/generateEmbeddings', async (c) => {
  const { text } = await c.req.json();
  const embeddings = generateEmbeddings(text, ModelTypes.AllMiniLML12V2);
  return c.json({ embeddings });
})

app.post('/scrapeTextFromUrlPlaywright', async (c) => {
  const { url } = await c.req.json();
  const text = await scrapeTextFromUrlPlaywright(url)
  return c.json({ text });
});

app.post("/scrapeWeb", async (c) => {
  const { url } = await c.req.json();
  const urls = await scrapeWebsite(url);
  return c.json({ urls });
});

app.post("/scrapeTextFromUrls", async (c) => {
  const { urls } = await c.req.json();
  const textArr = await scrapeTextFromUrls(urls);
  return c.text(JSON.stringify(textArr));
});

export const handler = handle(app)