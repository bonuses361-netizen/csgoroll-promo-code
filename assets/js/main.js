/**
 * CSGORoll Bonus - Main JavaScript
 * Version: 1.1.0
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        promoCode: 'GET3BOXES',
        affiliateLink: 'https://www.csgoroll.gg/r/get3boxes',
        copySuccessText: 'Copied!',
        copyDefaultText: 'Copy'
    };

    /**
     * Initialize all functionality
     */
    function init() {
        initMobileMenu();
        initLanguageSelector();
        initFAQ();
        initPromoCodeClick();
        initCopyButtons();
        initLatestWinners();
        initSmoothScroll();
        initScrollEffects();
    }

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');
        
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    /**
     * Language Selector
     */
    function initLanguageSelector() {
        const btn = document.querySelector('.language-btn');
        const dropdown = document.querySelector('.language-dropdown');
        
        if (!btn || !dropdown) return;

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-selector')) {
                dropdown.classList.remove('active');
            }
        });
    }

    /**
     * FAQ Accordion
     */
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
        });
    }

    /**
     * Promo Code Click - Copy AND Redirect
     */
    function initPromoCodeClick() {
        // All promo code text elements
        const promoCodeTexts = document.querySelectorAll('.promo-code-text, .sticky-code');
        
        promoCodeTexts.forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                copyAndRedirect(this);
            });
        });

        // Promo code wrapper boxes (but not the copy button inside)
        const promoCodeWrappers = document.querySelectorAll('.promo-code, .sticky-code-wrapper');
        
        promoCodeWrappers.forEach(wrapper => {
            wrapper.style.cursor = 'pointer';
            wrapper.addEventListener('click', function(e) {
                // Don't trigger if clicking the copy button
                if (e.target.classList.contains('copy-btn') || e.target.classList.contains('sticky-copy-btn')) {
                    return;
                }
                e.preventDefault();
                copyAndRedirect(this);
            });
        });
    }

    /**
     * Copy to clipboard AND redirect to affiliate link
     */
    function copyAndRedirect(element) {
        // Copy to clipboard
        copyToClipboard(CONFIG.promoCode);
        
        // Show notification
        showCopyNotification();
        
        // Show visual feedback on element
        showCopyFeedback(element);
        
        // Redirect after short delay
        setTimeout(() => {
            window.open(CONFIG.affiliateLink, '_blank', 'noopener,noreferrer');
        }, 500);
    }

    /**
     * Show copy notification popup
     */
    function showCopyNotification() {
        // Remove existing notification if any
        const existing = document.querySelector('.copy-notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.innerHTML = '✓ Code copied! Redirecting to CSGORoll...';
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    /**
     * Initialize Copy Buttons (copy only, no redirect)
     */
    function initCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn, .sticky-copy-btn');
        
        copyButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                copyToClipboard(CONFIG.promoCode);
                showButtonCopySuccess(this);
            });
        });
    }

    /**
     * Copy text to clipboard
     */
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(err => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    /**
     * Fallback copy for older browsers
     */
    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Show copy feedback on element
     */
    function showCopyFeedback(element) {
        const originalColor = element.style.color;
        element.style.color = '#10b981';
        setTimeout(() => {
            element.style.color = originalColor;
        }, 500);
    }

    /**
     * Show copy success on button
     */
    function showButtonCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = CONFIG.copySuccessText;
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    /**
     * Latest Winners Animation
     */
    function initLatestWinners() {
        const winnersScroll = document.querySelector('.winners-scroll');
        if (!winnersScroll) return;

        // Duplicate items for infinite scroll effect
        const items = winnersScroll.innerHTML;
        winnersScroll.innerHTML = items + items;

        // Update random winner periodically
        setInterval(() => {
            updateRandomWinner();
        }, 5000);
    }

    /**
     * Update a random winner
     */
    function updateRandomWinner() {
        const winnerCards = document.querySelectorAll('.winner-card');
        if (!winnerCards.length) return;

        const games = ['Crash', 'Roulette', 'Dice', 'Coinflip', 'Plinko', 'Cases', 'Upgrader', 'Case Battles'];
        const amounts = ['$25.50', '$142.30', '$87.60', '$315.40', '$56.80', '$198.20', '$423.10', '$67.90', '$892.50', '$45.30'];
        
        const randomIndex = Math.floor(Math.random() * (winnerCards.length / 2));
        const card = winnerCards[randomIndex];
        
        if (card) {
            const gameEl = card.querySelector('.winner-game');
            const amountEl = card.querySelector('.winner-amount');
            
            if (gameEl && amountEl) {
                const newGame = games[Math.floor(Math.random() * games.length)];
                const newAmount = amounts[Math.floor(Math.random() * amounts.length)];
                
                card.style.opacity = '0.5';
                setTimeout(() => {
                    gameEl.textContent = 'Won on ' + newGame;
                    amountEl.textContent = newAmount;
                    card.style.opacity = '1';
                }, 300);
            }
        }
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Scroll Effects
     */
    function initScrollEffects() {
        const header = document.querySelector('.site-header');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (header) {
                if (currentScroll > 50) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                } else {
                    header.style.boxShadow = 'none';
                }
            }
        });

        // Fade-in animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .step-card, .game-card, .faq-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose to global scope if needed
    window.CSGORollBonus = {
        copyToClipboard: copyToClipboard,
        config: CONFIG
    };

})();
