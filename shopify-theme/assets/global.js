// Mabella Arabic Theme Global JavaScript

// Sticky Header Functionality
class StickyHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.header = document.getElementById('shopify-section-header');
    this.headerBounds = {};
    this.currentScrollTop = 0;
    this.preventReveal = false;
    this.predictiveSearch = this.querySelector('predictive-search');

    this.onScrollHandler = this.onScroll.bind(this);
    this.hideHeaderOnScrollUp = () => this.preventReveal = true;

    this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
    window.addEventListener('scroll', this.onScrollHandler, false);

    this.createObserver();
  }

  disconnectedCallback() {
    this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
    window.removeEventListener('scroll', this.onScrollHandler);
  }

  createObserver() {
    let observer = new IntersectionObserver((entries, observer) => {
      this.headerBounds = entries[0].intersectionRect;
      observer.disconnect();
    });

    observer.observe(this.header);
  }

  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

    if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
      this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
      if (this.preventReveal) {
        this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
        this.preventReveal = false;
      }
    } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
      this.header.classList.add('shopify-section-header-sticky');
      this.header.classList.remove('shopify-section-header-hidden');
    } else if (scrollTop <= this.headerBounds.top) {
      this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky');
    }

    this.currentScrollTop = scrollTop;
  }
}

customElements.define('sticky-header', StickyHeader);

// Menu Drawer Functionality
class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');
    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if(!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const detailsElement = event.currentTarget.parentNode;
    const isOpen = detailsElement.hasAttribute('open');
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function addTrapFocus() {
      trapFocus(detailsElement.querySelector('[id^="Details-"] summary'), detailsElement.querySelector('ul'))
    }

    if (detailsElement === this.mainDetailsToggle) {
      if(isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(event, event.currentTarget) : this.openMenuDrawer(event.currentTarget);
    } else {
      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
        addTrapFocus();
        if (!reducedMotion || reducedMotion.matches) {
          detailsElement.classList.remove('menu-opening');
        }
      }, 100);
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach(details => {
      details.removeAttribute('open');
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
    document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);
  }

  onFocusOut(event) {
    setTimeout(() => {
      if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    detailsElement.classList.remove('menu-opening');
    detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
    removeTrapFocus();
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
        }
      }
    }

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('menu-drawer', MenuDrawer);

// Header Drawer
class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.getElementById('shopify-section-header');
    this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty('--header-bottom-position', `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`);
    this.setHeaderHeight();

    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });

    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus) {
    super.closeMenuDrawer(event, elementToFocus);
    this.resetHeaderHeight();
  }

  setHeaderHeight() {
    document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
  }

  resetHeaderHeight() {
    document.documentElement.style.setProperty('--header-height', 'auto');
  }
}

customElements.define('header-drawer', HeaderDrawer);

// Cart Notification
class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById('cart-notification');
    this.header = document.querySelector('sticky-header');
    this.onBodyClick = this.handleBodyClick.bind(this);

    this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener('click', this.close.bind(this))
    );
  }

  open() {
    this.notification.classList.add('animate', 'active');

    this.notification.addEventListener('transitionend', () => {
      this.notification.focus();
      trapFocus(this.notification);
    }, { once: true });

    document.body.addEventListener('click', this.onBodyClick);
  }

  close() {
    this.notification.classList.remove('active');
    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
    this.cartItemKey = parsedState.key;
    this.getSectionsToRender().forEach((section => {
      document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    }));

    if (this.header) this.header.reveal();
    this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
        selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
      },
      {
        id: 'cart-notification-button'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);

// Utility Functions
function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  container.setAttribute('tabindex', '-1');
  elementToFocus.focus();

  function focusTrap(event) {
    if (event.code.toUpperCase() === 'TAB') {
      if (event.target === last && !event.shiftKey) {
        event.preventDefault();
        first.focus();
      }

      if ((event.target === container || event.target === first) && event.shiftKey) {
        event.preventDefault();
        last.focus();
      }
    }

    if (event.code.toUpperCase() === 'ESCAPE') {
      elementToFocus.focus();
    }
  }

  document.addEventListener('keydown', focusTrap);
}

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('keydown', trapFocus);

  if (elementToFocus) elementToFocus.focus();
}

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  document.querySelectorAll('.animate-slide-up').forEach(el => {
    observer.observe(el);
  });
});

// Product Quick Actions
function addToCart(variantId, quantity = 1) {
  const formData = {
    'items': [{
      'id': variantId,
      'quantity': quantity
    }]
  };

  fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Update cart count
    updateCartCount();
    // Show success notification
    showNotification('تم إضافة المنتج إلى السلة بنجاح!', 'success');
    // Trigger cart notification if available
    if (window.cartNotification) {
      window.cartNotification.renderContents(data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showNotification('حدث خطأ أثناء إضافة المنتج', 'error');
  });
}

function updateCartCount() {
  fetch(window.Shopify.routes.root + 'cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartBubble = document.querySelector('.cart-count-bubble');
      const cartIcon = document.querySelector('#cart-icon-bubble');
      
      if (cartBubble) {
        cartBubble.textContent = cart.item_count;
        if (cart.item_count > 0) {
          cartBubble.style.display = 'flex';
        } else {
          cartBubble.style.display = 'none';
        }
      }
      
      // Update cart icon
      if (cartIcon && cart.item_count > 0) {
        cartIcon.classList.add('cart-has-items');
      }
    })
    .catch(error => {
      console.error('Error updating cart count:', error);
    });
}

function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.mabella-notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });

  const notification = document.createElement('div');
  notification.className = `mabella-notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

// Wishlist functionality (requires custom implementation or app)
function toggleWishlist(productId) {
  // This would integrate with a wishlist app or custom implementation
  // For now, just show a notification
  showNotification('تم إضافة المنتج إلى المفضلة!', 'success');
  
  // You can integrate with apps like Swym, Growave, or implement custom wishlist
  // Example integration:
  /*
  if (window.SwymWishlist) {
    window.SwymWishlist.addToWishlist(productId);
  }
  */
}

// Search functionality enhancement
document.addEventListener('DOMContentLoaded', function() {
  const searchInputs = document.querySelectorAll('input[type="search"]');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      // Add search suggestions or live search functionality here
      // This can integrate with Shopify's predictive search API
    });
  });
});

// Mobile menu enhancements
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('[aria-label="Menu"]');
  const mobileMenu = document.querySelector('.menu-drawer');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      document.body.classList.toggle('menu-open');
    });
  }
});

// Product image zoom on hover (for desktop)
document.addEventListener('DOMContentLoaded', function() {
  const productImages = document.querySelectorAll('.product-image');
  
  productImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    image.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});