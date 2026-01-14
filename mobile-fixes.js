// Reviews Slider & FAQ Accordion Fix
console.log('Mobile fixes script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // === FAQ ACCORDION ===
    // Using a more specific selector to target FAQ question buttons
    const faqSection = document.querySelector('#faq');
    
    if (faqSection) {
        const faqItems = faqSection.querySelectorAll('[itemscope][itemprop="mainEntity"]');
        console.log('Found FAQ items:', faqItems.length);
        
        faqItems.forEach((item, index) => {
            const button = item.querySelector('button');
            const content = item.querySelector('.faq-content');
            
            if (button && content) {
                console.log('Setting up FAQ item', index);
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('FAQ clicked:', index);
                    
                    const icon = button.querySelector('i');
                    const isHidden = content.classList.contains('hidden');
                    
                    // Close all other FAQs
                    faqItems.forEach(otherItem => {
                        const otherContent = otherItem.querySelector('.faq-content');
                        const otherIcon = otherItem.querySelector('button i');
                        if (otherContent !== content) {
                            otherContent.classList.add('hidden');
                            if (otherIcon) otherIcon.classList.remove('rotate-180');
                        }
                    });
                    
                    // Toggle current FAQ
                    if (isHidden) {
                        content.classList.remove('hidden');
                        if (icon) icon.classList.add('rotate-180');
                    } else {
                        content.classList.add('hidden');
                        if (icon) icon.classList.remove('rotate-180');
                    }
                });
            }
        });
    }
    
    // === REVIEWS SLIDER ===
    const slider = document.getElementById('reviews-slider');
    const reviewsSection = document.getElementById('reviews');
    
    console.log('Slider:', slider);
    console.log('Reviews section:', reviewsSection);
    
    if (slider && reviewsSection) {
        let currentSlide = 0;
        const slides = slider.children;
        const totalSlides = slides.length;
        
        console.log('Total slides:', totalSlides);
        
        // Get the buttons from within the reviews section
        const buttons = reviewsSection.querySelectorAll('button');
        const prevBtn = buttons[0];
        const nextBtn = buttons[1];
        
        console.log('Prev button:', prevBtn);
        console.log('Next button:', nextBtn);
        
        function getSlidesToShow() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }
        
        function updateSlider() {
            const slidesToShow = getSlidesToShow();
            const slideWidth = slides[0].offsetWidth;
            const gap = 24; // gap-6 = 24px
            const translateX = -(currentSlide * (slideWidth + gap));
            
            slider.style.transform = `translateX(${translateX}px)`;
            slider.style.transition = 'transform 0.5s ease-in-out';
            
            console.log('Slider updated:', {
                currentSlide,
                slidesToShow,
                slideWidth,
                translateX
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Next clicked, currentSlide:', currentSlide);
                
                const slidesToShow = getSlidesToShow();
                const maxSlide = Math.max(0, totalSlides - slidesToShow);
                
                if (currentSlide < maxSlide) {
                    currentSlide++;
                } else {
                    currentSlide = 0; // Loop back to start
                }
                updateSlider();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Prev clicked, currentSlide:', currentSlide);
                
                const slidesToShow = getSlidesToShow();
                const maxSlide = Math.max(0, totalSlides - slidesToShow);
                
                if (currentSlide > 0) {
                    currentSlide--;
                } else {
                    currentSlide = maxSlide; // Loop to end
                }
                updateSlider();
            });
        }
        
        // Auto-slide every 3 seconds
        setInterval(function() {
            const slidesToShow = getSlidesToShow();
            const maxSlide = Math.max(0, totalSlides - slidesToShow);
            
            currentSlide++;
            if (currentSlide > maxSlide) {
                currentSlide = 0;
            }
            updateSlider();
        }, 3000);
        
        // Initialize
        updateSlider();
        2000	3000
        // Update on window resize
        window.addEventListener('resize', updateSlider);
    }
});
