// Renders the app to static HTML after `vite build`, so crawlers,
// link previews and visitors without JavaScript see the real content.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await readFile(path.join(dist, "index.html"), "utf8");
const html = render();

if (!template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing the <!--app-html--> placeholder");
}

await writeFile(path.join(dist, "index.html"), template.replace("<!--app-html-->", html));
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered index.html (${(html.length / 1024).toFixed(1)} kB of markup)`);
