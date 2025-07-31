// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('mobile-active');
    mobileBtn.classList.toggle('active');
}

// Navigate to specific era on eras page
function navigateToEra(eraId) {
    window.location.href = `eras.html#${eraId}`;
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.era-card, .stat-card, .era-section, .media-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add stagger animation delay to era cards
    const eraCards = document.querySelectorAll('.era-card');
    eraCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add stagger animation delay to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

// Format numbers for display
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Initialize counter animations when stats come into view
function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                const multiplier = text.includes('M') ? 1000000 : text.includes('K') ? 1000 : 1;
                const target = number * multiplier;
                
                // Special handling for percentage and time values
                if (text.includes('%')) {
                    animateCounter(entry.target, number, 1500);
                    setTimeout(() => {
                        entry.target.textContent = number + '%';
                    }, 1500);
                } else if (text.includes('hrs')) {
                    animateCounter(entry.target, number, 1500);
                    setTimeout(() => {
                        entry.target.textContent = number + 'hrs';
                    }, 1500);
                } else {
                    animateCounter(entry.target, target, 2000);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Add error handling
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.classList.add('error');
        });
    });
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
});

// Search functionality (if implemented)
function searchContent(query) {
    const searchResults = [];
    const contentElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    
    contentElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
                element: element,
                text: element.textContent,
                page: window.location.pathname
            });
        }
    });
    
    return searchResults;
}

// Theme toggle functionality (if dark mode is added later)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            alert('Unable to copy link. Please copy manually: ' + url);
        });
    }
}

// Lazy loading for images (modern browsers)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form validation (if forms are added)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with keyboard
    if (e.key === 'Tab' && e.target === document.body) {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.focus();
        }
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('mobile-active')) {
            toggleMobileMenu();
        }
    }
});

// Performance monitoring
function measurePageLoad() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
}

// Initialize performance monitoring
measurePageLoad();

// Error handling for failed resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Image failed to load:', e.target.src);
        e.target.style.display = 'none';
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
