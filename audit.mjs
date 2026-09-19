import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
function getFiles(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) getFiles(full, files);
    else if (full.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = getFiles(dist);
const results = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
  const canonMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const schemas = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];

  results.push({
    file: path.relative(dist, file).replace(/\\/g, '/'),
    title: titleMatch ? titleMatch[1] : 'MISSING',
    titleLen: titleMatch ? titleMatch[1].length : 0,
    descLen: descMatch ? descMatch[1].length : 0,
    h1Count: h1Matches.length,
    h1: h1Matches.length > 0 ? h1Matches[0].replace(/<[^>]+>/g, '').trim() : 'MISSING',
    canonical: canonMatch ? canonMatch[1] : 'MISSING',
    schemaCount: schemas.length
  });
}

console.log('=== SEO AUDIT SUMMARY ===');
console.log(`Total Pages: ${results.length}`);
console.table(results);

// Check Sitemap
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf-8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`\n=== SITEMAP VERIFICATION ===`);
console.log(`Sitemap URLs Count: ${sitemapUrls.length}`);

const canonicals = results.map(r => r.canonical);
const missingInSitemap = canonicals.filter(c => !sitemapUrls.includes(c));
const sitemapMismatch = sitemapUrls.filter(u => !canonicals.includes(u));

console.log(`Canonicals missing in sitemap: ${missingInSitemap.length}`);
console.log(`Sitemap URLs missing on disk: ${sitemapMismatch.length}`);

// Check Robots.txt
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf-8');
console.log(`\n=== ROBOTS.TXT CHECK ===\n${robots}`);
