/**
 * Unblocked Games Lab - Fast Vanilla JS Runtime
 * Includes: Global Instant Search, Dropdown Autocomplete, Keyboard Nav, Fullscreen, Theater Mode, Iframe Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Global Instant Search & Dropdown System
  // ==========================================
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchClear = document.getElementById('search-clear');
  const searchContainer = document.getElementById('search-container');
  const gameCards = document.querySelectorAll('.game-card');
  const emptyState = document.getElementById('empty-search-state');

  const games = window.__GAMES__ || [];
  const siteUrl = window.__SITE_URL__ || '';

  let selectedIndex = -1;

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="text-cyan-400 font-bold bg-cyan-500/10 rounded px-0.5">$1</span>');
  }

  function filterGames(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return games.filter((g) => {
      const name = (g.name || '').toLowerCase();
      const cat = (g.category || '').toLowerCase();
      const tagline = (g.tagline || '').toLowerCase();
      const slug = (g.slug || '').toLowerCase();
      return name.includes(q) || cat.includes(q) || tagline.includes(q) || slug.includes(q);
    }).sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aStarts = aName.startsWith(q);
      const bStarts = bName.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }

  function renderDropdown(matches, query) {
    if (!searchDropdown) return;

    if (!query) {
      searchDropdown.innerHTML = '';
      searchDropdown.classList.add('hidden');
      selectedIndex = -1;
      return;
    }

    if (matches.length === 0) {
      searchDropdown.innerHTML = `
        <div class="p-5 text-center">
          <div class="text-2xl mb-1.5">🔍</div>
          <p class="text-sm font-semibold text-white">No games found for "${query}"</p>
          <p class="text-xs text-slate-400 mt-1">Try searching for <a href="${siteUrl}/games/slope/" class="text-cyan-400 hover:underline">Slope</a>, <a href="${siteUrl}/games/retro-bowl/" class="text-cyan-400 hover:underline">Retro Bowl</a>, or <a href="${siteUrl}/games/1v1-lol/" class="text-cyan-400 hover:underline">1v1 LOL</a></p>
        </div>
      `;
      searchDropdown.classList.remove('hidden');
      selectedIndex = -1;
      return;
    }

    const itemsHtml = matches.slice(0, 8).map((g, idx) => {
      const thumbHtml = g.thumbnail
        ? `<img src="${siteUrl}${g.thumbnail}" alt="${g.name}" class="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700/60" loading="lazy">`
        : `<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-900 to-slate-900 border border-slate-700/60 flex items-center justify-center text-lg shrink-0">${g.icon || '🎮'}</div>`;

      return `
        <a href="${siteUrl}/games/${g.slug}/" 
           class="search-item flex items-center justify-between gap-3 p-3 hover:bg-slate-800/80 transition-colors group cursor-pointer ${idx === selectedIndex ? 'bg-slate-800 ring-1 ring-cyan-500/50' : ''}"
           data-index="${idx}"
           data-slug="${g.slug}">
          <div class="flex items-center gap-3 min-w-0">
            ${thumbHtml}
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">${highlightMatch(g.name, query)}</span>
                <span class="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">${g.category}</span>
              </div>
              <p class="text-xs text-slate-400 truncate mt-0.5">${g.tagline || ''}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs font-semibold text-amber-400 hidden sm:inline">★ ${g.rating}</span>
            <span class="text-xs font-bold text-cyan-400 bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-slate-950 px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-all flex items-center gap-1">
              Play ➔
            </span>
          </div>
        </a>
      `;
    }).join('');

    const footerHtml = `
      <div class="px-3.5 py-2 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
        <span>Found <strong class="text-cyan-400">${matches.length}</strong> games</span>
        <span class="hidden sm:inline">Press <kbd class="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">↵ Enter</kbd> to play top game</span>
      </div>
    `;

    searchDropdown.innerHTML = `<div class="divide-y divide-slate-800/60">${itemsHtml}</div>${footerHtml}`;
    searchDropdown.classList.remove('hidden');
  }

  function filterInPageCards(query) {
    if (!gameCards || gameCards.length === 0) return;
    const q = query.toLowerCase().trim();
    let matchCount = 0;

    gameCards.forEach((card) => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const category = (card.getAttribute('data-category') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();

      if (!q || name.includes(q) || category.includes(q) || tags.includes(q)) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = matchCount === 0 && q ? 'block' : 'none';
    }
  }

  function handleSearch(query) {
    const q = query.trim();
    if (searchClear) {
      searchClear.style.display = q ? 'flex' : 'none';
    }

    // In-page grid filter
    filterInPageCards(q);

    // Dropdown autocompletion
    const matches = filterGames(q);
    renderDropdown(matches, q);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      selectedIndex = -1;
      handleSearch(e.target.value);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim()) {
        handleSearch(searchInput.value);
      }
    });

    // Keyboard navigation in search dropdown
    searchInput.addEventListener('keydown', (e) => {
      const items = searchDropdown ? searchDropdown.querySelectorAll('.search-item') : [];
      if (!items || items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateItemSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateItemSelection(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          items[selectedIndex].click();
        } else if (items[0]) {
          items[0].click();
        }
      } else if (e.key === 'Escape') {
        if (searchDropdown) searchDropdown.classList.add('hidden');
        searchInput.blur();
      }
    });

    function updateItemSelection(items) {
      items.forEach((item, idx) => {
        if (idx === selectedIndex) {
          item.classList.add('bg-slate-800', 'ring-1', 'ring-cyan-500/50');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('bg-slate-800', 'ring-1', 'ring-cyan-500/50');
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        selectedIndex = -1;
        handleSearch('');
        searchInput.focus();
      });
    }

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (searchContainer && !searchContainer.contains(e.target)) {
        if (searchDropdown) searchDropdown.classList.add('hidden');
      }
    });

    // Handle URL Query Params like /?q=slope or /?search=retro
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || urlParams.get('search');
    if (initialQuery) {
      searchInput.value = initialQuery;
      handleSearch(initialQuery);
    }
  }

  // ==========================================
  // 2. Fullscreen Support
  // ==========================================
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const gameWrapper = document.getElementById('game-frame-wrapper') || document.getElementById('game-iframe');

  if (fullscreenBtn && gameWrapper) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (gameWrapper.requestFullscreen) {
          gameWrapper.requestFullscreen().catch((err) => console.warn('Fullscreen error:', err));
        } else if (gameWrapper.webkitRequestFullscreen) {
          gameWrapper.webkitRequestFullscreen();
        } else if (gameWrapper.msRequestFullscreen) {
          gameWrapper.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // ==========================================
  // 3. Theater Mode Toggle
  // ==========================================
  const theaterBtn = document.getElementById('btn-theater');
  const mainStage = document.getElementById('main-game-stage');

  if (theaterBtn && mainStage) {
    theaterBtn.addEventListener('click', () => {
      mainStage.classList.toggle('theater-mode');
      const isTheater = mainStage.classList.contains('theater-mode');
      theaterBtn.classList.toggle('active', isTheater);
      theaterBtn.setAttribute('aria-pressed', isTheater ? 'true' : 'false');

      if (isTheater) {
        mainStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ==========================================
  // 4. Reload Game Iframe
  // ==========================================
  const reloadBtn = document.getElementById('btn-reload');
  const gameIframe = document.getElementById('game-iframe');

  if (reloadBtn && gameIframe) {
    reloadBtn.addEventListener('click', () => {
      const currentSrc = gameIframe.src;
      gameIframe.src = 'about:blank';
      setTimeout(() => {
        gameIframe.src = currentSrc;
      }, 50);
    });
  }

  // ==========================================
  // 5. FAQ Accordions
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item details');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
});
