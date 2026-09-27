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
            category: '- FULL OUTFIT',
            headline: 'DSP INBARAJ',
            description: 'The head-to-toe coordinated aesthetic. Designed with effortless proportion, harmonizing the premium heavyweight tee, relaxed shorts, timepiece, and handcrafted accessories.',
            priceSale: '$289',
            priceRegular: '$350',
            sizes: ['S', 'M', 'L', 'XL'],
            bgStart: '#FCCC6A',
            bgMid: '#D4953A',
            bgEnd: '#8C5A14',
            glow: 'rgba(252, 204, 106, 0.50)',
            accent: '#FFD876',
            shadowTop: '85%',
            shadowWidth: '380px'
        },
        {
            id: 1,
            name: 'T-Shirt',
            category: '01 / HEAVYWEIGHT APPAREL',
            headline: 'T-Shirt',
            description: 'Cut from 280 GSM luxury combed organic cotton with relaxed drop shoulders and contemporary boxy silhouette. Screen printed with high-density archival graphics.',
            priceSale: '$65',
            priceRegular: '$85',
            sizes: ['S', 'M', 'L', 'XL'],
            bgStart: '#7CB8F8',
            bgMid: '#3B82F6',
            bgEnd: '#1A55B8',
            glow: 'rgba(124, 184, 248, 0.50)',
            accent: '#93C5FD',
            shadowTop: '82%',
            shadowWidth: '440px'
        },
        {
            id: 2,
            name: 'Shots',
            category: '02 / RELAXED APPAREL',
            headline: 'Shots',
            description: 'Engineered in heavyweight French terry with deep utility pockets and elongated custom dip-dyed drawstrings. Tailored with a relaxed above-the-knee break.',
            priceSale: '$75',
            priceRegular: '$95',
            sizes: ['S', 'M', 'L', 'XL'],
            bgStart: '#F4A87A',
            bgMid: '#E07B3A',
            bgEnd: '#A04C18',
            glow: 'rgba(244, 168, 122, 0.50)',
            accent: '#FDBA8C',
            shadowTop: '81%',
            shadowWidth: '390px'
        },
        {
            id: 3,
            name: 'Watch',
            category: '03 / LUXURY TIMEPIECE',
            headline: 'Watch',
            description: 'Brushed surgical steel case with anti-reflective sapphire crystal and Japanese precision chronograph movement. Finished with a textured silicone deployment strap.',
            priceSale: '$185',
            priceRegular: '$240',
            sizes: ['40mm', '42mm'],
            bgStart: '#5ED8A8',
            bgMid: '#2EAA80',
            bgEnd: '#1A7A5A',
            glow: 'rgba(94, 216, 168, 0.50)',
            accent: '#86EFAC',
            shadowTop: '80%',
            shadowWidth: '280px'
        },
        {
            id: 4,
            name: 'Bracelet',
            category: '04 / SIGNATURE HARDWARE',
            headline: 'Bracelet',
            description: 'Hand-finished matte obsidian and brushed alloy accents strung with military-grade elastomeric cord. Distinctive whether worn solo or stacked.',
            priceSale: '$45',
            priceRegular: '$60',
            sizes: ['S/M', 'M/L'],
            bgStart: '#C9A0F0',
            bgMid: '#9966CC',
            bgEnd: '#5E3A8C',
            glow: 'rgba(201, 160, 240, 0.50)',
            accent: '#D4B5F5',
            shadowTop: '80%',
            shadowWidth: '290px'
        },
        {
            id: 5,
            name: 'Key Chain',
            category: '05 / LEATHER DETAILING',
            headline: 'Key Chain',
            description: 'Custom debossed full-grain calfskin leather finished with spring-loaded gunmetal carabiner clasp and laser-engraved hardware detailing.',
            priceSale: '$35',
            priceRegular: '$45',
            sizes: ['ONE SIZE'],
            bgStart: '#F4C080',
            bgMid: '#D4883A',
            bgEnd: '#8C5518',
            glow: 'rgba(244, 192, 128, 0.50)',
            accent: '#F5D49A',
            shadowTop: '83%',
            shadowWidth: '300px'
        },
        {
            id: 6,
            name: 'Slide',
            category: '06 / ERGONOMIC FOOTWEAR',
            headline: 'Slide',
            description: 'High-resilience dual-density molded EVA foam footbed with textured arch support and anti-slip grooved outsole for supreme indoor and street ease.',
            priceSale: '$55',
            priceRegular: '$75',
            sizes: ['8', '9', '10', '11'],
            bgStart: '#F4A098',
            bgMid: '#E85D4A',
            bgEnd: '#A83020',
            glow: 'rgba(244, 160, 152, 0.50)',
            accent: '#FCA5A5',
            shadowTop: '82%',
            shadowWidth: '410px'
        }
    ];

    let currentIndex = 0;
    let isTransitioning = false;
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

    // Dynamic Text Elements
    const categoryEl = document.getElementById('product-category');
    const titleEl = document.getElementById('product-title');
    const descEl = document.getElementById('product-description');
    const priceSaleEl = document.getElementById('product-price-sale');
    const priceRegEl = document.getElementById('product-price-regular');
    const sizeOptionsContainer = document.getElementById('size-options');
    const navItems = document.querySelectorAll('.nav-item');

    const root = document.documentElement;

    // -------------------------------------------------------------------------
    // Size Options Renderer
    // -------------------------------------------------------------------------
    function renderSizeOptions(sizes) {
        if (!sizeOptionsContainer) return;
        sizeOptionsContainer.innerHTML = '';
        sizes.forEach((size, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'size-btn' + (idx === 0 ? ' active' : '');
            btn.setAttribute('role', 'radio');
            btn.setAttribute('aria-checked', idx === 0 ? 'true' : 'false');
            btn.setAttribute('data-size', size);
            btn.textContent = size;
            btn.addEventListener('click', () => {
                sizeOptionsContainer.querySelectorAll('.size-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-checked', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-checked', 'true');
            });
            sizeOptionsContainer.appendChild(btn);
        });
    }

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
        currentIndex = targetIndex;
        const currentSlide = slides[currentIndex];

        // 1. Smoothly update gradient via CSS custom properties (@property enables transitions)
        root.style.setProperty('--bg-start', currentSlide.bgStart);
        root.style.setProperty('--bg-mid', currentSlide.bgMid);
        root.style.setProperty('--bg-end', currentSlide.bgEnd);
        root.style.setProperty('--glow-color', currentSlide.glow);
        root.style.setProperty('--current-accent', currentSlide.accent);
        root.style.setProperty('--shadow-top', currentSlide.shadowTop);
        root.style.setProperty('--shadow-width', currentSlide.shadowWidth);

        // 2. Animate and update dynamic product texts with fade
        const textElements = [categoryEl, titleEl, descEl, priceSaleEl, priceRegEl];
        textElements.forEach(el => {
            if (el) el.classList.add('fade-out');
        });

        setTimeout(() => {
            if (categoryEl) categoryEl.textContent = currentSlide.category;
            if (titleEl) titleEl.textContent = currentSlide.headline;
            if (descEl) descEl.textContent = currentSlide.description;
            if (priceSaleEl) priceSaleEl.textContent = currentSlide.priceSale;
            if (priceRegEl) priceRegEl.textContent = currentSlide.priceRegular;
            renderSizeOptions(currentSlide.sizes);

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
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        if (isTransitioning) return;
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

    // Direct click on the preview item at bottom right jumps to next slide
    productElements.forEach((item) => {
        if (!item) return;
        item.addEventListener('click', (e) => {
            if (item.classList.contains('state-preview')) {
                e.stopPropagation();
                nextSlide();
            }
        });
    });

    // -------------------------------------------------------------------------
    // Mouse Wheel Scroll (Smooth continuous scroll)
    // -------------------------------------------------------------------------
    let wheelAccumulator = 0;
    const wheelThreshold = 35;

    window.addEventListener('wheel', (e) => {
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
    // Keyboard Navigation
    // -------------------------------------------------------------------------
    window.addEventListener('keydown', (e) => {
        if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
            e.preventDefault();
            nextSlide();
        } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
            e.preventDefault();
            prevSlide();
        }
    });

    // -------------------------------------------------------------------------
    // Touch Gestures (Mobile Swipe Detection)
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
    // Navigation Items Active State
    // -------------------------------------------------------------------------
    navItems.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Initialize first slide (Full Outfit - Golden Amber)
    renderSizeOptions(slides[0].sizes);
    goToSlide(0);
});
