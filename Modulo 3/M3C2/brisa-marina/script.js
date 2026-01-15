// Data needed for logic
const IMAGES = {
    history: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC87HSnUE6nsZxAgsaDCXtf3FA1ot1nzkb68f8FBjfh93-BVxdRekUwPQ94T2oISjxAcjE_WMDryPRhDGRD8lVjRceTZG0II9as31k_LUAfjqfRL3fK_GVuXfkmWUZQ1JwcHjpLa4wa05_yHoaA7CnnL8UL4G6vaOr8zvpaOQ5TLfQYeNLzQJsdTmh4tXIlk0MICi43SpGAi6FqGGfGKMiD2LddFXemvztP5N5bKRYHdvZsVW8GFAeA3GjF83ZU0hUuE7PPzojgLQg",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop"
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCarousel();
    initScrollButtons();
});

// Navbar Logic
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const brand = document.getElementById('navbar-brand');
    const links = document.getElementById('navbar-links');
    
    // Default classes
    const transparentClasses = ['bg-transparent', 'py-6'];
    const scrolledClasses = ['bg-white/95', 'dark:bg-slate-900/95', 'backdrop-blur-md', 'shadow-md', 'py-4'];
    
    // Text colors
    const brandTransparent = ['text-white', 'drop-shadow-lg'];
    const brandScrolled = ['text-secondary', 'dark:text-white'];
    
    const linkTransparent = ['text-white', 'drop-shadow-md'];
    const linkScrolled = ['text-gray-700', 'dark:text-gray-200'];

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.remove(...transparentClasses);
            navbar.classList.add(...scrolledClasses);
            
            brand.classList.remove(...brandTransparent);
            brand.classList.add(...brandScrolled);
            
            links.classList.remove(...linkTransparent);
            links.classList.add(...linkScrolled);
        } else {
            navbar.classList.remove(...scrolledClasses);
            navbar.classList.add(...transparentClasses);
            
            brand.classList.remove(...brandScrolled);
            brand.classList.add(...brandTransparent);
            
            links.classList.remove(...linkScrolled);
            links.classList.add(...linkTransparent);
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
}

// Scroll to Section Helper
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

function initScrollButtons() {
    // Top logo click
    document.getElementById('brand-link').addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // Button clicks - using event delegation for implementation simplicity or just direct attachment
    // We will attach onclick actions directly in HTML for simplicity or add listeners here if preferred.
    // For this script, we expose the function globally so HTML onclicks work, or add listeners to specific data attributes.
    // Let's expose it globally for the inline onclicks we're keeping from the component structure
    window.scrollToSection = scrollToSection;
}

// Carousel Logic
function initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        // Hide all
        slides.forEach(slide => {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('w-6', 'bg-primary');
            dot.classList.add('w-2', 'bg-white', 'opacity-50');
        });

        // Show current
        slides[index].classList.remove('opacity-0');
        slides[index].classList.add('opacity-100');
        
        dots[index].classList.remove('w-2', 'bg-white', 'opacity-50');
        dots[index].classList.add('w-6', 'bg-primary');
        
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % totalSlides);
    }

    // Auto advance
    const interval = setInterval(nextSlide, 5000);

    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Optionally reset interval here, but simple implementation is fine
        });
    });

    // Initial state
    showSlide(0);
}
