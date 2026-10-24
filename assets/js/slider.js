/**
 * ACE Technologies - Hero Slider Script
 *
 * Simple, lightweight hero slider with auto-advance and dot navigation
 */

(function() {
    'use strict';

    const slider = document.querySelector('.hero-slider');

    if (!slider) {
        return;
    }

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let autoAdvanceTimer;
    const autoAdvanceDelay = 5000; // 5 seconds

    /**
     * Show a specific slide
     */
    function showSlide(index) {
        // Handle wrap-around
        if (index >= slides.length) {
            index = 0;
        }
        if (index < 0) {
            index = slides.length - 1;
        }

        // Update slides
        slides.forEach(function(slide, i) {
            slide.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    /**
     * Advance to next slide
     */
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    /**
     * Go to previous slide
     */
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    /**
     * Start auto-advance timer
     */
    function startAutoAdvance() {
        stopAutoAdvance();
        autoAdvanceTimer = setInterval(nextSlide, autoAdvanceDelay);
    }

    /**
     * Stop auto-advance timer
     */
    function stopAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
        }
    }

    // Dot navigation
    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'), 10);
            showSlide(slideIndex);
            startAutoAdvance(); // Reset timer on manual navigation
        });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoAdvance);
    slider.addEventListener('mouseleave', startAutoAdvance);

    // Pause on focus (accessibility)
    slider.addEventListener('focusin', stopAutoAdvance);
    slider.addEventListener('focusout', startAutoAdvance);

    // Keyboard navigation
    slider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            startAutoAdvance();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            startAutoAdvance();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoAdvance();
        }
    }

    // Start auto-advance
    if (slides.length > 1) {
        startAutoAdvance();
    }
})();
