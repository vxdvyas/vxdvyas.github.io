// Function to move slides in a specific slider
function moveSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    let activeIndex = -1;

    // Find current active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
            slide.classList.remove('active');
        }
    });

    // Calculate new index
    let newIndex = activeIndex + direction;

    if (newIndex >= slides.length) {
        newIndex = 0; // Loop back to start
    } else if (newIndex < 0) {
        newIndex = slides.length - 1; // Loop to end
    }

    // Activate new slide
    slides[newIndex].classList.add('active');
}



// Modal Logic
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    modal.style.display = 'block';
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

