// Reviews Slider & FAQ Accordion Fix
console.log('Mobile fixes script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

    // === FAQ ACCORDION ===
    const faqButtons = document.querySelectorAll('#faq button');
    console.log('Found FAQ buttons:', faqButtons.length);
    
    faqButtons.forEach((button, index) => {
        console.log('FAQ button', index, button.textContent);
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('FAQ clicked:', this.textContent);
            
            // Find the answer div (next sibling that's not a button)
            let currentElement = this.nextElementSibling;
            while (currentElement && currentElement.tagName === 'BUTTON') {
                currentElement = currentElement.nextElementSibling;
            }
            
            if (currentElement && currentElement.tagName === 'DIV') {
                // Toggle display
                if (currentElement.style.display === 'none' || !currentElement.style.display) {
                    currentElement.style.display = 'block';
                    currentElement.style.maxHeight = '1000px';
                    currentElement.style.opacity = '1';
                    currentElement.style.padding = '20px';
                } else {
                    currentElement.style.display = 'none';
                    currentElement.style.maxHeight = '0';
                    currentElement.style.opacity = '0';
                    currentElement.style.padding = '0';
                }
                currentElement.style.transition = 'all 0.3s ease';
            }
        });
    });

    // === REVIEWS SLIDER ===
    const slider = document.querySelector('#reviews-slider');
    const prevBtn = document.querySelector('#reviews button:nth-of-type(1)');
    const nextBtn = document.querySelector('#reviews button:nth-of-type(2)');
    
    console.log('Slider:', slider);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);
    
    if (slider) {
        let currentSlide = 0;
        const slides = slider.children;
        const totalSlides = slides.length;
        const slidesToShow = 3;
        const maxSlide = Math.max(0, totalSlides - slidesToShow);
        
        console.log('Total slides:', totalSlides);
        
        function updateSlider() {
            const translateX = -(currentSlide * (100 / slidesToShow));
            slider.style.transform = `translateX(${translateX}%)`;
            slider.style.transition = 'transform 0.5s ease';
            console.log('Slider updated, currentSlide:', currentSlide, 'translateX:', translateX);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Next clicked, currentSlide:', currentSlide);
                if (currentSlide < maxSlide) {
                    currentSlide++;
                    updateSlider();
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Prev clicked, currentSlide:', currentSlide);
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });
        }
        
        // Auto-slide every 3 seconds
        setInterval(() => {
            currentSlide++;
            if (currentSlide > maxSlide) {
                currentSlide = 0;
            }
            updateSlider();
        }, 3000);
        
        // Initialize
        updateSlider();
    }
});
