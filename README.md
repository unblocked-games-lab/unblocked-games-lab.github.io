# Unblocked Games Lab 🎮

> **Ultra-Fast, Zero-Runtime-Framework Unblocked Games Portal**  
> Live URL: [https://unblocked-games-lab.github.io/](https://unblocked-games-lab.github.io/)

---

## ⚡ Key Highlights & Architecture

- **0kb JS Runtime / Zero Framework**: No React, Vue, or Angular bundle overhead. Pure HTML5 + modern CSS + minimal (< 3KB) vanilla JS.
- **Chromebook Optimized**: Instant First Contentful Paint (FCP < 0.05s) and constant 60 FPS iframe execution on school-issued dual-core Celeron & MediaTek laptops.
- **Form C ("合二为一") Architecture**:
  - **Homepage**: Hero game (*Funny Shooter 2*) playable directly on landing, surrounded by related game thumbnails, category pills, pro tips, and structured FAQ schema.
  - **Individual Landing Pages**: Dedicated SEO landing pages (`/games/retro-bowl/`, `/games/slope/`, `/games/tag/`, etc.) targeting individual high-intent long-tail keywords ("一词一页").
  - **Categories**: Dedicated pages for `/category/shooting/`, `/category/sports/`, `/category/skill/`, `/category/2-player/`, etc.
  - **Compliance Pages**: `/privacy/`, `/terms/`, `/dmca/`, and `/contact/`.
- **100% Valid Structured Data (JSON-LD)**: `WebApplication`, `AggregateRating`, `FAQPage`, and `BreadcrumbList` on all pages.
- **Automated Deployment**: GitHub Actions workflow builds and deploys directly to GitHub Pages on every push to `main`.

---

## 🛠️ Local Development & Build

```bash
# 1. Build all static pages, sitemap.xml, and robots.txt
node build.mjs

# 2. Start local preview server (http://localhost:3000)
node dev-server.mjs
```

---

## 📁 Repository Structure

```text
├── games.json                 # Core dataset (names, SEO tags, iframe URLs, controls, FAQs)
├── build.mjs                  # Fast static compiler (generates all HTML, sitemap & schemas)
├── dev-server.mjs             # Zero-dependency local dev server
├── src/
│   ├── style.css              # Dark slate + cyan responsive theme, theater mode styles
│   └── app.js                 # Vanilla JS: search filtering, fullscreen API, theater mode
├── .github/workflows/
│   └── deploy.yml             # Automated GitHub Pages CI/CD workflow
└── package.json
```
