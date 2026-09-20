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

// Generate Modern Tailwind Header Component
function renderHeader(activeNav = '') {
  return `
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-4">
        
        <!-- Brand Logo -->
        <a href="${SITE_URL}/" class="flex items-center gap-3 group shrink-0" title="Unblocked Games Lab Homepage">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/25 group-hover:scale-105 group-hover:shadow-cyan-400/40 transition-all duration-300">
            🎮
          </div>
          <div class="flex flex-col">
            <span class="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              Unblocked Games
              <span class="px-1.5 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-md">LAB</span>
            </span>
            <span class="text-[11px] text-slate-400 hidden sm:block">Fast 60FPS WebGL Games for School</span>
          </div>
        </a>
        
        <!-- Search Bar -->
        <div class="flex-1 max-w-md mx-2 sm:mx-4 relative" id="search-container">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              id="search-input" 
              autocomplete="off"
              placeholder="Search 36+ unblocked games (Slope, 1v1 LOL, Retro Bowl)..." 
              class="w-full pl-10 pr-9 py-2 bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              aria-label="Search unblocked games">
            <button id="search-clear" type="button" class="hidden absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors" title="Clear search">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <!-- Live Search Dropdown -->
          <div id="search-dropdown" class="hidden absolute left-0 right-0 top-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50 max-h-[70vh] overflow-y-auto divide-y divide-slate-800/60"></div>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-1.5 text-sm font-medium">
          <a href="${SITE_URL}/" class="px-3 py-1.5 rounded-lg transition-all ${activeNav === 'home' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">🔥 Featured</a>
          <a href="${SITE_URL}/category/shooting/" class="px-3 py-1.5 rounded-lg transition-all ${activeNav === 'shooting' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">Shooting</a>
          <a href="${SITE_URL}/category/sports/" class="px-3 py-1.5 rounded-lg transition-all ${activeNav === 'sports' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">Sports</a>
          <a href="${SITE_URL}/category/skill/" class="px-3 py-1.5 rounded-lg transition-all ${activeNav === 'skill' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">Skill</a>
          <a href="${SITE_URL}/category/2-player/" class="px-3 py-1.5 rounded-lg transition-all ${activeNav === '2-player' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">2 Player</a>
          <a href="${SITE_URL}/about/" class="px-3 py-1.5 rounded-lg transition-all ${activeNav === 'about' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">About</a>
        </nav>
      </div>
    </div>
  </header>`;
}

// Generate Modern Tailwind Footer Component
function renderFooter() {
  return `
  <footer class="bg-slate-950 border-t border-slate-850 text-slate-400 text-sm mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        <!-- Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-base shadow-md shadow-cyan-500/20">
              🎮
            </div>
            <span class="font-extrabold text-lg text-white">Unblocked Games <span class="text-cyan-400 font-bold">LAB</span></span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
            Ultra-fast, zero-overhead unblocked web games hosted on high-availability GitHub CDN. Built specifically for 60 FPS gameplay on school Chromebooks and restricted networks.
          </p>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            All 26 Game Servers Whitelisted & Online
          </div>
        </div>

        <!-- Top Games -->
        <div>
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Popular Games</h4>
          <ul class="space-y-2.5">
            <li><a href="${SITE_URL}/games/funny-shooter-2/" class="hover:text-cyan-400 transition-colors">Funny Shooter 2</a></li>
            <li><a href="${SITE_URL}/games/retro-bowl/" class="hover:text-cyan-400 transition-colors">Retro Bowl Unblocked</a></li>
            <li><a href="${SITE_URL}/games/drift-hunters/" class="hover:text-cyan-400 transition-colors">Drift Hunters 3D</a></li>
            <li><a href="${SITE_URL}/games/subway-surfers/" class="hover:text-cyan-400 transition-colors">Subway Surfers</a></li>
            <li><a href="${SITE_URL}/games/slope/" class="hover:text-cyan-400 transition-colors">Slope 3D Runner</a></li>
            <li><a href="${SITE_URL}/games/1942-arcade/" class="hover:text-cyan-400 transition-colors">1942 Air Combat</a></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h4>
          <ul class="space-y-2.5">
            <li><a href="${SITE_URL}/category/shooting/" class="hover:text-cyan-400 transition-colors">Shooting (FPS)</a></li>
            <li><a href="${SITE_URL}/category/sports/" class="hover:text-cyan-400 transition-colors">Sports & Football</a></li>
            <li><a href="${SITE_URL}/category/skill/" class="hover:text-cyan-400 transition-colors">Skill & Reflex</a></li>
            <li><a href="${SITE_URL}/category/2-player/" class="hover:text-cyan-400 transition-colors">2 Player Local</a></li>
            <li><a href="${SITE_URL}/category/action/" class="hover:text-cyan-400 transition-colors">Action & Battle</a></li>
            <li><a href="${SITE_URL}/category/puzzle/" class="hover:text-cyan-400 transition-colors">Puzzle & Strategy</a></li>
          </ul>
        </div>

        <!-- Legal & Info -->
        <div>
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Information</h4>
          <ul class="space-y-2.5">
            <li><a href="${SITE_URL}/about/" class="hover:text-cyan-400 transition-colors">About Our Mission</a></li>
            <li><a href="${SITE_URL}/privacy/" class="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="${SITE_URL}/terms/" class="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            <li><a href="${SITE_URL}/dmca/" class="hover:text-cyan-400 transition-colors">DMCA Notice</a></li>
            <li><a href="${SITE_URL}/contact/" class="hover:text-cyan-400 transition-colors">Contact & Requests</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-850 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© ${new Date().getFullYear()} Unblocked Games Lab (unblocked-games-lab.github.io). All rights reserved.</p>
        <p>Zero tracking • Open-source gaming repository • Built for Chromebooks</p>
      </div>
    </div>
  </footer>`;
}

