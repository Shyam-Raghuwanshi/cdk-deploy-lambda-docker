import { Hono } from 'hono'
//@ts-ignore
import { generateEmbeddings, ModelTypes, scrapeWebsite, scrapeTextFromUrls } from "@shyambhai/rust-lib";
import { handle } from 'hono/aws-lambda'
const app = new Hono()

app.post('/', async (c) => {
  const body = await c.req.json();
  return c.json({ data: body });
});

app.post('/generateEmbeddings', async (c) => {
  const { text } = await c.req.json();
  const embeddings = generateEmbeddings(text, ModelTypes.AllMiniLML12V2);
  return c.json({ embeddings });
})

app.post("/scrapeWeb", async (c) => {
  const { url } = await c.req.json();
  const urls = await scrapeWebsite(url);
  return c.json({ urls });
});

app.post("/scrapeTextFromUrls", async (c) => {
  const { urls } = await c.req.json();
  const textArr = await scrapeTextFromUrls(urls);
  return c.json(textArr);
});

export const handler = handle(app)