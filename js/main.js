/**
 * CSGORoll Bonus - Main JavaScript
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const faqItems = document.querySelectorAll('.faq-item');
    const copyButtons = document.querySelectorAll('[data-copy]');

    // Header Scroll Effect
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile menu when clicking a link
    function closeMobileMenuOnLinkClick(e) {
        if (e.target.matches('.nav-links a')) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // FAQ Accordion
    function handleFAQClick(e) {
        const faqItem = e.currentTarget.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(item => item.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }

    // Copy to Clipboard
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyNotification('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyNotification('Copied to clipboard!');
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    function showCopyNotification(message) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.copy-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #00ff88;
            color: #000;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Handle copy button clicks
    function handleCopyClick(e) {
        const text = e.currentTarget.dataset.copy;
        if (text) {
            copyToClipboard(text);
        }
    }

    // Smooth scroll for anchor links
    function handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Intersection Observer for animations
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            animatedElements.forEach(el => el.classList.add('animated'));
        }
    }

    // Track outbound links (for analytics)
    function trackOutboundLink(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
            // Track the click (can be connected to analytics)
            console.log('Outbound link clicked:', href);
        }
    }

    // Lazy load images
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Current year for copyright
    function updateCopyrightYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // Active navigation link
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || 
                (currentPath === '/' && href === '/') ||
                (currentPath.endsWith('/') && href === currentPath.slice(0, -1))) {
                link.classList.add('active');
            } else if (currentPath.includes(href) && href !== '/') {
                link.classList.add('active');
            }
        });
    }

    // Initialize
    function init() {
        // Event Listeners
        if (header) {
            window.addEventListener('scroll', handleHeaderScroll, { passive: true });
            handleHeaderScroll(); // Initial check
        }

        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            mainNav.addEventListener('click', closeMobileMenuOnLinkClick);
        }

        // FAQ Accordion
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', handleFAQClick);
            }
        });

        // Copy buttons
        copyButtons.forEach(btn => {
            btn.addEventListener('click', handleCopyClick);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Track outbound links
        document.querySelectorAll('a[rel*="nofollow"]').forEach(link => {
            link.addEventListener('click', trackOutboundLink);
        });

        // Initialize features
        initAnimations();
        initLazyLoading();
        updateCopyrightYear();
        setActiveNavLink();

        // Log initialization
        console.log('CSGORoll Bonus site initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
