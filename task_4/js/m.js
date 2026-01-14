document.addEventListener('DOMContentLoaded', () => {
    const menuGroups = document.querySelectorAll('.menu-group');
    
    // Function to dynamically size images based on shortest list
    function sizeImagesDynamically() {
        const categoryCards = document.querySelectorAll('.category-card');
        let shortestHeight = Infinity;
        
        // Find the shortest list height
        categoryCards.forEach((card) => {
            const height = card.offsetHeight;
            if (height < shortestHeight) {
                shortestHeight = height;
            }
        });
        
        // Set all images to be almost as big as the shortest list (about 95% of height)
        const imageSize = Math.round(shortestHeight * 0.95);
        const halfSize = imageSize / 2;
        
        const cardImages = document.querySelectorAll('.card-image');
        cardImages.forEach((img, index) => {
            img.style.width = `${imageSize}px`;
            img.style.height = `${imageSize}px`;
            
            // Update negative margins for half-hidden effect
            const isEven = (index + 1) % 2 === 0;
            if (isEven) {
                img.style.marginRight = '0';
                img.style.marginLeft = `-${halfSize}px`;
            } else {
                img.style.marginRight = `-${halfSize}px`;
                img.style.marginLeft = '0';
            }
        });
    }
    
    // Size images after a short delay to ensure DOM is fully rendered
    setTimeout(sizeImagesDynamically, 100);
    // Also resize on window resize
    window.addEventListener('resize', sizeImagesDynamically);
    
    function updateRotations() {
        menuGroups.forEach((group) => {
            const cardImage = group.querySelector('.card-image img');
            const categoryCard = group.querySelector('.category-card');
            
            if (!cardImage || !categoryCard) return;
            
            // Get the position of the card relative to viewport
            const cardRect = categoryCard.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportTop = 0;
            
            const cardTop = cardRect.top;
            const cardHeight = cardRect.height;
            const cardBottom = cardTop + cardHeight;
            
            // Calculate scroll progress (0 to 1)
            // Rotation starts when card top enters viewport
            // Rotation completes (360°) when card bottom passes viewport top
            let scrollProgress = 0;
            
            if (cardTop < viewportHeight && cardBottom > viewportTop) {
                // Card is visible in viewport
                // Calculate how much has scrolled: from card top entering to card bottom exiting
                const totalScrollDistance = viewportHeight + cardHeight;
                const scrolledDistance = viewportHeight - cardTop;
                scrollProgress = Math.min(1, Math.max(0, scrolledDistance / totalScrollDistance));
            } else if (cardBottom <= viewportTop) {
                // Card has completely scrolled past the top
                scrollProgress = 1;
            }
            
            // Rotate based on scroll progress (360 degrees for full scroll)
            const rotation = scrollProgress * 360;
            cardImage.style.transform = `rotate(${rotation}deg)`;
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateRotations);
    
    // Initial update
    updateRotations();
});