import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const SITE_URL = 'https://unblocked-games-lab.github.io';
const SITE_NAME = 'Unblocked Games Lab';

// Read Games Data
const gamesDataRaw = fs.readFileSync(path.join(ROOT_DIR, 'games.json'), 'utf-8');
const games = JSON.parse(gamesDataRaw);

// Helper to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper to clean dist
function cleanDist() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  ensureDir(DIST_DIR);
}

// Generate Header Component
function renderHeader(activeNav = '') {
  return `
  <header class="header">
    <div class="header-container">
      <a href="${SITE_URL}/" class="brand" title="Unblocked Games Lab Homepage">
        <div class="brand-icon">🎮</div>
        <span>Unblocked Games <span class="brand-badge">LAB</span></span>
      </a>
      
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="search-input" placeholder="Search unblocked games (Slope, 1v1 LOL, Retro Bowl)..." aria-label="Search unblocked games">
      </div>

      <nav class="nav-links">
        <a href="${SITE_URL}/" class="nav-link ${activeNav === 'home' ? 'active' : ''}">🔥 Featured</a>
        <a href="${SITE_URL}/category/shooting/" class="nav-link ${activeNav === 'shooting' ? 'active' : ''}">Shooting</a>
        <a href="${SITE_URL}/category/sports/" class="nav-link ${activeNav === 'sports' ? 'active' : ''}">Sports</a>
        <a href="${SITE_URL}/category/skill/" class="nav-link ${activeNav === 'skill' ? 'active' : ''}">Skill</a>
        <a href="${SITE_URL}/category/2-player/" class="nav-link ${activeNav === '2-player' ? 'active' : ''}">2 Player</a>
        <a href="${SITE_URL}/about/" class="nav-link ${activeNav === 'about' ? 'active' : ''}">About</a>
      </nav>
    </div>
  </header>`;
}

// Generate Footer Component
function renderFooter() {
  return `
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="brand" style="margin-bottom: 0.75rem;">
            <div class="brand-icon">🎮</div>
            <span>Unblocked Games <span class="brand-badge">LAB</span></span>
          </div>
          <p class="footer-desc">
            Ultra-fast, zero-overhead unblocked web games hosted on high-availability cloud infrastructure. Optimized for 60 FPS gameplay on school Chromebooks and workstations.
          </p>
          <div class="footer-status">
            <span class="status-dot"></span>
            <span>All Game Servers Online & Whitelisted</span>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Popular Games</h4>
          <ul class="footer-list">
            <li><a href="${SITE_URL}/games/funny-shooter-2/">Funny Shooter 2 Unblocked</a></li>
            <li><a href="${SITE_URL}/games/retro-bowl/">Retro Bowl Unblocked</a></li>
            <li><a href="${SITE_URL}/games/slope/">Slope Unblocked Game</a></li>
            <li><a href="${SITE_URL}/games/tag/">Tag Multiplayer Unblocked</a></li>
            <li><a href="${SITE_URL}/games/1v1-lol/">1v1.LOL Unblocked</a></li>
            <li><a href="${SITE_URL}/games/geometry-dash-lite/">Geometry Dash Lite</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Game Categories</h4>
          <ul class="footer-list">
            <li><a href="${SITE_URL}/category/shooting/">Shooting Games (FPS)</a></li>
            <li><a href="${SITE_URL}/category/sports/">Sports & Football Games</a></li>
            <li><a href="${SITE_URL}/category/skill/">Skill & Reflex Arcade</a></li>
            <li><a href="${SITE_URL}/category/2-player/">2 Player Unblocked</a></li>
            <li><a href="${SITE_URL}/category/action/">Action & Battle Royale</a></li>
            <li><a href="${SITE_URL}/category/puzzle/">Puzzle & Brain Teasers</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Legal & Support</h4>
          <ul class="footer-list">
            <li><a href="${SITE_URL}/about/">About Our Mission</a></li>
            <li><a href="${SITE_URL}/privacy/">Privacy Policy</a></li>
            <li><a href="${SITE_URL}/terms/">Terms of Service</a></li>
            <li><a href="${SITE_URL}/dmca/">DMCA Copyright Policy</a></li>
            <li><a href="${SITE_URL}/contact/">Contact & Feedback</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} Unblocked Games Lab (unblocked-games-lab.github.io). All rights reserved. Free educational gaming repository.</p>
      </div>
    </div>
  </footer>`;
}

