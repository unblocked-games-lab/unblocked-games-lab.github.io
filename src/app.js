/**
 * Unblocked Games Lab - Fast Vanilla JS Runtime
 * Size: < 2.5KB | Zero Dependencies | Instant Execution
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Search Filtering
  const searchInput = document.getElementById('search-input');
  const gameCards = document.querySelectorAll('.game-card');
  const emptyState = document.getElementById('empty-search-state');

  if (searchInput && gameCards.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      gameCards.forEach((card) => {
        const title = card.getAttribute('data-name')?.toLowerCase() || '';
        const category = card.getAttribute('data-category')?.toLowerCase() || '';
        const tags = card.getAttribute('data-tags')?.toLowerCase() || '';

        if (!query || title.includes(query) || category.includes(query) || tags.includes(query)) {
          card.style.display = '';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (emptyState) {
        emptyState.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });
  }

  // 2. Fullscreen Support
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const gameWrapper = document.getElementById('game-frame-wrapper') || document.getElementById('game-iframe');

  if (fullscreenBtn && gameWrapper) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (gameWrapper.requestFullscreen) {
          gameWrapper.requestFullscreen().catch(err => console.warn('Fullscreen error:', err));
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

  // 3. Theater Mode Toggle
  const theaterBtn = document.getElementById('btn-theater');
  const mainStage = document.getElementById('main-game-stage');

  if (theaterBtn && mainStage) {
    theaterBtn.addEventListener('click', () => {
      mainStage.classList.toggle('theater-mode');
      const isTheater = mainStage.classList.contains('theater-mode');
      theaterBtn.classList.toggle('active', isTheater);
      theaterBtn.setAttribute('aria-pressed', isTheater ? 'true' : 'false');
      
      // Auto-scroll to view when entering theater mode
      if (isTheater) {
        mainStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 4. Reload Game Iframe
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

  // 5. FAQ Accordion Click Listeners (Enhancement for details)
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
