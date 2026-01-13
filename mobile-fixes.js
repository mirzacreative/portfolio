// Mobile Fixes - Reviews Slider & FAQ Accordion

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile fixes loaded');

    // === FAQ ACCORDION FIX ===
    const faqButtons = document.querySelectorAll('#faq button');
    faqButtons.forEach((btn) => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('?') || text.includes('what') || text.includes('how')) {
            btn.style.cursor = 'pointer';
            btn.style.width = '100%';
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                let answer = this.nextElementSibling;
                if (!answer || answer.tagName === 'BUTTON') {
                    answer = this.parentElement.nextElementSibling;
                }
                if (answer) {
                    const isVisible = answer.style.display !== 'none';
                    answer.style.display = isVisible ? 'none' : 'block';
                    answer.style.maxHeight = isVisible ? '0' : '2000px';
                    answer.style.padding = isVisible ? '0' : '20px';
                    answer.style.opacity = isVisible ? '0' : '1';
                    answer.style.transition = 'all 0.3s ease';
                }
            });
        }
    });

    // === REVIEWS SLIDER FIX ===
    const reviewsSlider = document.querySelector('#reviews-slider');
    if (reviewsSlider) {
        let currentIndex = 0;
        const allReviews = Array.from(reviewsSlider.children);
        const reviewsPerPage = 3;
        
        function updateSlider() {
            const offset = currentIndex * -(100 / reviewsPerPage);
            reviewsSlider.style.transform = `translateX(${offset}%)`;
            reviewsSlider.style.transition = 'transform 0.5s ease';
        }
        
        // Previous button
        const prevBtn = document.querySelector('#reviews button:first-of-type');
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }
        
        // Next button
        const nextBtn = document.querySelector('#reviews button:last-of-type');
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const maxIndex = Math.ceil(allReviews.length / reviewsPerPage) - 1;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }
        
        // Auto-slide every 3 seconds        setInterval(() => {
            const maxIndex = Math.ceil(allReviews.length / reviewsPerPage) - 1;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 3000);    }

    // === MOBILE NAVIGATION FIX ===
}, 3000);    const mobileMenu = document.querySelector('.mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
});
