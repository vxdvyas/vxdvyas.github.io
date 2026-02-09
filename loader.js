// Script to handle the loader transition
window.addEventListener('load', () => {
    const loader = document.getElementById('techno-loader');
    
    // Ensure the loader stays for at least a brief moment for smooth transition effects
    // You can adjust the timeout as needed
    setTimeout(() => {
        if (loader) {
            loader.classList.add('loader-hidden');
            
            // Optionally remove from DOM after transition
            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';
            });
        }
    }, 1000); // 1 second delay
});
