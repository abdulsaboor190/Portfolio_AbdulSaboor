#!/usr/bin/env node
// Link & media audit for the portfolio.
//   node scripts/check-links.mjs
// Internal routes and local media are ERRORS (exit 1). External URL failures
// are WARNINGS (reported, never fail the build — they can be transient).

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const CONTENT_DIR = join(ROOT, "content", "projects");
const CONTENT_ROOT = join(ROOT, "..", "content");

const failures = []; // { file, kind: "internal"|"media"|"external", target, detail }
const warnings = [];

function add(file, kind, target, detail) {
  (kind === "external" ? warnings : failures).push({ file, kind, target, detail });
}

// ---------- known internal routes ----------
const slugSet = new Set();
// Drafts (_-prefixed) are dev-only templates excluded from production
// builds — their example paths are illustrative, so skip them here too.
const projectFiles = readdirSync(CONTENT_DIR).filter(
  (f) => f.endsWith(".mdx") && !f.startsWith("_"),
);
for (const f of projectFiles) {
  const { data } = matter(readFileSync(join(CONTENT_DIR, f), "utf8"));
  if (data.slug) slugSet.add(data.slug);
}

const STATIC_ROUTES = new Set(["/", "/projects", "/tokens-preview", "/resume.pdf"]);

function checkInternal(file, href) {
  const path = href.split("#")[0].split("?")[0];
  if (!path || path === "/") return;
  if (path.startsWith("/media/")) {
    const fp = join(PUBLIC_DIR, path);
    if (!existsSync(fp)) add(file, "media", href, "file not found in public/");
    return;
  }
  if (path.startsWith("/projects/")) {
    const slug = path.slice("/projects/".length);
    if (!slugSet.has(slug)) add(file, "internal", href, "no project with this slug");
    return;
  }
  if (STATIC_ROUTES.has(path)) return;
  // anything else under app/ — check the route exists as a page file
  const rel = path.replace(/^\//, "");
  const candidates = [
    join(ROOT, "app", rel, "page.tsx"),
    join(ROOT, "app", rel, "page.ts"),
    join(ROOT, "app", `${rel}.tsx`),
  ];
  if (!candidates.some(existsSync)) {
    add(file, "internal", href, "no matching app route");
  }
}

// ---------- collectors ----------
const LINK_RE = /(?:href|src)="([^"]+)"/g;
const MDX_LINK_RE = /\]\(([^)\s]+)\)|<a [^>]*href="([^"]+)"/g;
const EXTERNAL_RE = /https?:\/\/[^\s"'<>)\]]+/g;

function scanText(file, text) {
  for (const m of text.matchAll(LINK_RE)) checkTarget(file, m[1]);
  for (const m of text.matchAll(MDX_LINK_RE)) {
    const target = m[1] ?? m[2];
    if (target) checkTarget(file, target);
  }
  // bare external URLs in prose (e.g. https://github.com/...)
  // skip template literals — ${...} placeholders aren't real URLs
  const masked = text.replace(/https?:\/\/[^\s"'<>)\]`]*\$\{[^}]*\}[^\s"'<>)\]`]*/g, " ");
  for (const m of masked.matchAll(EXTERNAL_RE)) {
    const url = m[0].replace(/[.,;:!?]+$/, "");
    if (!seen.has(url)) {
      seen.add(url);
      externalUrls.push({ file, url });
    }
  }
}

const seen = new Set();
const externalUrls = [];

function checkTarget(file, target) {
  if (!target || target.startsWith("#") || target.startsWith("mailto:")) return;
  if (target.startsWith("http")) {
    const url = target.replace(/[.,;:!?]+$/, "");
    if (!seen.has(url)) {
      seen.add(url);
      externalUrls.push({ file, url });
    }
    return;
  }
  if (target.startsWith("/")) checkInternal(file, target);
}

// 1. Project MDX files (frontmatter values that look like paths/URLs + body)
for (const f of projectFiles) {
  const raw = readFileSync(join(CONTENT_DIR, f), "utf8");
  const file = `content/projects/${f}`;
  const { data, content } = matter(raw);
  // frontmatter string fields that may hold paths or URLs
  const fmText = JSON.stringify(data);
  for (const m of fmText.matchAll(/"(\/[^"\\]*|https?:\/\/[^"\\]+)"/g)) {
    checkTarget(file, m[1]);
  }
  // strip MDX comments — TODO placeholders inside them aren't live refs
  const live = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  scanText(file, live);
}

// 2. Site config (env defaults + hardcoded URLs)
const siteConfig = readFileSync(join(ROOT, "lib", "site-config.ts"), "utf8");
scanText("lib/site-config.ts", siteConfig);

// 3. Personal facts + copy docs
for (const rel of [
  join(CONTENT_ROOT, "personal-facts.md"),
  join(CONTENT_ROOT, "copy.md"),
]) {
  if (existsSync(rel)) {
    scanText(rel.replace(ROOT + "/..", "..").replace(/\\/g, "/"), readFileSync(rel, "utf8"));
  }
}

// 4. Source files: scan tsx/ts for href/src literals and next/image paths
function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory() && !["node_modules", ".next"].includes(e.name)) out.push(...walk(p));
    else if (/\.(tsx?|mdx)$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of walk(join(ROOT, "app")).concat(walk(join(ROOT, "components")))) {
  const rel = f.replace(ROOT + "/", "").replace(/\\/g, "/");
  // strip comments so doc examples don't count as live references
  const src = readFileSync(f, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  scanText(rel, src);
}

// ---------- external URL checks (warnings only) ----------
async function checkExternal(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 10000);
      let res = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "user-agent": "portfolio-link-audit/1.0" },
      });
      clearTimeout(t);
      if (res.status === 405 || res.status === 501) {
        const ctrl2 = new AbortController();
        const t2 = setTimeout(() => ctrl2.abort(), 10000);
        res = await fetch(url, {
          method: "GET",
          redirect: "follow",
          signal: ctrl2.signal,
          headers: { "user-agent": "portfolio-link-audit/1.0" },
        });
        clearTimeout(t2);
      }
      if (res.status < 400) return null;
      return `HTTP ${res.status}`;
    } catch (err) {
      if (attempt === 3) return err.name === "AbortError" ? "timeout" : String(err.message ?? err);
    }
  }
  return "unreachable";
}

// ---------- run ----------
console.log("Checking internal routes and local media...\n");

const byFile = new Map();
for (const f of failures) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}

if (failures.length === 0) {
  console.log("  No internal/media failures.\n");
} else {
  for (const [file, items] of byFile) {
    console.log(`  ${file}`);
    for (const it of items) console.log(`    [${it.kind}] ${it.target} — ${it.detail}`);
  }
  console.log("");
}

console.log(`Checking ${externalUrls.length} external URLs (warnings only)...\n`);
for (const { file, url } of externalUrls) {
  const err = await checkExternal(url);
  if (err) {
    warnings.push({ file, kind: "external", target: url, detail: err });
    console.log(`  WARN  ${url} — ${err}  (${file})`);
  }
}
if (warnings.length === 0) console.log("  All external URLs OK.\n");
else console.log("");

console.log(`Summary: ${failures.length} error(s), ${warnings.length} warning(s)`);
process.exit(failures.length ? 1 : 0);