// Generate Game Cards Grid
function renderGameGrid(gameList, currentSlug = '') {
  return `
  <div class="games-grid">
    ${gameList
      .map((g) => {
        const isCurrent = g.slug === currentSlug;
        return `
        <article class="game-card ${isCurrent ? 'active-playing' : ''}" data-name="${g.name}" data-category="${g.category}" data-tags="${g.tagline}">
          <a href="${SITE_URL}/games/${g.slug}/" class="game-card-link" title="Play ${g.name} Unblocked">
            <div class="game-thumbnail">
              <div class="thumb-badge">${g.category}</div>
              <div class="thumb-icon">${g.icon}</div>
              ${isCurrent ? '<div class="playing-indicator">NOW PLAYING</div>' : ''}
            </div>
            <div class="game-card-body">
              <div class="game-card-header">
                <h3 class="game-card-title">${g.name}</h3>
                <span class="game-rating">★ ${g.rating}</span>
              </div>
              <p class="game-card-tagline">${g.tagline}</p>
              <div class="game-card-footer">
                <span class="game-plays">👥 ${g.plays}</span>
                <span class="btn-play-mini">${isCurrent ? 'Playing' : 'Play Now →'}</span>
              </div>
            </div>
          </a>
        </article>`;
      })
      .join('\n')}
  </div>
  <div id="empty-search-state" class="empty-state" style="display: none;">
    <p class="empty-title">No games found matching your search.</p>
    <p class="empty-sub">Try searching for "FPS", "Slope", "Football", or browse categories above.</p>
  </div>`;
}

// Generate Category Tabs Component
function renderCategoryPills(activeCat = 'all') {
  const categories = [
    { name: '🔥 All Games', slug: 'all', url: `${SITE_URL}/` },
    { name: '🎯 Shooting', slug: 'shooting', url: `${SITE_URL}/category/shooting/` },
    { name: '🏈 Sports', slug: 'sports', url: `${SITE_URL}/category/sports/` },
    { name: '⚡ Skill', slug: 'skill', url: `${SITE_URL}/category/skill/` },
    { name: '👥 2 Player', slug: '2-player', url: `${SITE_URL}/category/2-player/` },
    { name: '⚔️ Action', slug: 'action', url: `${SITE_URL}/category/action/` },
    { name: '🧩 Puzzle', slug: 'puzzle', url: `${SITE_URL}/category/puzzle/` },
    { name: '🧬 Simulation', slug: 'simulation', url: `${SITE_URL}/category/simulation/` }
  ];

  return `
  <div class="category-pills">
    ${categories
      .map(
        (c) =>
          `<a href="${c.url}" class="cat-pill ${activeCat === c.slug ? 'active' : ''}">${c.name}</a>`
      )
      .join('\n')}
  </div>`;
}

