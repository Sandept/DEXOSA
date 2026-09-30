/**
 * DEXOSA - SIGNATURE OUTFITS & DETAILING
 * Pure Vanilla JavaScript Controller
 * Vibrant Gradient Backgrounds, Dynamic Product Detailing,
 * Flight Path Transitions, Scroll/Touch/Keyboard Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // Configuration & 7 Product Definitions
    // Vibrant gradient palettes: bgStart (bright center), bgMid, bgEnd (deeper edge)
    // -------------------------------------------------------------------------
    const slides = [
        {
            id: 0,
            name: 'Full Outfit',
            buttonLabel: 'Get the look',
            category: '✯ FULL OUTFIT ✯',
            headline: 'DSP INBARAJ',
            description: 'Inspired by the cinematic world of the movie "SCENE" — a signature head-to-toe ensemble designed with effortless proportion, capturing the bold charisma, dark tailored elegance, and distinctive on-screen character aesthetic.',
            sizes: ['S', 'M', 'L', 'XL'],
            price: '$480',
            priceRegular: '$620',
            image: 'images/Full_Outfit.png',
            sizeLinks: {
                'default': 'https://link.amazon/B08sWMcLo'
            },
            bgStart: '#FCCC6A',
            bgMid: '#D4953A',
            bgEnd: '#8C5A14',
            glow: 'rgba(252, 204, 106, 0.50)',
            accent: '#FFD876',
            shadowTop: '94%',
            shadowWidth: '380px',
            shadowHeight: '42px',
            shadowOpacity: '0.85',
            shadowMobileTop: '80%',
            shadowMobileWidth: '290px'
        },
        {
            id: 1,
            name: 'T-Shirt',
            buttonLabel: 'T - Shirt',
            category: '01 / HEAVYWEIGHT APPAREL',
            headline: 'T-Shirt',
            description: 'Cut from 280 GSM luxury combed organic cotton with relaxed drop shoulders and contemporary boxy silhouette. Screen printed with high-density archival graphics.',
            sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
            price: '$120',
            priceRegular: '$160',
            image: 'images/T-Shirt.png',
            sizeLinks: {
                'default': 'https://link.amazon/B08sWMcLo'
            },
            bgStart: '#7CB8F8',
            bgMid: '#3B82F6',
            bgEnd: '#1A55B8',
            glow: 'rgba(124, 184, 248, 0.50)',
            accent: '#93C5FD',
            shadowTop: '88%',
            shadowWidth: '440px',
            shadowHeight: '42px',
            shadowOpacity: '0.85',
            shadowMobileTop: '78%',
            shadowMobileWidth: '300px'
        },
        {
            id: 2,
            name: 'Cargo Shorts',
            buttonLabel: 'Cargo Shorts',
            category: '02 / RELAXED APPAREL',
            headline: 'Cargo Shorts',
            description: 'Engineered in heavyweight French terry with deep utility pockets and elongated custom dip-dyed drawstrings. Tailored with a relaxed above-the-knee break.',
            sizes: ['S', 'M', 'L', 'XL', '2X', '3X'],
            price: '$140',
            priceRegular: '$190',
            image: 'images/Shots.png',
            sizeLinks: {
                'S': 'https://link.amazon/B07LYNn0x',
                'M': 'https://link.amazon/B0fjM0iPn',
                'L': 'https://link.amazon/B0i18JMKZ',
                'XL': 'https://link.amazon/B07c2DPu9',
                '2X': 'https://link.amazon/B02gqHcv3',
                '3X': 'https://link.amazon/B0hf3K6Cs',
                'default': 'https://link.amazon/B07LYNn0x'
            },
            bgStart: '#F4A87A',
            bgMid: '#E07B3A',
            bgEnd: '#A04C18',
            glow: 'rgba(244, 168, 122, 0.50)',
            accent: '#FDBA8C',
            shadowTop: '88%',
            shadowWidth: '390px',
            shadowHeight: '40px',
            shadowOpacity: '0.85',
            shadowMobileTop: '77%',
            shadowMobileWidth: '280px'
        },
        {
            id: 3,
            name: 'Watch',
            buttonLabel: 'Watch',
            category: '03 / LUXURY TIMEPIECE',
            headline: 'Watch',
            description: 'Brushed surgical steel case with anti-reflective sapphire crystal and Japanese precision chronograph movement. Finished with a textured silicone deployment strap.',
            sizes: ['40mm', '42mm'],
            price: '$320',
            priceRegular: '$420',
            image: 'images/Watch.png',
            sizeLinks: {
                '40mm': 'https://link.amazon/B02XeFEnZ',
                '42mm': 'https://link.amazon/B0hLEjODz',
                'default': 'https://link.amazon/B02XeFEnZ'
            },
            bgStart: '#5ED8A8',
            bgMid: '#2EAA80',
            bgEnd: '#1A7A5A',
            glow: 'rgba(94, 216, 168, 0.50)',
            accent: '#86EFAC',
            shadowTop: '90%',
            shadowWidth: '300px',
            shadowHeight: '36px',
            shadowOpacity: '0.85',
            shadowMobileTop: '78%',
            shadowMobileWidth: '240px'
        },
        {
            id: 4,
            name: 'Bracelet',
            buttonLabel: 'Bracelet',
            category: '04 / SIGNATURE HARDWARE',
            headline: 'Bracelet',
            description: 'Hand-finished matte obsidian and brushed alloy accents strung with military-grade elastomeric cord. Distinctive whether worn solo or stacked.',
            sizes: ['S/M', 'M/L'],
            price: '$85',
            priceRegular: '$115',
            image: 'images/Bracelet.png',
            sizeLinks: {
                'default': 'https://link.amazon/B0aUlq48V'
            },
            bgStart: '#C9A0F0',
            bgMid: '#9966CC',
            bgEnd: '#5E3A8C',
            glow: 'rgba(201, 160, 240, 0.50)',
            accent: '#D4B5F5',
            shadowTop: '80%',
            shadowWidth: '290px',
            shadowHeight: '36px',
            shadowOpacity: '0.85',
            shadowMobileTop: '70%',
            shadowMobileWidth: '240px'
        },
        {
            id: 5,
            name: 'Key Chain',
            buttonLabel: 'Key Chain',
            category: '05 / LEATHER DETAILING',
            headline: 'Key Chain & Knife',
            description: 'Custom debossed full-grain calfskin leather finished with spring-loaded gunmetal carabiner clasp and laser-engraved hardware detailing.',
            sizes: ['Key Chain', 'Knife'],
            price: '$45',
            priceRegular: '$65',
            image: 'images/Key_Chain.png',
            sizeLinks: {
                'Key Chain': 'https://link.amazon/B0fgS8qbq',
                'Knife': 'https://link.amazon/B0aMB2WUm',
                'ONE SIZE': 'https://link.amazon/B0fgS8qbq',
                'default': 'https://link.amazon/B0fgS8qbq'
            },
            bgStart: '#F4C080',
            bgMid: '#D4883A',
            bgEnd: '#8C5518',
            glow: 'rgba(244, 192, 128, 0.50)',
            accent: '#F5D49A',
            shadowTop: '85%',
            shadowWidth: '300px',
            shadowHeight: '38px',
            shadowOpacity: '0.85',
            shadowMobileTop: '76%',
            shadowMobileWidth: '250px'
        },
        {
            id: 6,
            name: 'Slide',
            buttonLabel: 'Slide',
            category: '06 / ERGONOMIC FOOTWEAR',
            headline: 'Slide',
            description: 'High-resilience dual-density molded EVA foam footbed with textured arch support and anti-slip grooved outsole for supreme indoor and street ease.',
            sizes: ['7', '8', '9', '10', '11'],
            price: '$95',
            priceRegular: '$130',
            image: 'images/Slide.png',
            sizeLinks: {
                '7': 'https://link.amazon/B029bAkpf',
                '8': 'https://link.amazon/B0i6vZNwq',
                '9': 'https://link.amazon/B0dx8o3hA',
                '10': 'https://link.amazon/B008qWWKI',
                '11': 'https://link.amazon/B0cPtonSz',
                'default': 'https://link.amazon/B029bAkpf'
            },
            bgStart: '#F4A098',
            bgMid: '#E85D4A',
            bgEnd: '#A83020',
            glow: 'rgba(244, 160, 152, 0.50)',
            accent: '#FCA5A5',
            shadowTop: '82%',
            shadowWidth: '410px',
            shadowHeight: '42px',
            shadowOpacity: '0.85',
            shadowMobileTop: '71%',
            shadowMobileWidth: '300px'
        }
    ];

    let currentIndex = 0;
    let isTransitioning = false;
    let isSizePopupOpen = false;
    const transitionDuration = 650; // ms debounce window

    // DOM Elements
    const bgContainer = document.getElementById('bg-container');
    const productElements = [
        document.getElementById('item-0'),
        document.getElementById('item-1'),
        document.getElementById('item-2'),
        document.getElementById('item-3'),
        document.getElementById('item-4'),
        document.getElementById('item-5'),
        document.getElementById('item-6')
    ];

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderArrows = document.getElementById('slider-arrows');

    // Dynamic Text Elements
    const categoryEl = document.getElementById('product-category');
    const titleEl = document.getElementById('product-title');
    const descEl = document.getElementById('product-description');
    const navItems = document.querySelectorAll('.nav-item');

    // CTA & Size Popup Elements
    const desktopCtaBtn = document.getElementById('desktop-cta-btn');
    const desktopCtaText = document.getElementById('desktop-cta-text');
    const desktopSizePopup = document.getElementById('desktop-size-popup');
    const desktopSizeOptions = document.getElementById('desktop-size-options');
    const desktopShopBtn = document.getElementById('desktop-shop-btn');

    const mobileCtaBtn = document.getElementById('mobile-cta-btn');
    const mobileCtaText = document.getElementById('mobile-cta-text');
    const mobileSizePopup = document.getElementById('mobile-size-popup');
    const mobileSizeOptions = document.getElementById('mobile-size-options');
    const mobileShopBtn = document.getElementById('mobile-shop-btn');

    // Toast Notification Elements
    const shopToast = document.getElementById('shop-toast');
    const toastText = document.getElementById('toast-text');

    const root = document.documentElement;

    // -------------------------------------------------------------------------
    // Toast Notification Helper
    // -------------------------------------------------------------------------
    let toastTimer = null;
    function showToast(msg) {
        if (!shopToast || !toastText) return;
        toastText.textContent = msg;
        shopToast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            shopToast.classList.remove('show');
        }, 2600);
    }

    // -------------------------------------------------------------------------
    // Size Popup Renderer & Toggler
    // -------------------------------------------------------------------------
    function renderSizePopupOptions(sizes) {
        const currentSlide = slides[currentIndex];
        const hasSelection = Boolean(currentSlide.selectedSize);

        // Reflect current selection status on size popups
        if (desktopSizePopup) desktopSizePopup.classList.toggle('has-selection', hasSelection);
        if (mobileSizePopup) mobileSizePopup.classList.toggle('has-selection', hasSelection);

        [desktopSizeOptions, mobileSizeOptions].forEach(container => {
            if (!container) return;
            container.innerHTML = '';
            sizes.forEach((size) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                const isSelected = currentSlide.selectedSize === size;
                btn.className = 'size-chip' + (isSelected ? ' active' : '');
                btn.setAttribute('role', 'radio');
                btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
                btn.setAttribute('data-size', size);
                btn.textContent = size;
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectSize(size);
                });
                container.appendChild(btn);
            });
        });
    }

    function selectSize(size) {
        const currentSlide = slides[currentIndex];
        currentSlide.selectedSize = size;

        [desktopSizeOptions, mobileSizeOptions].forEach(container => {
            if (!container) return;
            container.querySelectorAll('.size-chip').forEach(b => {
                const matches = b.getAttribute('data-size') === size;
                b.classList.toggle('active', matches);
                b.setAttribute('aria-checked', matches ? 'true' : 'false');
                if (matches) {
                    b.classList.remove('pulse');
                    void b.offsetWidth; // re-trigger animation
                    b.classList.add('pulse');
                }
            });
        });

        // Reveal the "Shop" button dynamically
        if (desktopSizePopup) desktopSizePopup.classList.add('has-selection');
        if (mobileSizePopup) mobileSizePopup.classList.add('has-selection');

        showToast(`${currentSlide.name} (${size}) chosen • Tap "Shop" to order`);
    }

    // -------------------------------------------------------------------------
    // Direct E-Commerce Shop Navigation Handler
    // -------------------------------------------------------------------------
    function handleShopClick(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const currentSlide = slides[currentIndex];
        const size = currentSlide.selectedSize || currentSlide.sizes[0];

        // Find destination link based on selected size
        let targetUrl = '';
        if (currentSlide.sizeLinks) {
            targetUrl = currentSlide.sizeLinks[size] || currentSlide.sizeLinks['default'] || '';
        }

        if (targetUrl) {
            showToast(`Opening ${currentSlide.name} (${size}) on Amazon...`);
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
    }

    function closeSizePopups() {
        isSizePopupOpen = false;
        if (desktopSizePopup) {
            desktopSizePopup.classList.remove('open');
            desktopSizePopup.setAttribute('aria-hidden', 'true');
        }
        if (mobileSizePopup) {
            mobileSizePopup.classList.remove('open');
            mobileSizePopup.setAttribute('aria-hidden', 'true');
        }
        if (desktopCtaBtn) desktopCtaBtn.classList.remove('popup-active');
        if (mobileCtaBtn) mobileCtaBtn.classList.remove('popup-active');
    }

    function toggleSizePopups() {
        isSizePopupOpen = !isSizePopupOpen;
        if (desktopSizePopup) {
            desktopSizePopup.classList.toggle('open', isSizePopupOpen);
            desktopSizePopup.setAttribute('aria-hidden', !isSizePopupOpen);
        }
        if (mobileSizePopup) {
            mobileSizePopup.classList.toggle('open', isSizePopupOpen);
            mobileSizePopup.setAttribute('aria-hidden', !isSizePopupOpen);
        }
        if (desktopCtaBtn) desktopCtaBtn.classList.toggle('popup-active', isSizePopupOpen);
        if (mobileCtaBtn) mobileCtaBtn.classList.toggle('popup-active', isSizePopupOpen);
    }

    // Document click to close popups when clicking outside
    document.addEventListener('click', (e) => {
        if (!isSizePopupOpen) return;
        const isClickInside = (desktopCtaBtn && desktopCtaBtn.contains(e.target)) ||
            (desktopSizePopup && desktopSizePopup.contains(e.target)) ||
            (mobileCtaBtn && mobileCtaBtn.contains(e.target)) ||
            (mobileSizePopup && mobileSizePopup.contains(e.target));
        if (!isClickInside) {
            closeSizePopups();
        }
    });

    // CTA Button Click Handler
    function handleCtaClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (currentIndex === 0) {
            // Requirement 2: Compulsory click on "Get the Look >" button goes to T-Shirt (slide 1)
            closeSizePopups();
            goToSlide(1);
        } else {
            // Requirement 5: On 2nd to last page products (slides 1 to 6), clicking toggles the size popup side of the button
            toggleSizePopups();
        }
    }

    if (desktopCtaBtn) desktopCtaBtn.addEventListener('click', handleCtaClick);
    if (mobileCtaBtn) mobileCtaBtn.addEventListener('click', handleCtaClick);

    // -------------------------------------------------------------------------
    // Slide Navigation & Flight Path State Engine
    // -------------------------------------------------------------------------
    function goToSlide(targetIndex) {
        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
        }

        if (targetIndex === currentIndex && root.style.getPropertyValue('--bg-start')) {
            return;
        }

        isTransitioning = true;
        closeSizePopups();
        currentIndex = targetIndex;
        const currentSlide = slides[currentIndex];

        // 1. Smoothly update gradient & shadow CSS custom properties
        root.style.setProperty('--bg-start', currentSlide.bgStart);
        root.style.setProperty('--bg-mid', currentSlide.bgMid);
        root.style.setProperty('--bg-end', currentSlide.bgEnd);
        root.style.setProperty('--glow-color', currentSlide.glow);
        root.style.setProperty('--current-accent', currentSlide.accent);
        root.style.setProperty('--shadow-top', currentSlide.shadowTop);
        root.style.setProperty('--shadow-width', currentSlide.shadowWidth);
        root.style.setProperty('--shadow-height', currentSlide.shadowHeight || '42px');
        root.style.setProperty('--shadow-opacity', currentSlide.shadowOpacity || '0.85');
        root.style.setProperty('--shadow-mobile-top', currentSlide.shadowMobileTop || '71%');
        root.style.setProperty('--shadow-mobile-width', currentSlide.shadowMobileWidth || '290px');

        // Hide slider arrows on first page (Full Outfit)
        if (sliderArrows) {
            if (currentIndex === 0) {
                sliderArrows.classList.add('arrows-hidden');
            } else {
                sliderArrows.classList.remove('arrows-hidden');
            }
        }

        // Toggle COP Reveal HUD visibility (only visible on Slide 0: Full Outfit)
        const copHudEl = document.getElementById('cop-reveal-hud');
        const mobileCopHudEl = document.getElementById('mobile-cop-hud');
        if (currentIndex === 0) {
            if (copHudEl) copHudEl.classList.remove('hud-hidden');
            if (mobileCopHudEl) mobileCopHudEl.classList.remove('hud-hidden');
        } else {
            if (copHudEl) copHudEl.classList.add('hud-hidden');
            if (mobileCopHudEl) mobileCopHudEl.classList.add('hud-hidden');
            if (typeof deactivateAllCopPortions === 'function') {
                deactivateAllCopPortions();
            }
        }

        // 2. Animate and update dynamic product texts with fade
        const textElements = [categoryEl, titleEl, descEl];
        textElements.forEach(el => {
            if (el) el.classList.add('fade-out');
        });

        setTimeout(() => {
            if (categoryEl) categoryEl.textContent = currentSlide.category;
            if (titleEl) titleEl.textContent = currentSlide.headline;
            if (descEl) descEl.textContent = currentSlide.description;

            // Requirement 4: "Get the look >" button only in First page, respective product name in other sections
            const label = currentSlide.buttonLabel || (currentIndex === 0 ? 'Get the look' : currentSlide.name);
            if (desktopCtaText) desktopCtaText.textContent = label;
            if (mobileCtaText) mobileCtaText.textContent = label;

            // Update arrow icon behavior: slide 0 is forward arrow, slides 1-6 is size popup dropdown indicator
            const ctaArrows = document.querySelectorAll('.cta-arrow-icon');
            ctaArrows.forEach(icon => {
                if (currentIndex === 0) {
                    icon.classList.remove('icon-dropdown');
                } else {
                    icon.classList.add('icon-dropdown');
                }
            });

            // Update size popup options for current product
            renderSizePopupOptions(currentSlide.sizes);

            textElements.forEach(el => {
                if (el) el.classList.remove('fade-out');
            });
        }, 180);

        // 3. Update Flight Path states for each product item
        const previewIndex = (currentIndex + 1) % slides.length;
        const pastIndex = (currentIndex - 1 + slides.length) % slides.length;

        productElements.forEach((item, i) => {
            if (!item) return;
            item.classList.remove('state-main', 'state-preview', 'state-past', 'state-future');

            if (i === currentIndex) {
                item.classList.add('state-main');
            } else if (i === previewIndex) {
                item.classList.add('state-preview');
            } else if (i === pastIndex) {
                item.classList.add('state-past');
            } else {
                item.classList.add('state-future');
            }
        });

        // Release transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDuration);
    }

    function nextSlide() {
        if (isTransitioning) return;
        // Requirement 2: Compulsory click on "Get the Look >" on First page. No scroll/swipe/next.
        if (currentIndex === 0) {
            return;
        }
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        if (isTransitioning) return;
        if (currentIndex === 0) {
            return;
        }
        goToSlide(currentIndex - 1);
    }

    // -------------------------------------------------------------------------
    // Event Listeners: Navigation Controls
    // -------------------------------------------------------------------------
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }

    // Direct click on the preview item at bottom right jumps to next slide (only from slide 1 onwards)
    productElements.forEach((item) => {
        if (!item) return;
        item.addEventListener('click', (e) => {
            if (currentIndex === 0) return; // Locked on slide 0
            if (item.classList.contains('state-preview')) {
                e.stopPropagation();
                nextSlide();
            }
        });
    });

    // -------------------------------------------------------------------------
    // Mouse Wheel Scroll (Smooth continuous scroll, disabled on slide 0)
    // -------------------------------------------------------------------------
    let wheelAccumulator = 0;
    const wheelThreshold = 35;

    window.addEventListener('wheel', (e) => {
        // Requirement 2: User must click "Get the look >" on slide 0. Wheel is disabled.
        if (currentIndex === 0) {
            wheelAccumulator = 0;
            return;
        }

        wheelAccumulator += e.deltaY;

        if (Math.abs(wheelAccumulator) >= wheelThreshold) {
            if (wheelAccumulator > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            wheelAccumulator = 0;
        }
    }, { passive: true });

    // -------------------------------------------------------------------------
    // Keyboard Navigation (disabled on slide 0)
    // -------------------------------------------------------------------------
    window.addEventListener('keydown', (e) => {
        // Requirement 2: User must click "Get the look >" on slide 0. Keyboard is disabled.
        if (currentIndex === 0) {
            return;
        }

        if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
            e.preventDefault();
            nextSlide();
        } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
            e.preventDefault();
            prevSlide();
        }
    });

    // -------------------------------------------------------------------------
    // Touch Gestures (Mobile Swipe Detection, disabled on slide 0)
    // -------------------------------------------------------------------------
    let touchStartY = 0;
    let touchStartX = 0;
    const touchMinDistance = 35;

    window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        // Requirement 2: User must click "Get the look >" on slide 0. Swipe is disabled.
        if (currentIndex === 0) {
            return;
        }

        if (!e.changedTouches || e.changedTouches.length === 0) return;

        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;

        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffY) > Math.abs(diffX)) {
            if (Math.abs(diffY) >= touchMinDistance) {
                if (diffY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        } else {
            if (Math.abs(diffX) >= touchMinDistance) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }, { passive: true });

    // -------------------------------------------------------------------------
    // About Modal Dialog Controls & Background Blur
    // -------------------------------------------------------------------------
    const navAboutBtn = document.getElementById('nav-about');
    const navOutfitsBtn = document.getElementById('nav-outfits');
    const mobileAboutBtn = document.getElementById('mobile-about-btn');
    const aboutModal = document.getElementById('about-modal');
    const aboutCloseBtn = document.getElementById('about-close-btn');
    const aboutBackdrop = document.getElementById('about-modal-backdrop');

    function openAboutModal() {
        // Requirement 2: Pop-up page opens in the same first page
        if (currentIndex !== 0) {
            goToSlide(0);
        }
        if (aboutModal) {
            aboutModal.classList.add('open');
            aboutModal.setAttribute('aria-hidden', 'false');
        }
        if (navAboutBtn) navAboutBtn.classList.add('active');
        if (navOutfitsBtn) navOutfitsBtn.classList.remove('active');
    }

    function closeAboutModal() {
        if (aboutModal) {
            aboutModal.classList.remove('open');
            aboutModal.setAttribute('aria-hidden', 'true');
        }
        if (navAboutBtn) navAboutBtn.classList.remove('active');
        if (navOutfitsBtn) navOutfitsBtn.classList.add('active');
    }

    if (navAboutBtn) {
        navAboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAboutModal();
        });
    }

    if (mobileAboutBtn) {
        mobileAboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAboutModal();
        });
    }

    if (navOutfitsBtn) {
        navOutfitsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAboutModal();
            goToSlide(0);
        });
    }

    if (aboutCloseBtn) {
        aboutCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAboutModal();
        });
    }

    if (aboutBackdrop) {
        aboutBackdrop.addEventListener('click', () => {
            closeAboutModal();
        });
    }

    // -------------------------------------------------------------------------
    // Shop Button Direct E-Commerce Navigation Listeners
    // -------------------------------------------------------------------------
    if (desktopShopBtn) {
        desktopShopBtn.addEventListener('click', handleShopClick);
    }

    if (mobileShopBtn) {
        mobileShopBtn.addEventListener('click', handleShopClick);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutModal && aboutModal.classList.contains('open')) {
            closeAboutModal();
        }
    });

    // -------------------------------------------------------------------------
    // Requirement 3: Dexosa Logo 3-Second Spin on Tap/Click
    // -------------------------------------------------------------------------
    const dexosaSpinBtn = document.getElementById('dexosa-spin-btn');
    const dexosaLogoImg = document.querySelector('.dexosa-logo-link .social-icon-img');

    if (dexosaSpinBtn && dexosaLogoImg) {
        dexosaSpinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (dexosaLogoImg.classList.contains('spinning')) return;
            dexosaLogoImg.classList.add('spinning');
            setTimeout(() => {
                dexosaLogoImg.classList.remove('spinning');
            }, 3000);
        });
    }

    // -------------------------------------------------------------------------
    // DSP Inbaraj COP Uniform Interactive Liquid 3D WebGL Reveal
    // Swipe or touch the Full Outfit image to reveal COP uniform (2s fade)
    // -------------------------------------------------------------------------
    function initWebGLReveal() {
        const canvas = document.getElementById('liquid-reveal-canvas');
        const touchSurface = document.getElementById('reveal-touch-surface');
        if (!canvas || !touchSurface) return;
        
        const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) return;

        // Mask Canvas (2D) for interactive brush strokes
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = 256;
        maskCanvas.height = 512;
        const maskCtx = maskCanvas.getContext('2d');

        let texCiv, texCop, texMask;
        
        function loadImage(src, base64Fallback) {
            return new Promise(resolve => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => {
                    // If regular load fails (e.g. CORS on file://), use the base64 string
                    if (base64Fallback) {
                        const fallbackImg = new Image();
                        fallbackImg.onload = () => resolve(fallbackImg);
                        fallbackImg.onerror = () => resolve(fallbackImg);
                        fallbackImg.src = base64Fallback;
                    } else {
                        resolve(img);
                    }
                };
                // Try regular path first
                img.src = src;
                if (img.complete && img.naturalWidth > 0) resolve(img);
            });
        }

        const civB64 = window.FULL_OUTFIT_B64 || null;
        const copB64 = window.COP_B64 || null;

        Promise.all([
            loadImage('images/Full_Outfit.png', civB64),
            loadImage('images/COP.png', copB64)
        ]).then(([imgCiv, imgCop]) => {
            // Match canvas size to image aspect, high enough resolution
            canvas.width = imgCiv.width || 1024;
            canvas.height = imgCiv.height || 1024;
            
            // Setup WebGL
            const vsSource = `
                attribute vec2 a_position;
                varying vec2 v_texCoord;
                void main() {
                    gl_Position = vec4(a_position, 0.0, 1.0);
                    v_texCoord = a_position * 0.5 + 0.5;
                    v_texCoord.y = 1.0 - v_texCoord.y; // flip Y
                }
            `;

            const fsSource = `
                precision mediump float;
                varying vec2 v_texCoord;
                uniform sampler2D u_texCiv;
                uniform sampler2D u_texCop;
                uniform sampler2D u_texMask;
                uniform float u_time;

                // Simple 2D noise
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
                float snoise(vec2 v) {
                  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                  vec2 i  = floor(v + dot(v, C.yy) );
                  vec2 x0 = v -   i + dot(i, C.xx);
                  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                  vec4 x12 = x0.xyxy + C.xxzz;
                  x12.xy -= i1;
                  i = mod289(i);
                  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                  m = m*m; m = m*m;
                  vec3 x = 2.0 * fract(p * C.www) - 1.0;
                  vec3 h = abs(x) - 0.5;
                  vec3 ox = floor(x + 0.5);
                  vec3 a0 = x - ox;
                  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                  vec3 g;
                  g.x  = a0.x  * x0.x  + h.x  * x0.y;
                  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                  return 130.0 * dot(m, g);
                }

                void main() {
                    float mask = texture2D(u_texMask, v_texCoord).r;
                    
                    // Add fluid noise to mask
                    float noiseVal = snoise(v_texCoord * 8.0 + u_time * 1.2);
                    float distortedMask = smoothstep(0.1, 0.8, mask + noiseVal * 0.3 * mask);
                    
                    // Liquid distortion amount based on mask edge
                    float edge = smoothstep(0.0, 0.2, distortedMask) - smoothstep(0.7, 1.0, distortedMask);
                    vec2 distortion = vec2(snoise(v_texCoord * 15.0 - u_time), snoise(v_texCoord * 15.0 + u_time)) * 0.03 * edge;
                    
                    vec2 uv = v_texCoord + distortion;
                    
                    vec4 civColor = texture2D(u_texCiv, uv);
                    vec4 copColor = texture2D(u_texCop, uv);
                    
                    // Glassy edge highlight
                    vec4 glass = vec4(0.8, 0.9, 1.0, 1.0) * edge * 0.6;
                    
                    vec3 finalColor = mix(civColor.rgb, copColor.rgb, distortedMask) + glass.rgb * copColor.a;
                    float outAlpha = mix(civColor.a, copColor.a, distortedMask);
                    
                    gl_FragColor = vec4(finalColor, outAlpha);
                }
            `;

            function compileShader(type, source) {
                const s = gl.createShader(type);
                gl.shaderSource(s, source);
                gl.compileShader(s);
                if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                    console.error('WebGL Compile Error:', gl.getShaderInfoLog(s));
                }
                return s;
            }

            const program = gl.createProgram();
            gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
            gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
            gl.linkProgram(program);
            gl.useProgram(program);

            const posBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1, -1,  1, -1,  -1, 1,
                -1, 1,   1, -1,   1, 1
            ]), gl.STATIC_DRAW);

            const posAttr = gl.getAttribLocation(program, 'a_position');
            gl.enableVertexAttribArray(posAttr);
            gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

            function createTexture(image, unit, base64Fallback) {
                const tex = gl.createTexture();
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                
                // Initialize with 1x1 transparent pixel so it doesn't render black while loading/failing
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,0]));

                if(image) {
                    try {
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                    } catch (e) {
                        console.warn('WebGL CORS error, switching to base64 data URI.');
                        if (base64Fallback) {
                            const fb = new Image();
                            fb.onload = () => {
                                gl.activeTexture(gl.TEXTURE0 + unit);
                                gl.bindTexture(gl.TEXTURE_2D, tex);
                                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fb);
                            };
                            fb.src = base64Fallback;
                        }
                    }
                }
                return tex;
            }

            texCiv = createTexture(imgCiv, 0, civB64);
            texCop = createTexture(imgCop, 1, copB64);
            
            // Mask texture
            texMask = gl.createTexture();
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, texMask);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.uniform1i(gl.getUniformLocation(program, 'u_texCiv'), 0);
            gl.uniform1i(gl.getUniformLocation(program, 'u_texCop'), 1);
            gl.uniform1i(gl.getUniformLocation(program, 'u_texMask'), 2);

            const timeLoc = gl.getUniformLocation(program, 'u_time');

            // Splats for interaction
            const splats = [];
            let lastPos = null;

            function addSplat(x, y) {
                splats.push({ x, y, t: performance.now() });
            }

            function handlePointer(e) {
                if (currentIndex !== 0) return;
                const rect = touchSurface.getBoundingClientRect();
                let clientX, clientY;
                if (e.touches && e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }
                const x = (clientX - rect.left) / rect.width;
                const y = (clientY - rect.top) / rect.height;
                
                if (lastPos) {
                    const dist = Math.hypot(x - lastPos.x, y - lastPos.y);
                    const steps = Math.ceil(dist / 0.02);
                    for(let i=1; i<=steps; i++) {
                        addSplat(
                            lastPos.x + (x - lastPos.x) * (i/steps),
                            lastPos.y + (y - lastPos.y) * (i/steps)
                        );
                    }
                } else {
                    addSplat(x, y);
                }
                lastPos = {x, y};
            }

            touchSurface.addEventListener('mouseenter', (e) => { lastPos = null; handlePointer(e); });
            touchSurface.addEventListener('mouseleave', () => { lastPos = null; });
            touchSurface.addEventListener('mousemove', (e) => { handlePointer(e); });

            touchSurface.addEventListener('touchstart', (e) => { lastPos = null; handlePointer(e); }, {passive: true});
            touchSurface.addEventListener('touchmove', (e) => { handlePointer(e); }, {passive: true});
            touchSurface.addEventListener('touchend', () => { lastPos = null; });

            function render(time) {
                gl.uniform1f(timeLoc, time * 0.001);

                // Update Mask Canvas
                maskCtx.fillStyle = 'black';
                maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

                const now = performance.now();
                const radiusX = maskCanvas.width * 0.22;
                const radiusY = maskCanvas.height * 0.12;
                const radius = Math.max(radiusX, radiusY);
                
                for (let i = splats.length - 1; i >= 0; i--) {
                    const s = splats[i];
                    const age = now - s.t;
                    if (age > 2000) { // 2 seconds fade
                        splats.splice(i, 1);
                        continue;
                    }
                    // Ease out alpha
                    const alpha = Math.pow(1 - (age / 2000), 1.5);
                    
                    const grad = maskCtx.createRadialGradient(
                        s.x * maskCanvas.width, s.y * maskCanvas.height, 0,
                        s.x * maskCanvas.width, s.y * maskCanvas.height, radius
                    );
                    grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
                    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    
                    maskCtx.fillStyle = grad;
                    maskCtx.beginPath();
                    // Draw elliptical splat
                    maskCtx.ellipse(s.x * maskCanvas.width, s.y * maskCanvas.height, radiusX, radiusY, 0, 0, Math.PI * 2);
                    maskCtx.fill();
                }

                // Upload Mask Texture
                gl.activeTexture(gl.TEXTURE2);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskCanvas);

                // Draw
                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
                gl.clearColor(0,0,0,0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                
                gl.drawArrays(gl.TRIANGLES, 0, 6);

                requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
        });
    }

    initWebGLReveal();

    // Initialize first slide (Full Outfit - Golden Amber)
    goToSlide(0);
});
