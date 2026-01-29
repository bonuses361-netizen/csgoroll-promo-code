/**
 * CSGORoll Bonus - Main JavaScript
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        promoCode: 'GET3BOXES',
        affiliateLink: 'https://www.csgoroll.gg/r/get3boxes',
        copySuccessText: 'Copied!',
        copyDefaultText: 'Copy',
        animationDuration: 300
    };

    // DOM Elements
    const elements = {
        mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
        mainNav: document.querySelector('.main-nav'),
        languageBtn: document.querySelector('.language-btn'),
        languageDropdown: document.querySelector('.language-dropdown'),
        faqItems: document.querySelectorAll('.faq-item'),
        copyButtons: document.querySelectorAll('.copy-btn, .sticky-copy-btn'),
        promoCodeElements: document.querySelectorAll('.promo-code-text, .sticky-code')
    };

    /**
     * Initialize all functionality
     */
    function init() {
        initMobileMenu();
        initLanguageSelector();
        initFAQ();
        initCopyFunctionality();
        initLatestWinners();
        initSmoothScroll();
        initScrollEffects();
    }

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        if (!elements.mobileMenuToggle || !elements.mainNav) return;

        elements.mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            elements.mainNav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
                elements.mobileMenuToggle.classList.remove('active');
                elements.mainNav.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const navLinks = elements.mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                elements.mobileMenuToggle.classList.remove('active');
                elements.mainNav.classList.remove('active');
            });
        });
    }

    /**
     * Language Selector
     */
    function initLanguageSelector() {
        if (!elements.languageBtn || !elements.languageDropdown) return;

        elements.languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            elements.languageDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-selector')) {
                elements.languageDropdown.classList.remove('active');
            }
        });
    }

    /**
     * FAQ Accordion
     */
    function initFAQ() {
        if (!elements.faqItems.length) return;

        elements.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    // Close other items
                    elements.faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }

    /**
     * Copy to Clipboard Functionality
     */
    function initCopyFunctionality() {
        // Copy buttons
        elements.copyButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                copyToClipboard(CONFIG.promoCode, this);
            });
        });

        // Promo code text elements (copy and redirect)
        elements.promoCodeElements.forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', function(e) {
                e.preventDefault();
                copyToClipboard(CONFIG.promoCode, this);
                // Redirect after short delay
                setTimeout(() => {
                    window.open(CONFIG.affiliateLink, '_blank', 'noopener,noreferrer');
                }, 300);
            });
        });

        // Make promo-code wrapper also clickable
        const promoCodeWrappers = document.querySelectorAll('.promo-code, .sticky-code-wrapper');
        promoCodeWrappers.forEach(wrapper => {
            wrapper.style.cursor = 'pointer';
            wrapper.addEventListener('click', function(e) {
                if (e.target.classList.contains('copy-btn') || e.target.classList.contains('sticky-copy-btn')) {
                    return; // Let button handle its own click
                }
                e.preventDefault();
                copyToClipboard(CONFIG.promoCode, this);
                setTimeout(() => {
                    window.open(CONFIG.affiliateLink, '_blank', 'noopener,noreferrer');
                }, 300);
            });
        });
    }

    /**
     * Copy text to clipboard
     */
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(element);
        }).catch(err => {
            // Fallback for older browsers
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
                showCopySuccess(element);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            
            document.body.removeChild(textArea);
        });
    }

    /**
     * Show copy success feedback
     */
    function showCopySuccess(element) {
        if (element.classList.contains('copy-btn') || element.classList.contains('sticky-copy-btn')) {
            const originalText = element.textContent;
            element.textContent = CONFIG.copySuccessText;
            element.classList.add('copied');
            
            setTimeout(() => {
                element.textContent = originalText;
                element.classList.remove('copied');
            }, 2000);
        } else {
            // For other elements, show a tooltip or visual feedback
            element.style.color = '#10b981';
            setTimeout(() => {
                element.style.color = '';
            }, 500);
        }
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

        // Generate random winners periodically
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
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Header shadow on scroll
            if (header) {
                if (currentScroll > 50) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                } else {
                    header.style.boxShadow = 'none';
                }
            }

            lastScroll = currentScroll;
        });

        // Intersection Observer for fade-in animations
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

    /**
     * Generate Winner Names
     */
    function generateWinnerName() {
        const adjectives = ['Lucky', 'Pro', 'Epic', 'Cool', 'Fast', 'Big', 'Wild', 'Crazy'];
        const nouns = ['Gamer', 'Player', 'Winner', 'King', 'Master', 'Ace', 'Star', 'Hero'];
        const numbers = Math.floor(Math.random() * 999);
        
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return adj + noun + numbers;
    }

    /**
     * Format Currency
     */
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    /**
     * Debounce Function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
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
