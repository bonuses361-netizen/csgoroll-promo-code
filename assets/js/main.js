/**
 * CSGORoll Bonus Theme - Main JavaScript
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.wp-menu-toggle');
        const nav = document.querySelector('.wp-nav');
        const navLinks = document.querySelectorAll('.wp-nav__link');

        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('wp-nav--open');
            this.classList.toggle('wp-menu-toggle--active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('wp-nav--open');
                menuToggle.classList.remove('wp-menu-toggle--active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu on window resize if open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && nav.classList.contains('wp-nav--open')) {
                nav.classList.remove('wp-nav--open');
                menuToggle.classList.remove('wp-menu-toggle--active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    /**
     * FAQ Accordion
     */
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.wp-faq-item');

        faqItems.forEach(function(item) {
            const header = item.querySelector('.wp-faq-item__header');
            
            if (!header) return;

            header.addEventListener('click', function() {
                const isOpen = item.classList.contains('wp-faq-item--open');
                
                // Close all other items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('wp-faq-item--open');
                    }
                });

                // Toggle current item
                item.classList.toggle('wp-faq-item--open', !isOpen);
            });
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.wp-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Header Scroll Effect
     */
    function initHeaderScroll() {
        const header = document.querySelector('.wp-header');
        
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('wp-header--scrolled');
            } else {
                header.classList.remove('wp-header--scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    /**
     * Copy Promo Code to Clipboard
     */
    function initCopyPromoCode() {
        const copyButtons = document.querySelectorAll('[data-copy-code]');

        copyButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const code = this.getAttribute('data-copy-code');
                
                navigator.clipboard.writeText(code).then(function() {
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    button.classList.add('wp-btn--success');
                    
                    setTimeout(function() {
                        button.textContent = originalText;
                        button.classList.remove('wp-btn--success');
                    }, 2000);
                }).catch(function(err) {
                    console.error('Failed to copy:', err);
                });
            });
        });
    }

    /**
     * Animate Elements on Scroll
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if (!animatedElements.length) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('wp-animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    /**
     * Form Validation
     */
    function initFormValidation() {
        const forms = document.querySelectorAll('.wp-form');

        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = form.querySelector('.wp-form__submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(function() {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.classList.add('wp-btn--success');
                    form.reset();
                    
                    setTimeout(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.classList.remove('wp-btn--success');
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            });
        });
    }

    /**
     * Track Affiliate Link Clicks (for analytics)
     */
    function initAffiliateTracking() {
        const affiliateLinks = document.querySelectorAll('a[rel*="nofollow"]');

        affiliateLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Google Analytics event tracking (if available)
                if (typeof gtag === 'function') {
                    gtag('event', 'click', {
                        'event_category': 'Affiliate Link',
                        'event_label': this.href
                    });
                }
            });
        });
    }

    /**
     * Initialize All Functions
     */
    function init() {
        initMobileMenu();
        initFaqAccordion();
        initSmoothScroll();
        initHeaderScroll();
        initCopyPromoCode();
        initScrollAnimations();
        initFormValidation();
        initAffiliateTracking();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
