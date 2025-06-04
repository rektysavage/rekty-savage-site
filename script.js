document.addEventListener("DOMContentLoaded", () => {
  // ====== Ticker Script ======
  const tickerText = document.querySelector(".ticker_text");
  const tickerTrack = document.querySelector(".ticker_track");
  const speed = 1;
  let x = 0;

  if (tickerText && tickerTrack) {
    fetch('/assets/ticker.txt')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(text => {
        tickerText.textContent = text.trim();
        startScroll();
      })
      .catch(error => {
        console.error('Error loading ticker text:', error);
        tickerText.textContent = 'ERROR LOADING TICKER';
        startScroll(); // still animate to avoid dead space
      });

    function startScroll() {
      const textWidth = tickerText.offsetWidth;
      const containerWidth = tickerTrack.offsetWidth;
      x = containerWidth;

      function scroll() {
        x -= speed;
        if (x <= -textWidth) x = containerWidth;
        tickerText.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(scroll);
      }

      scroll();
    }
  }

  // ====== Hamburger Menu Toggle ======
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('menu-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ====== Collapsible Content ======
  document.querySelectorAll('.collapsible').forEach(container => {
    const toggleBtn = container.querySelector('.collapsible-toggle');
    const content = container.querySelector('.collapsible-content');

    if (!toggleBtn || !content) return;

    toggleBtn.addEventListener('click', () => {
      const isExpanded = container.classList.contains('expanded');
      container.classList.toggle('expanded', !isExpanded);
      container.classList.toggle('collapsed', isExpanded);
      toggleBtn.textContent = isExpanded ? 'See More' : 'See Less';
    });
  });

  // ====== Meme Scroller ======
  const carousel = document.querySelector('.memes-carousel');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  if (carousel && leftArrow && rightArrow) {
    function getScrollAmount() {
      const meme = carousel.querySelector('img');
      if (!meme) return 260;
      const style = getComputedStyle(meme);
      const gap = parseInt(style.marginRight || 0) || 16;
      return meme.offsetWidth + gap;
    }

    leftArrow.addEventListener('click', () => {
      carousel.scrollLeft -= getScrollAmount();
    });

    rightArrow.addEventListener('click', () => {
      carousel.scrollLeft += getScrollAmount();
    });
  }

  // ====== Meme Interactions ======
  document.querySelectorAll('.save-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const url = button.dataset.img;
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop();
      link.click();
      e.stopPropagation();
    });
  });

  document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const url = button.dataset.img;
      navigator.clipboard.writeText(window.location.origin + '/' + url).then(() => {
        alert('Image link copied!');
      });
      e.stopPropagation();
    });
  });

  document.querySelectorAll('.meme-card').forEach(card => {
    card.addEventListener('click', () => {
      const overlay = card.querySelector('.meme-overlay');
      if (!overlay) return;
      overlay.style.opacity = 1;
      setTimeout(() => {
        overlay.style.opacity = 0;
      }, 3000);
    });
  });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    const startPosition = window.scrollY || window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + startPosition;
    const duration = 1000; // ← Increase this for slower scroll (e.g. 1000ms = 1s)
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const scrollTo = startPosition + (targetPosition - startPosition) * ease;

      window.scrollTo(0, scrollTo);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  });
});





// ====== Hero Image Load (outside DOMContentLoaded is okay because 'load' waits) ======
window.addEventListener("load", function () {
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    heroImage.classList.add("loaded");
  }

  const ctaContainer = document.querySelector(".cta-buttons");
  const buyWrap = document.querySelector(".buy-rekty");
  const promoBanner = document.querySelector(".promo-banner");

  if (ctaContainer) {
    ctaContainer.classList.add("loaded");
  }

  if (promoBanner) {
    setTimeout(() => {
      promoBanner.classList.add("loaded");
    }, 400);
  }

  if (buyWrap) {
    setInterval(() => {
      if (!buyWrap.matches(':hover')) {
        buyWrap.classList.add("animate-wiggle");
        setTimeout(() => {
          buyWrap.classList.remove("animate-wiggle");
        }, 400);
      }
    }, 8000);
  }
});
