// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
let currentLanguage = 'fr';

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
});

// Language switching functionality
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update body direction for Arabic
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'fr');
    }
    
    // Update all elements with language data attributes
    const elements = document.querySelectorAll('[data-fr][data-ar]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update WhatsApp messages based on language
    updateWhatsAppMessages(lang);
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Update WhatsApp message templates
function updateWhatsAppMessages(lang) {
    const messages = {
  
            product: 'مرحباً، أنا مهتمة بهذا المنتج: ',
            contact: 'مرحباً، أود الحصول على مزيد من المعلومات حول منتجاتكم.'
        
    };
    
    window.currentMessages = messages;
}

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'fr';
    switchLanguage(savedLang);
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // Initialize WhatsApp messages
    updateWhatsAppMessages(savedLang);
});

// Smooth scroll to products section
function scrollToProducts() {
    document.getElementById('produits').scrollIntoView({
        behavior: 'smooth'
    });
}

// WhatsApp order function
function orderWhatsApp(imagePath) {
    const phone = "212671670110";
    const siteURL = "https://ahmimed.github.io/Al_khoyout_Dahabia/";
    const fullImageURL = siteURL + imagePath;
    const message = "Bonjour, je veux commander ce produit : " + fullImageURL;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = "https://wa.me/" + phone + "?text=" + encodedMessage;

    window.open(whatsappURL, '_blank');
}

// WhatsApp contact function
function contactWhatsApp() {
    const message = encodeURIComponent(window.currentMessages?.contact || 'Bonjour, je souhaite obtenir plus d\'informations sur vos produits.');
    const whatsappUrl = `https://wa.me/212671670110?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Phone call function
function callUs() {
    window.location.href = 'tel:+212671670110';
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form validation and enhanced user experience
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state to buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced mobile experience
function isMobile() {
    return window.innerWidth <= 768;
}

// Adjust interactions for mobile
if (isMobile()) {
    // Remove hover effects on mobile
    const style = document.createElement('style');
    style.textContent = `
        .product-card:hover {
            transform: none;
        }
        .nav-link:hover::after {
            width: 0;
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/6069120/pexels-photo-6069120.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/6069117/pexels-photo-6069117.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Pagination functionality
document.addEventListener('DOMContentLoaded', function () {
    const productsPerPage = 9;
    const productCards = document.querySelectorAll('.product-card');
    const paginationContainer = document.querySelector('.pagination');

    const totalPages = Math.ceil(productCards.length / productsPerPage);

    // Masquer tous les produits initialement
    productCards.forEach(card => {
        card.style.display = 'none';
    });

    // Créer les boutons de pagination dynamiquement
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = 'pagination-button';
        button.setAttribute('data-page', i);
        button.textContent = i;
        if (i === 1) button.classList.add('active');
        paginationContainer.appendChild(button);
    }

    // Fonction pour afficher une page spécifique
    function showPage(pageNumber) {
        const start = (pageNumber - 1) * productsPerPage;
        const end = start + productsPerPage;

        productCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Mettre à jour le bouton actif
        document.querySelectorAll('.pagination-button').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.page == pageNumber) {
                button.classList.add('active');
            }
        });
    }

    // Afficher la première page par défaut
    showPage(1);

    // Ajouter les événements de clic sur les boutons de pagination
    document.querySelectorAll('.pagination-button').forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.dataset.page);
            showPage(page);
            document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
