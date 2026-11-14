import React from "react";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";
import { renderToString } from "react-dom/server";

const root = process.cwd();
const vite = await createServer({
  configFile: resolve(root, "vite.config.js"),
  server: { middlewareMode: true },
  appType: "custom"
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
  const markup = renderToString(React.createElement(App));
  const output = resolve(root, "dist/index.html");
  const html = await readFile(output, "utf8");

  if (!html.includes("<!--app-html-->")) {
    throw new Error("Prerender mount marker is missing from dist/index.html");
  }

  await writeFile(output, html.replace("<!--app-html-->", markup), "utf8");
  console.log("Prerendered portfolio content into dist/index.html");
} finally {
  await vite.close();
}