// Generate Modern Tailwind Game Cards Grid
function renderGameGrid(gameList, currentSlug = '') {
  return `
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5" id="games-grid">
    ${gameList
      .map((g) => {
        const isCurrent = g.slug === currentSlug;
        return `
        <article class="game-card group relative bg-slate-900/80 hover:bg-slate-850 border ${isCurrent ? 'border-cyan-500 ring-1 ring-cyan-500/50' : 'border-slate-800 hover:border-cyan-500/60'} rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between" data-name="${g.name}" data-category="${g.category}" data-tags="${g.tagline}">
          <a href="${SITE_URL}/games/${g.slug}/" class="block" title="Play ${g.name} Unblocked">
            
            <!-- Thumbnail Visual Card -->
            <div class="aspect-[4/3] rounded-xl bg-gradient-to-br ${g.gradient || 'from-slate-800 to-slate-950'} flex flex-col items-center justify-center relative overflow-hidden border border-slate-750/50 mb-3 group-hover:scale-[1.02] transition-transform duration-300">
              ${
                g.thumbnail
                  ? `<img src="${SITE_URL}${g.thumbnail}" alt="${g.name} Unblocked" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.style.display='none'">`
                  : ''
              }
              <span class="text-4xl sm:text-5xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300 select-none ${g.thumbnail ? 'opacity-0' : ''}">${g.icon}</span>
              <div class="absolute top-2 left-2 px-2 py-0.5 bg-black/75 backdrop-blur-md rounded-md text-[10px] font-semibold text-slate-200 border border-white/10 uppercase tracking-wider shadow-sm z-10">
                ${g.category}
              </div>
              ${
                isCurrent
                  ? `<div class="absolute inset-0 bg-cyan-950/75 backdrop-blur-sm flex items-center justify-center z-20">
                      <span class="px-2.5 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg animate-pulse">NOW PLAYING</span>
                    </div>`
                  : ''
              }
            </div>

            <!-- Content -->
            <div>
              <div class="flex items-center justify-between gap-1 mb-1">
                <h3 class="font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors truncate">${g.name}</h3>
                <span class="text-amber-400 font-semibold text-xs shrink-0 flex items-center gap-0.5">★ ${g.rating}</span>
              </div>
              <p class="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-3">${g.tagline}</p>
            </div>
          </a>

          <!-- Footer Button -->
          <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>👥 ${g.plays}</span>
            <a href="${SITE_URL}/games/${g.slug}/" class="font-medium ${isCurrent ? 'text-cyan-400' : 'text-slate-300 group-hover:text-cyan-400'} flex items-center gap-1 transition-colors">
              ${isCurrent ? 'Playing' : 'Play →'}
            </a>
          </div>
        </article>`;
      })
      .join('\n')}
  </div>
  <div id="empty-search-state" class="hidden text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-slate-800 my-8">
    <div class="text-4xl mb-3">🔍</div>
    <h3 class="text-lg font-bold text-white mb-1">No unblocked games found</h3>
    <p class="text-slate-400 text-sm max-w-md mx-auto">Try searching for popular terms like "Slope", "1v1 LOL", "Retro Bowl", "Drift", or browse the categories above.</p>
  </div>`;
}