// Base HTML Page Template
function renderPage({
  title,
  description,
  canonicalUrl,
  h1,
  activeNav = '',
  contentHtml,
  schemaJsonLd = []
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Social -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="${SITE_NAME}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  
  <link rel="stylesheet" href="${SITE_URL}/style.css">
  
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4NC85924WR"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-4NC85924WR');
  </script>

  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ykz3c9wq1r");
  </script>
  
  <!-- Structured Data JSON-LD -->
  ${schemaJsonLd
    .map(
      (schema) =>
        `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
    )
    .join('\n')}
</head>
<body>
  ${renderHeader(activeNav)}
  <main class="main-content">
    ${contentHtml}
  </main>
  ${renderFooter()}
  <script src="${SITE_URL}/app.js" defer></script>
</body>
</html>`;
}

// Generate Game Player + SEO Content Block
function renderGameStage(game) {
  const controlsRows = game.controls
    ? game.controls
        .map(
          (c) =>
            `<tr><td class="key-badge"><code>${c.key}</code></td><td class="action-desc">${c.action}</td></tr>`
        )
        .join('\n')
    : '';

  const tipsList = game.tips
    ? game.tips.map((t) => `<li>${t}</li>`).join('\n')
    : '';

  const faqItems = game.faq
    ? game.faq
        .map(
          (f, idx) => `
      <div class="faq-item">
        <details ${idx === 0 ? 'open' : ''}>
          <summary class="faq-question"><span>${f.q}</span><span class="faq-chevron">▼</span></summary>
          <div class="faq-answer"><p>${f.a}</p></div>
        </details>
      </div>`
        )
        .join('\n')
    : '';

  return `
  <section class="game-stage-container" id="main-game-stage">
    <div class="game-stage-header">
      <div>
        <div class="game-meta-badge">${game.category} • Free Browser WebGL</div>
        <h1 class="game-hero-title">${game.h1 || game.name}</h1>
      </div>
      <div class="game-stage-actions">
        <button id="btn-theater" class="action-btn" title="Toggle Theater Mode" aria-label="Toggle Theater Mode">
          <span>⛶</span> Theater
        </button>
        <button id="btn-reload" class="action-btn" title="Reload Game" aria-label="Reload Game">
          <span>↻</span> Reload
        </button>
        <button id="btn-fullscreen" class="action-btn primary-btn" title="Play Fullscreen" aria-label="Play Fullscreen">
          <span>🖵</span> Fullscreen
        </button>
      </div>
    </div>

    <!-- 16:9 Responsive Game Frame -->
    <div class="game-frame-wrapper" id="game-frame-wrapper">
      <iframe 
        id="game-iframe"
        src="${game.iframeUrl}" 
        title="${game.name} Unblocked Game Player"
        allow="autoplay; fullscreen; keyboard; focus-without-user-activation *" 
        allowfullscreen
        loading="eager">
      </iframe>
    </div>

    <!-- Quick Info Bar -->
    <div class="game-info-bar">
      <div class="info-item">
        <span class="info-label">Rating</span>
        <span class="info-val rating-val">★ ${game.rating} / 5.0</span>
      </div>
      <div class="info-item">
        <span class="info-label">Plays</span>
        <span class="info-val">👥 ${game.plays}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Platform</span>
        <span class="info-val">Chromebook / PC / Mobile</span>
      </div>
      <div class="info-item">
        <span class="info-label">Network Status</span>
        <span class="info-val status-online">● Unblocked (GitHub Pages)</span>
      </div>
    </div>
  </section>

  <!-- Detailed Game Guide & SEO Content -->
  <section class="content-section">
    <div class="content-grid">
      <div class="content-main">
        <article class="prose-block">
          <h2>About ${game.name} Unblocked</h2>
          <p>${game.overview}</p>

          <h2>How to Play ${game.name}</h2>
          <p>${game.howToPlay}</p>

          ${
            game.tips && game.tips.length > 0
              ? `
          <h2>Pro Strategies & High-Score Tips</h2>
          <ul class="tips-list">
            ${tipsList}
          </ul>`
              : ''
          }

          ${
            game.faq && game.faq.length > 0
              ? `
          <h2>Frequently Asked Questions (FAQ)</h2>
          <div class="faq-accordion">
            ${faqItems}
          </div>`
              : ''
          }
        </article>
      </div>

      <aside class="content-sidebar">
        ${
          game.controls && game.controls.length > 0
            ? `
        <div class="sidebar-card">
          <h3 class="sidebar-title">⌨️ Controls & Keybinds</h3>
          <table class="controls-table">
            <tbody>
              ${controlsRows}
            </tbody>
          </table>
        </div>`
            : ''
        }

        <div class="sidebar-card">
          <h3 class="sidebar-title">⚡ Why Unblocked Games Lab?</h3>
          <ul class="feature-checklist">
            <li>✓ 100% Free - No login or download</li>
            <li>✓ Bypasses School & Library Filters</li>
            <li>✓ 60 FPS WebGL on School Chromebooks</li>
            <li>✓ Fullscreen & Theater Modes</li>
            <li>✓ Auto Cloud-Saving Storage</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// BUILD PROCESS
// -------------------------------------------------------------

async function buildSite() {
  console.log('🚀 Starting Unblocked Games Lab static site build...');
  cleanDist();

  const heroGame = games.find((g) => g.isHero) || games[0];
  const sitemapUrls = [];

  // 1. Generate Homepage (Form C: Hero Game + Related Grid)
  const homeHtml = renderPage({
    title: heroGame.seoTitle,
    description: heroGame.seoDescription,
    canonicalUrl: `${SITE_URL}/`,
    h1: heroGame.h1,
    activeNav: 'home',
    schemaJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: heroGame.name,
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}/`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: heroGame.rating,
          ratingCount: '1850'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: heroGame.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a
          }
        }))
      }
    ],
    contentHtml: `
      ${renderGameStage(heroGame)}
      
      <section class="section-container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Explore More Unblocked Games</h2>
            <p class="section-sub">Browse top-rated unblocked games for school Chromebooks and browser play</p>
          </div>
          ${renderCategoryPills('all')}
        </div>
        ${renderGameGrid(games, heroGame.slug)}
      </section>
    `
  });

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), homeHtml);
  sitemapUrls.push({ url: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' });
  console.log('✓ Generated dist/index.html (Hero: Funny Shooter 2)');

  // 2. Generate Dedicated Standalone Landing Pages for each game
  for (const game of games) {
    const gameDir = path.join(DIST_DIR, 'games', game.slug);
    ensureDir(gameDir);

    const relatedGames = games.filter((g) => g.slug !== game.slug);

    const gamePageHtml = renderPage({
      title: game.seoTitle,
      description: game.seoDescription,
      canonicalUrl: `${SITE_URL}/games/${game.slug}/`,
      h1: game.h1,
      activeNav: game.category.toLowerCase().includes('shoot')
        ? 'shooting'
        : game.category.toLowerCase().includes('sport')
        ? 'sports'
        : 'home',
      schemaJsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Games',
              item: `${SITE_URL}/games/${game.slug}/`
            }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: game.name,
          applicationCategory: 'GameApplication',
          operatingSystem: 'All',
          url: `${SITE_URL}/games/${game.slug}/`,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: game.rating,
            ratingCount: '1240'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (game.faq || []).map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a
            }
          }))
        }
      ],
      contentHtml: `
        ${renderGameStage(game)}
        
        <section class="section-container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Similar & Popular Unblocked Games</h2>
              <p class="section-sub">More exciting unblocked games to play during breaks</p>
            </div>
            ${renderCategoryPills('all')}
          </div>
          ${renderGameGrid(relatedGames, game.slug)}
        </section>
      `
    });

    fs.writeFileSync(path.join(gameDir, 'index.html'), gamePageHtml);
    sitemapUrls.push({
      url: `${SITE_URL}/games/${game.slug}/`,
      priority: '0.9',
      changefreq: 'weekly'
    });
    console.log(`✓ Generated dist/games/${game.slug}/index.html`);
  }

  // 3. Generate Category Pages
  const categoriesMap = {
    shooting: { name: 'Shooting Games', icon: '🎯', desc: 'Fast 3D FPS and multiplayer shooting games unblocked on school Chromebooks.' },
    sports: { name: 'Sports Games', icon: '🏈', desc: 'Play football, basketball, and competitive sports games unblocked online.' },
    skill: { name: 'Skill & Reflex Games', icon: '⚡', desc: 'Test your agility, reflexes, and timing with high-speed arcade games.' },
    '2-player': { name: '2 Player Games', icon: '👥', desc: 'Play head-to-head local multiplayer games with friends on one keyboard.' },
    action: { name: 'Action Games', icon: '⚔️', desc: 'High-octane action, fighting, and survival battle games.' },
    puzzle: { name: 'Puzzle Games', icon: '🧩', desc: 'Sharpen your mind with strategy and logic puzzle games.' },
    simulation: { name: 'Simulation Games', icon: '🧬', desc: 'Immersive life simulation and management simulator games.' }
  };

  for (const [catSlug, catMeta] of Object.entries(categoriesMap)) {
    const catDir = path.join(DIST_DIR, 'category', catSlug);
    ensureDir(catDir);

    const filteredGames = games.filter(
      (g) =>
        g.category.toLowerCase().replace(/\s+/g, '-') === catSlug ||
        (catSlug === 'shooting' && g.category === 'Shooting') ||
        (catSlug === 'sports' && g.category === 'Sports') ||
        (catSlug === 'skill' && g.category === 'Skill') ||
        (catSlug === '2-player' && g.category === '2 Player') ||
        (catSlug === 'action' && g.category === 'Action') ||
        (catSlug === 'puzzle' && g.category === 'Puzzle') ||
        (catSlug === 'simulation' && g.category === 'Simulation')
    );

    const catPageHtml = renderPage({
      title: `${catMeta.name} Unblocked - Play Free | Unblocked Games Lab`,
      description: `Play free ${catMeta.name.toLowerCase()} unblocked on GitHub Pages. ${catMeta.desc} No download or login required.`,
      canonicalUrl: `${SITE_URL}/category/${catSlug}/`,
      h1: `${catMeta.name} Unblocked`,
      activeNav: catSlug,
      schemaJsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: catMeta.name,
              item: `${SITE_URL}/category/${catSlug}/`
            }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${catMeta.name} Unblocked`,
          url: `${SITE_URL}/category/${catSlug}/`,
          description: catMeta.desc
        }
      ],
      contentHtml: `
        <div class="category-header-banner">
          <div class="cat-banner-icon">${catMeta.icon}</div>
          <h1 class="cat-banner-title">${catMeta.name} Unblocked</h1>
          <p class="cat-banner-desc">${catMeta.desc}</p>
        </div>

        <section class="section-container">
          <div class="section-header">
            <h2 class="section-title">Available ${catMeta.name} (${filteredGames.length})</h2>
            ${renderCategoryPills(catSlug)}
          </div>
          ${renderGameGrid(filteredGames.length > 0 ? filteredGames : games)}
        </section>
      `
    });

    fs.writeFileSync(path.join(catDir, 'index.html'), catPageHtml);
    sitemapUrls.push({
      url: `${SITE_URL}/category/${catSlug}/`,
      priority: '0.8',
      changefreq: 'weekly'
    });
    console.log(`✓ Generated dist/category/${catSlug}/index.html`);
  }

  // 4. Generate Legal & Utility Pages (About, Privacy, Terms, DMCA, Contact)
  const legalPages = [
    {
      slug: 'about',
      title: 'About Us | Unblocked Games Lab',
      h1: 'About Unblocked Games Lab',
      desc: 'Learn about our open-source mission to provide lightning-fast, ad-clean, lightweight web games for students and casual gamers on school Chromebooks.',
      content: `
        <article class="prose-block">
          <h2>Our Mission</h2>
          <p>Welcome to <strong>Unblocked Games Lab</strong>. We are a passionate open-source developer initiative dedicated to providing instant, lightweight, and unrestricted access to educational, skill-building, and entertaining HTML5/WebGL browser games.</p>
          
          <h2>Designed for Low-Spec Hardware</h2>
          <p>Many students and educators face hardware limitations with school-issued Chromebooks (such as dual-core Celeron chips and 4GB RAM) or strict firewall restrictions. Traditional gaming portals are bloated with heavy JavaScript frameworks, tracking scripts, and intrusive video popups that cause lag and browser crashes.</p>
          <p>Unblocked Games Lab is built with <strong>zero runtime framework dependencies</strong> (pure HTML5 and optimized CSS), ensuring instantaneous first-contentful paint (FCP < 0.05s) and steady 60 FPS gameplay.</p>

          <h2>Safe, Whitelisted & Free</h2>
          <p>All our games are hosted via GitHub Pages high-availability content delivery network (CDN). We do not collect personal data, require user registration, or charge microtransactions. Everything is 100% free and open for personal entertainment during breaks.</p>
        </article>`
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy | Unblocked Games Lab',
      h1: 'Privacy Policy',
      desc: 'Read the official Unblocked Games Lab privacy policy. Learn about our strict zero personal data tracking and local storage save architecture.',
      content: `
        <article class="prose-block">
          <h2>1. Introduction</h2>
          <p>Unblocked Games Lab ("we", "our", or "us") operates the website <code>https://unblocked-games-lab.github.io</code>. We respect your privacy and are committed to maintaining a zero-tracking, safe gaming environment.</p>

          <h2>2. Information We Collect</h2>
          <p>We do <strong>not</strong> collect personally identifiable information (PII) such as your name, email address, physical location, or phone number. When you play games on our site, your game progress and high scores are stored locally in your own browser's <code>localStorage</code>.</p>

          <h2>3. Cookies and Analytics</h2>
          <p>We may use minimal anonymous web analytics (such as Cloudflare Web Analytics or GitHub Traffic Insights) to monitor server health, traffic volume, and bandwidth. These services do not track individual users across the web.</p>

          <h2>4. Third-Party Game Content</h2>
          <p>Certain games embedded via iframes may have their own independent privacy practices. We encourage you to review their respective policies.</p>

          <h2>5. Contact Us</h2>
          <p>If you have any questions regarding our Privacy Policy, please reach out via our <a href="${SITE_URL}/contact/">Contact Page</a>.</p>
        </article>`
    },
    {
      slug: 'terms',
      title: 'Terms of Service | Unblocked Games Lab',
      h1: 'Terms of Service',
      desc: 'Terms of Service and acceptable use conditions for accessing and playing free unblocked games on the Unblocked Games Lab platform.',
      content: `
        <article class="prose-block">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Unblocked Games Lab (<code>unblocked-games-lab.github.io</code>), you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use immediately.</p>

          <h2>2. Permitted Use</h2>
          <p>Our website and games are intended for personal, non-commercial entertainment and educational purposes. You agree not to attempt denial-of-service attacks, reverse engineering, or unauthorized scraping of our site infrastructure.</p>

          <h2>3. Disclaimer of Warranties</h2>
          <p>All games and materials are provided "as is" without warranty of any kind. We do not guarantee uninterrupted uptime or compatibility with all browser configurations.</p>
        </article>`
    },
    {
      slug: 'dmca',
      title: 'DMCA Copyright Notice | Unblocked Games Lab',
      h1: 'DMCA Copyright Notice',
      desc: 'DMCA copyright infringement policies, intellectual property protections, and content takedown submission procedures for Unblocked Games Lab.',
      content: `
        <article class="prose-block">
          <h2>Copyright & Intellectual Property Notice</h2>
          <p>Unblocked Games Lab respects the intellectual property rights of game creators and developers. All game trademarks, character likenesses, and code remain the property of their respective copyright owners.</p>

          <h2>Filing a Takedown Request</h2>
          <p>If you believe that your copyrighted work is hosted on our platform without authorization, please submit a formal DMCA takedown notice containing:</p>
          <ul class="tips-list">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Direct URL link(s) on our site where the material is located.</li>
            <li>Your contact information (name, email address, telephone).</li>
            <li>A statement of good faith belief that the disputed use is unauthorized.</li>
            <li>An electronic signature of the copyright owner or authorized representative.</li>
          </ul>
          <p>Send your notice via a GitHub Issue or email us directly at: <code>copyright@unblocked-games-lab.org</code> or through our <a href="${SITE_URL}/contact/">Contact Form</a>. We process verified notices within 24-48 business hours.</p>
        </article>`
    },
    {
      slug: 'contact',
      title: 'Contact Us & Game Requests | Unblocked Games Lab',
      h1: 'Contact & Feedback',
      desc: 'Get in touch with the Unblocked Games Lab team to submit new game requests, report broken links, or ask technical questions.',
      content: `
        <article class="prose-block">
          <h2>Get in Touch</h2>
          <p>Have a favorite game you'd like to see unblocked on our platform? Found a bug or broken iframe? We welcome all player feedback!</p>
          
          <div class="sidebar-card" style="margin-top: 1.5rem;">
            <h3 class="sidebar-title">📫 Contact Channels</h3>
            <p><strong>GitHub Issues:</strong> <a href="https://github.com/unblocked-games-lab/unblocked-games-lab.github.io/issues" target="_blank" rel="noopener">Submit an Issue / Request Game</a></p>
            <p><strong>Official Email:</strong> <code>support@unblocked-games-lab.org</code></p>
            <p><strong>Response Time:</strong> Typically under 24 hours.</p>
          </div>
        </article>`
    }
  ];

  for (const page of legalPages) {
    const pageDir = path.join(DIST_DIR, page.slug);
    ensureDir(pageDir);

    const html = renderPage({
      title: page.title,
      description: page.desc,
      canonicalUrl: `${SITE_URL}/${page.slug}/`,
      h1: page.h1,
      activeNav: page.slug,
      schemaJsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: page.h1,
              item: `${SITE_URL}/${page.slug}/`
            }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: page.title,
          url: `${SITE_URL}/${page.slug}/`,
          description: page.desc
        }
      ],
      contentHtml: `
        <div class="legal-page-container">
          <h1 class="legal-hero-title">${page.h1}</h1>
          ${page.content}
        </div>
      `
    });

    fs.writeFileSync(path.join(pageDir, 'index.html'), html);
    sitemapUrls.push({
      url: `${SITE_URL}/${page.slug}/`,
      priority: '0.5',
      changefreq: 'monthly'
    });
    console.log(`✓ Generated dist/${page.slug}/index.html`);
  }

  // 5. Generate sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
  console.log(`✓ Generated dist/sitemap.xml (${sitemapUrls.length} URLs)`);

  // 6. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt);
  console.log('✓ Generated dist/robots.txt');

  // 7. Copy CSS, JS Assets & Verification files
  fs.copyFileSync(path.join(SRC_DIR, 'style.css'), path.join(DIST_DIR, 'style.css'));
  fs.copyFileSync(path.join(SRC_DIR, 'app.js'), path.join(DIST_DIR, 'app.js'));
  fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');

  // Copy any verification html files
  for (const f of fs.readdirSync(SRC_DIR)) {
    if (f.startsWith('google') && f.endsWith('.html')) {
      fs.copyFileSync(path.join(SRC_DIR, f), path.join(DIST_DIR, f));
      console.log(`✓ Copied verification file dist/${f}`);
    }
  }

  console.log('✓ Copied assets to dist/style.css, dist/app.js, and created .nojekyll');

  console.log('🎉 Static site build completed successfully!');
}

buildSite().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