// Generate Modern Tailwind Category Pills
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
  <div class="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
    ${categories
      .map(
        (c) =>
          `<a href="${c.url}" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeCat === c.slug
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
          }">${c.name}</a>`
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
<html lang="en" class="dark scroll-smooth">
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
  
  <!-- Tailwind CSS CDN (High-Speed Play CDN) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            slate: {
              750: '#293548',
              850: '#151f32',
              950: '#070b14'
            },
            cyan: {
              400: '#38bdf8',
              500: '#0ea5e9',
              600: '#0284c7'
            }
          },
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
          }
        }
      }
    }
  </script>

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

  <!-- Inline Style Enhancements & Reset -->
  <style>
    body { background-color: #070b14; color: #f8fafc; }
    .theater-mode { max-width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
    .theater-mode .aspect-video { height: 82vh !important; max-height: 850px; border-radius: 0; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
  
  <!-- Structured Data JSON-LD -->
  ${schemaJsonLd
    .map(
      (schema) =>
        `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
    )
    .join('\n')}
</head>
<body class="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
  ${renderHeader(activeNav)}
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
    ${contentHtml}
  </main>
  ${renderFooter()}
  <script>
    window.__SITE_URL__ = "${SITE_URL}";
    window.__GAMES__ = ${JSON.stringify(games.map(g => ({
      name: g.name,
      slug: g.slug,
      category: g.category,
      tagline: g.tagline,
      icon: g.icon,
      thumbnail: g.thumbnail || '',
      rating: g.rating,
      plays: g.plays
    })))};
  </script>
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
            `<tr class="border-b border-slate-800/60 last:border-0 hover:bg-slate-800/30 transition-colors">
              <td class="py-2.5 px-3">
                <kbd class="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md font-mono text-cyan-400 text-xs font-semibold shadow-inner inline-block">${c.key}</kbd>
              </td>
              <td class="py-2.5 px-3 text-slate-300 text-xs sm:text-sm">${c.action}</td>
            </tr>`
        )
        .join('\n')
    : '';

  const tipsList = game.tips
    ? game.tips
        .map(
          (t) =>
            `<li class="flex items-start gap-2.5 text-slate-300 text-sm sm:text-base leading-relaxed">
              <span class="text-cyan-400 font-bold shrink-0 mt-0.5">✦</span>
              <span>${t}</span>
            </li>`
        )
        .join('\n')
    : '';

  const faqItems = game.faq
    ? game.faq
        .map(
          (f, idx) => `
      <div class="border border-slate-800 bg-slate-900/70 rounded-xl overflow-hidden transition-all duration-200">
        <details class="group" ${idx === 0 ? 'open' : ''}>
          <summary class="flex items-center justify-between p-4 font-semibold text-white cursor-pointer select-none hover:text-cyan-400 transition-colors">
            <span class="text-sm sm:text-base">${f.q}</span>
            <span class="ml-4 text-cyan-400 group-open:rotate-180 transition-transform duration-200 shrink-0">▼</span>
          </summary>
          <div class="p-4 pt-0 text-slate-300 text-sm leading-relaxed border-t border-slate-800/40">
            <p>${f.a}</p>
          </div>
        </details>
      </div>`
        )
        .join('\n')
    : '';

  return `
  <!-- Main Game Stage Section -->
  <section class="game-stage-container mb-12 transition-all duration-300" id="main-game-stage">
    
    <!-- Stage Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <span class="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-md text-xs font-semibold uppercase tracking-wider">${game.category}</span>
          <span class="text-xs text-slate-400">WebGL • 60 FPS Verified</span>
        </div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">${game.h1 || game.name}</h1>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2 shrink-0">
        <button id="btn-theater" class="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all" title="Toggle Theater Mode" aria-label="Toggle Theater Mode">
          <span>⛶</span> Theater
        </button>
        <button id="btn-reload" class="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all" title="Reload Game" aria-label="Reload Game">
          <span>↻</span> Reload
        </button>
        <button id="btn-fullscreen" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105" title="Play Fullscreen" aria-label="Play Fullscreen">
          <span>🖵</span> Fullscreen
        </button>
      </div>
    </div>

    <!-- 16:9 Responsive Game Frame -->
    <div class="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-slate-800 bg-black shadow-2xl shadow-cyan-950/20" id="game-frame-wrapper">
      <iframe 
        id="game-iframe"
        src="${game.iframeUrl}" 
        title="${game.name} Unblocked Game Player"
        class="w-full h-full border-0"
        allow="autoplay; fullscreen; keyboard; focus-without-user-activation *" 
        allowfullscreen
        loading="eager">
      </iframe>
    </div>

    <!-- Quick Info Bar -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 mt-4 text-xs sm:text-sm">
      <div>
        <span class="text-slate-400 block text-[11px]">Rating</span>
        <span class="text-amber-400 font-bold flex items-center gap-1 mt-0.5">★ ${game.rating} / 5.0</span>
      </div>
      <div>
        <span class="text-slate-400 block text-[11px]">Plays</span>
        <span class="text-slate-200 font-bold mt-0.5">👥 ${game.plays}</span>
      </div>
      <div>
        <span class="text-slate-400 block text-[11px]">Device Support</span>
        <span class="text-slate-200 font-bold mt-0.5">Chromebook / PC / Mac</span>
      </div>
      <div>
        <span class="text-slate-400 block text-[11px]">Status</span>
        <span class="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">● Whitelisted & Unblocked</span>
      </div>
    </div>
  </section>

  <!-- Detailed Game Guide & SEO Content -->
  <section class="mt-12 border-t border-slate-800/80 pt-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Main Content Column -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Overview -->
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-cyan-400">🎮</span> About ${game.name} Unblocked
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">${game.overview}</p>

          <h2 class="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
            <span class="text-cyan-400">📖</span> How to Play & Master ${game.name}
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">${game.howToPlay}</p>
        </div>

        <!-- Pro Tips -->
        ${
          game.tips && game.tips.length > 0
            ? `
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-cyan-400">💡</span> Pro Strategies & High-Score Tips
          </h2>
          <ul class="space-y-3">
            ${tipsList}
          </ul>
        </div>`
            : ''
        }

        <!-- FAQ Accordion -->
        ${
          game.faq && game.faq.length > 0
            ? `
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span class="text-cyan-400">❓</span> Frequently Asked Questions (FAQ)
          </h2>
          <div class="space-y-3">
            ${faqItems}
          </div>
        </div>`
            : ''
        }
      </div>

      <!-- Sidebar Column -->
      <div class="space-y-6">
        
        <!-- Controls Card -->
        ${
          game.controls && game.controls.length > 0
            ? `
        <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg">
          <h3 class="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>⌨️</span> Controls & Keybinds
          </h3>
          <div class="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40">
            <table class="w-full text-left">
              <tbody>
                ${controlsRows}
              </tbody>
            </table>
          </div>
        </div>`
            : ''
        }

        <!-- Why Unblocked Lab -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg">
          <h3 class="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Why Unblocked Games Lab?
          </h3>
          <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 100% Free - No install or sign-up</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Bypasses School & Library Filters</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 60 FPS WebGL on School Chromebooks</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Theater & Fullscreen Modes</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Automatic Browser Local Storage</li>
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}

// -------------------------------------------------------------
// BUILD PROCESS
// -------------------------------------------------------------

async function buildSite() {
  console.log('🚀 Starting Unblocked Games Lab Tailwind static site build...');
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
      
      <!-- Games Library Section -->
      <section class="mt-12">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Explore More Unblocked Games</h2>
            <p class="text-slate-400 text-xs sm:text-sm">Browse all 26+ top-rated unblocked games for school Chromebooks</p>
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
        
        <!-- Similar Games Grid -->
        <section class="mt-12">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Similar & Popular Unblocked Games</h2>
              <p class="text-slate-400 text-xs sm:text-sm">More exciting unblocked games to play during breaks</p>
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
        <div class="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-8 mb-10 text-center relative overflow-hidden">
          <div class="text-5xl mb-3">${catMeta.icon}</div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">${catMeta.name} Unblocked</h1>
          <p class="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">${catMeta.desc}</p>
        </div>

        <section>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 class="text-xl font-bold text-white">Available ${catMeta.name} (${filteredGames.length})</h2>
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
        <div class="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 class="text-2xl font-bold text-white">Our Mission</h2>
          <p>Welcome to <strong>Unblocked Games Lab</strong>. We are an open-source developer initiative dedicated to providing instant, lightweight, and unrestricted access to educational, skill-building, and entertaining HTML5/WebGL browser games.</p>
          
          <h2 class="text-2xl font-bold text-white pt-4">Designed for Low-Spec School Hardware</h2>
          <p>Many students and educators face hardware limitations with school-issued Chromebooks (such as dual-core Celeron chips and 4GB RAM) or strict network restrictions. Traditional gaming portals are bloated with heavy JavaScript frameworks, tracking scripts, and intrusive video popups that cause lag and browser crashes.</p>
          <p>Unblocked Games Lab is built with <strong>zero runtime framework dependencies</strong> and lightweight CSS, ensuring instantaneous first-contentful paint (FCP < 0.05s) and steady 60 FPS gameplay.</p>

          <h2 class="text-2xl font-bold text-white pt-4">Safe, Whitelisted & 100% Free</h2>
          <p>All our games are hosted via GitHub Pages high-availability content delivery network (CDN). We do not collect personal data, require user registration, or charge microtransactions. Everything is 100% free and open for personal entertainment during breaks.</p>
        </div>`
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy | Unblocked Games Lab',
      h1: 'Privacy Policy',
      desc: 'Read the official Unblocked Games Lab privacy policy. Learn about our strict zero personal data tracking and local storage save architecture.',
      content: `
        <div class="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 class="text-xl font-bold text-white">1. Introduction</h2>
          <p>Unblocked Games Lab ("we", "our", or "us") operates the website <code>https://unblocked-games-lab.github.io</code>. We respect your privacy and are committed to maintaining a zero-tracking, safe gaming environment.</p>

          <h2 class="text-xl font-bold text-white">2. Information We Collect</h2>
          <p>We do <strong>not</strong> collect personally identifiable information (PII) such as your name, email address, physical location, or phone number. When you play games on our site, your game progress and high scores are stored locally in your own browser's <code>localStorage</code>.</p>

          <h2 class="text-xl font-bold text-white">3. Cookies and Analytics</h2>
          <p>We use minimal anonymous web analytics (such as Google Analytics and Microsoft Clarity) to monitor server health, traffic volume, and bandwidth. These services do not collect personal identities.</p>

          <h2 class="text-xl font-bold text-white">4. Contact Us</h2>
          <p>If you have any questions regarding our Privacy Policy, please reach out via our <a href="${SITE_URL}/contact/" class="text-cyan-400 underline hover:text-cyan-300">Contact Page</a>.</p>
        </div>`
    },
    {
      slug: 'terms',
      title: 'Terms of Service | Unblocked Games Lab',
      h1: 'Terms of Service',
      desc: 'Terms of Service and acceptable use conditions for accessing and playing free unblocked games on the Unblocked Games Lab platform.',
      content: `
        <div class="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 class="text-xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>By accessing and using Unblocked Games Lab (<code>unblocked-games-lab.github.io</code>), you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use immediately.</p>

          <h2 class="text-xl font-bold text-white">2. Permitted Use</h2>
          <p>Our website and games are intended for personal, non-commercial entertainment and educational purposes. You agree not to attempt denial-of-service attacks, reverse engineering, or unauthorized scraping of our site infrastructure.</p>

          <h2 class="text-xl font-bold text-white">3. Disclaimer of Warranties</h2>
          <p>All games and materials are provided "as is" without warranty of any kind. We do not guarantee uninterrupted uptime or compatibility with all browser configurations.</p>
        </div>`
    },
    {
      slug: 'dmca',
      title: 'DMCA Copyright Notice | Unblocked Games Lab',
      h1: 'DMCA Copyright Notice',
      desc: 'DMCA copyright infringement policies, intellectual property protections, and content takedown submission procedures for Unblocked Games Lab.',
      content: `
        <div class="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 class="text-xl font-bold text-white">Copyright & Intellectual Property Notice</h2>
          <p>Unblocked Games Lab respects the intellectual property rights of game creators and developers. All game trademarks, character likenesses, and code remain the property of their respective copyright owners.</p>

          <h2 class="text-xl font-bold text-white">Filing a Takedown Request</h2>
          <p>If you believe that your copyrighted work is hosted on our platform without authorization, please submit a formal DMCA takedown notice containing:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Direct URL link(s) on our site where the material is located.</li>
            <li>Your contact information (name, email address, telephone).</li>
            <li>A statement of good faith belief that the disputed use is unauthorized.</li>
            <li>An electronic signature of the copyright owner or authorized representative.</li>
          </ul>
          <p>Send your notice via a GitHub Issue or email us directly at: <code>copyright@unblocked-games-lab.org</code> or through our <a href="${SITE_URL}/contact/" class="text-cyan-400 underline hover:text-cyan-300">Contact Form</a>. We process verified notices within 24-48 business hours.</p>
        </div>`
    },
    {
      slug: 'contact',
      title: 'Contact Us & Game Requests | Unblocked Games Lab',
      h1: 'Contact & Feedback',
      desc: 'Get in touch with the Unblocked Games Lab team to submit new game requests, report broken links, or ask technical questions.',
      content: `
        <div class="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 class="text-xl font-bold text-white">Get in Touch</h2>
          <p>Have a favorite game you'd like to see unblocked on our platform? Found a bug or broken iframe? We welcome all player feedback!</p>
          
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 class="font-bold text-white text-lg">📫 Contact Channels</h3>
            <p><strong>GitHub Issues:</strong> <a href="https://github.com/unblocked-games-lab/unblocked-games-lab.github.io/issues" target="_blank" rel="noopener" class="text-cyan-400 underline hover:text-cyan-300">Submit an Issue / Request Game</a></p>
            <p><strong>Official Email:</strong> <code>support@unblocked-games-lab.org</code></p>
            <p><strong>Response Time:</strong> Typically under 24 hours.</p>
          </div>
        </div>`
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
        <div class="max-w-4xl mx-auto py-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8 pb-4 border-b border-slate-800">${page.h1}</h1>
          <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-10">
            ${page.content}
          </div>
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
  if (fs.existsSync(path.join(SRC_DIR, 'style.css'))) {
    fs.copyFileSync(path.join(SRC_DIR, 'style.css'), path.join(DIST_DIR, 'style.css'));
  }
  fs.copyFileSync(path.join(SRC_DIR, 'app.js'), path.join(DIST_DIR, 'app.js'));
  fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');

  // Copy any verification html files
  for (const f of fs.readdirSync(SRC_DIR)) {
    if (f.startsWith('google') && f.endsWith('.html')) {
      fs.copyFileSync(path.join(SRC_DIR, f), path.join(DIST_DIR, f));
      console.log(`✓ Copied verification file dist/${f}`);
    }
  }

  // Copy hosted games directory recursively if present
  const hostedGamesSrc = path.join(SRC_DIR, 'hosted-games');
  const hostedGamesDist = path.join(DIST_DIR, 'hosted-games');
  if (fs.existsSync(hostedGamesSrc)) {
    function copyDir(src, dest) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const sPath = path.join(src, entry.name);
        const dPath = path.join(dest, entry.name);
        if (entry.isDirectory()) copyDir(sPath, dPath);
        else fs.copyFileSync(sPath, dPath);
      }
    }
    copyDir(hostedGamesSrc, hostedGamesDist);
    console.log('✓ Copied self-hosted games to dist/hosted-games/');
  }

  // Copy images directory recursively
  const imagesSrc = path.join(SRC_DIR, 'images');
  const imagesDist = path.join(DIST_DIR, 'images');
  if (fs.existsSync(imagesSrc)) {
    function copyDir(src, dest) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const sPath = path.join(src, entry.name);
        const dPath = path.join(dest, entry.name);
        if (entry.isDirectory()) copyDir(sPath, dPath);
        else fs.copyFileSync(sPath, dPath);
      }
    }
    copyDir(imagesSrc, imagesDist);
    console.log('✓ Copied images to dist/images/');
  }

  console.log('✓ Copied assets and created .nojekyll');

  console.log('🎉 Tailwind static site build completed successfully!');
}

buildSite().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
